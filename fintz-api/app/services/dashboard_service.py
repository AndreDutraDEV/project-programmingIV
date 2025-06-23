from app.db import get_db_connection

def total_by_category(user_id):
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("""
            SELECT c.name, SUM(t.amount) as total
            FROM transactions t
            JOIN categories c ON t.category_id = c.id
            JOIN finance_accounts a ON t.account_id = a.id
            WHERE a.user_id = %s
            GROUP BY c.name
        """, (user_id,))
        return [{"category": row[0], "total": float(row[1])} for row in cur.fetchall()]

def balance_by_account(user_id):
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("""
            SELECT a.name,
                COALESCE(SUM(
                    CASE WHEN t.type = 'income' THEN t.amount
                         WHEN t.type = 'expense' THEN -t.amount
                         ELSE 0
                    END
                ), 0) + a.initial_balance as balance
            FROM finance_accounts a
            LEFT JOIN transactions t ON t.account_id = a.id
            WHERE a.user_id = %s
            GROUP BY a.name, a.initial_balance
        """, (user_id,))
        return [{"account": row[0], "balance": float(row[1])} for row in cur.fetchall()]
