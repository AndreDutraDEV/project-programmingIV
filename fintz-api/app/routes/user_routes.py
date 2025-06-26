from flask_jwt_extended import create_access_token, jwt_required

from flask import Blueprint, request, jsonify
from app.schemas.user_schema import UserRegisterSchema
from app.services.user_service import create_user
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity
from app.services.user_service import get_user_by_id

import traceback
from app.services.user_service import update_user_by_id

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

@user_bp.route("/api/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    try:
        identity = get_jwt_identity()
        if int(identity) != user_id:
            return jsonify({"error": "Acesso negado"}), 403

        schema = UserRegisterSchema(partial=True)
        user_data = schema.load(request.json)

        updated_user = update_user_by_id(user_id, user_data)
        if updated_user:
            return jsonify({
                "id": updated_user["id"],
                "name": updated_user["name"],
                "email": updated_user["email"],
                "cell": updated_user["cell"]
            }), 200
        else:
            return jsonify({"error": "Usuário não encontrado"}), 404
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": "Erro ao atualizar usuário", "details": str(e)}), 500

@user_bp.route("/api/me", methods=["GET"])
@jwt_required()
def get_user():
    try:
        identity = get_jwt_identity()
        user = get_user_by_id(int(identity))
        if user:
            return jsonify({
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "cell": user["cell"]
            }), 200
        else:
            return jsonify({"error": "Usuário não encontrado"}), 404
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": "Erro ao buscar usuário", "details": str(e)}), 500
