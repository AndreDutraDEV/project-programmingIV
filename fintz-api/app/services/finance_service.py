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

def get_accounts(user_id):
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT id, name, type, initial_balance FROM finance_accounts WHERE user_id = %s", (user_id,))
        return [
            {"id": row[0], "name": row[1], "type": row[2], "initial_balance": float(row[3])}
            for row in cur.fetchall()
        ]

def update_account(user_id, account_id, data):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE finance_accounts
                SET name = %s, type = %s, initial_balance = %s
                WHERE id = %s AND user_id = %s
            """, (data['name'], data['type'], data['initial_balance'], account_id, user_id))
            return {"message": "Conta atualizada com sucesso."}

def delete_account(user_id, account_id):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM finance_accounts WHERE id = %s AND user_id = %s", (account_id, user_id))
            return {"message": "Conta excluída com sucesso."}

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

def get_categories(user_id):
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT id, name, limit_total_flow FROM categories WHERE user_id = %s", (user_id,))
        return [
            {"id": row[0], "name": row[1], "limit_total_flow": float(row[2]) if row[2] else None}
            for row in cur.fetchall()
        ]

def update_category(user_id, category_id, data):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE categories
                SET name = %s, limit_total_flow = %s
                WHERE id = %s AND user_id = %s
            """, (data['name'], data.get('limit_total_flow'), category_id, user_id))
            return {"message": "Categoria atualizada com sucesso."}

def delete_category(user_id, category_id):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM categories WHERE id = %s AND user_id = %s", (category_id, user_id))
            return {"message": "Categoria excluída com sucesso."}

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

def get_transactions(user_id, filters):
    conn = get_db_connection()
    with conn.cursor() as cur:
        query = """
            SELECT t.id, t.amount, t.type, t.description, t.date,
                   a.name AS account, c.name AS category
            FROM transactions t
            JOIN finance_accounts a ON t.account_id = a.id
            LEFT JOIN categories c ON t.category_id = c.id
            WHERE a.user_id = %s
        """
        params = [user_id]

        if 'type' in filters:
            query += " AND t.type = %s"
            params.append(filters['type'])

        if 'category_id' in filters:
            query += " AND t.category_id = %s"
            params.append(filters['category_id'])

        if 'account_id' in filters:
            query += " AND t.account_id = %s"
            params.append(filters['account_id'])

        cur.execute(query, params)
        return [
            {
                "id": row[0], "amount": float(row[1]), "type": row[2],
                "description": row[3], "date": row[4].isoformat(),
                "account": row[5], "category": row[6]
            }
            for row in cur.fetchall()
        ]

def update_transaction(user_id, transaction_id, data):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            # Protege acesso: transação só pode ser alterada se pertencer ao usuário
            cur.execute("""
                SELECT 1 FROM transactions t
                JOIN finance_accounts a ON t.account_id = a.id
                WHERE t.id = %s AND a.user_id = %s
            """, (transaction_id, user_id))
            if not cur.fetchone():
                return {"error": "Transação não encontrada ou não permitida."}, 403

            cur.execute("""
                UPDATE transactions
                SET account_id = %s, category_id = %s, amount = %s, type = %s, description = %s
                WHERE id = %s
            """, (data['account_id'], data['category_id'], data['amount'], data['type'], data.get('description'), transaction_id))
            return {"message": "Transação atualizada com sucesso."}

def delete_transaction(user_id, transaction_id):
    conn = get_db_connection()
    with conn:
        with conn.cursor() as cur:
            cur.execute("""
                DELETE FROM transactions
                WHERE id = %s AND account_id IN (
                    SELECT id FROM finance_accounts WHERE user_id = %s
                )
            """, (transaction_id, user_id))
            return {"message": "Transação excluída com sucesso."}
