# Simulação de autenticação real
def authenticate_user(username, password):
    # Você substituiria isso por consulta ao banco de dados
    if username == "admin" and password == "123456":
        return {"id": 1, "username": "admin"}
    return None