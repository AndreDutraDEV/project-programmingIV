from flask import Blueprint, request, jsonify
from app.services.auth_service import authenticate_user
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth_bp = Blueprint("auth_routes", __name__)

@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = authenticate_user(email, password)
    if not user:
        return jsonify({"error": "Credenciais inválidas"}), 401

    access_token = create_access_token(identity=str(user["id"]), expires_delta=timedelta(hours=1))
    return jsonify({"access_token": access_token, "user": user})
