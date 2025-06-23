from app.db import get_db_connection

def create_account(user_id, data):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO finance_accounts (user_id, name, type, initial_balance)
                VALUES (%s, %s, %s, %s)
                RETURNING id, name, type, initial_balance
                """,
                (user_id, data['name'], data['type'], data.get('initial_balance', 0.00))
            )
            account = cur.fetchone()
            return {
                "id": account[0],
                "name": account[1],
                "type": account[2],
                "initial_balance": float(account[3])
            }

def create_category(user_id, data):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO categories (user_id, name, limit_total_flow)
                VALUES (%s, %s, %s)
                RETURNING id, name, limit_total_flow
                """,
                (user_id, data['name'], data.get('limit_total_flow'))
            )
            cat = cur.fetchone()
            return {
                "id": cat[0],
                "name": cat[1],
                "limit_total_flow": float(cat[2]) if cat[2] else None
            }

def create_transaction(user_id, data):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO transactions (account_id, category_id, amount, type, description, date)
                VALUES (%s, %s, %s, %s, %s, NOW())
                RETURNING id, amount, type, description, date
                """,
                (data['account_id'], data['category_id'], data['amount'], data['type'], data.get('description'))
            )
            trx = cur.fetchone()
            return {
                "id": trx[0],
                "amount": float(trx[1]),
                "type": trx[2],
                "description": trx[3],
                "date": trx[4].isoformat()
            }
