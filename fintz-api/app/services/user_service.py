from app.db import get_db_connection
from psycopg.errors import UniqueViolation


def create_user(name: str, email: str, cell: str):
    conn = get_db_connection()
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users (name, email, cell)
                    VALUES (%s, %s, %s)
                    RETURNING id, name, email, cell, date_registered
                    """,
                    (name, email, cell)
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
