from flask_jwt_extended import create_access_token, jwt_required

from flask import Blueprint, request, jsonify
from app.schemas.user_schema import UserRegisterSchema
from app.services.user_service import create_user
from marshmallow import ValidationError

user_bp = Blueprint("user_routes", __name__)

@user_bp.route("/api/users/register", methods=["POST"])
def register_user():
    try:
        schema = UserRegisterSchema()
        user_data = schema.load(request.json)

        result = create_user(
            name=user_data["name"],
            email=user_data["email"],
            cell=user_data.get("cell"),
            password=user_data["password"]
        )

        return jsonify(result), 201
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

@user_bp.route("/me", methods=["GET"])
@jwt_required()
def get_user():
    return jsonify({"message": "Usuário autenticado"}), 200
