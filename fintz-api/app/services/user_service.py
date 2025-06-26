import bcrypt
from app.db import get_db_connection
from psycopg.errors import UniqueViolation

def create_user(name: str, email: str, cell: str, password: str):
    conn = get_db_connection()
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users (name, email, cell, password)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, name, email, cell, date_registered
                    """,
                    (name, email, cell, hashed_password)
                )
                user = cur.fetchone()

                # Cria conta financeira padrão
                cur.execute(
                    """
                    INSERT INTO finance_accounts (user_id, name, type, initial_balance)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (user[0], "Conta Principal", "checking", 0.00)
                )

                return {
                    "id": user[0],
                    "name": user[1],
                    "email": user[2],
                    "cell": user[3],
                    "date_registered": user[4].isoformat()
                }
    except UniqueViolation:
        return {"error": "Email já cadastrado"}
    finally:
        conn.close()

def get_user_by_id(user_id: int):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, name, email, cell
                FROM users
                WHERE id = %s
            """, (user_id,))
            user = cur.fetchone()
            print("/me", user)
            if user:
                return {
                    "id": int(user[0]),
                    "name": user[1],
                    "email": user[2],
                    "cell": user[3]
                }
    finally:
        conn.close()
    return None

def update_user_by_id(user_id: int, name: str = None, email: str = None, cell: str = None, password: str = None):
    conn = get_db_connection()
    try:
        fields = []
        values = []
        if name is not None:
            fields.append("name = %s")
            values.append(name)
        if email is not None:
            fields.append("email = %s")
            values.append(email)
        if cell is not None:
            fields.append("cell = %s")
            values.append(cell)
        if password is not None:
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            fields.append("password = %s")
            values.append(hashed_password)
        if not fields:
            return {"error": "Nenhum campo para atualizar"}
        
        values.append(user_id)

        with conn:
            with conn.cursor() as cur:
                query = f"""
                    UPDATE users
                    SET {', '.join(fields)}
                    WHERE id = %s
                    RETURNING id, name, email, cell
                """
                cur.execute(query, tuple(values))
                user = cur.fetchone()
                if user:
                    return {
                        "id": int(user[0]),
                        "name": user[1],
                        "email": user[2],
                        "cell": user[3]
                    }
                else:
                    return {"error": "Usuário não encontrado"}
    except UniqueViolation:
        return {"error": "Email já cadastrado"}
    finally:
        conn.close()
