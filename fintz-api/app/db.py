import psycopg
from app.config import Config

def get_db_connection():
    return psycopg.connect(
        host=Config.DB_HOST,
        dbname=Config.DB_NAME,
        user=Config.DB_USER,
        password=Config.DB_PASS,
        port=Config.DB_PORT
    )
