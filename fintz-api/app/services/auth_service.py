import bcrypt
from app.db import get_db_connection

def authenticate_user(email: str, password: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT id, name, email, cell, password 
                FROM users 
                WHERE email = %s
            """, (email,))
            user = cur.fetchone()
            print(user)
            if user and bcrypt.checkpw(password.encode('utf-8'), user[4]):
                return {
                    "id": user[0],
                    "name": user[1],
                    "email": user[2],
                    "cell": user[3]
                }
    finally:
        conn.close()
    return None