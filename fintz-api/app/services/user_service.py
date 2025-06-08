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
