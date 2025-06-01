from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required

from app.schemas.user_schema import UserLoginSchema
from app.services.auth_service import authenticate_user

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        user_data = UserLoginSchema(**data)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    user = authenticate_user(user_data.username, user_data.password)
    if not user:
        return jsonify({"error": "Credenciais inválidas"}), 401

    access_token = create_access_token(identity=user["id"])
    return jsonify(access_token=access_token), 200


@user_bp.route("/me", methods=["GET"])
@jwt_required()
def get_user():
    return jsonify({"message": "Usuário autenticado"}), 200
