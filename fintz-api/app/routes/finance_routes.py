from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.finance_service import create_account, create_category, create_transaction

finance_bp = Blueprint("finance_routes", __name__)

@finance_bp.route("/api/accounts", methods=["POST"])
@jwt_required()
def add_account():
    user_id = get_jwt_identity()
    data = request.get_json()
    result = create_account(user_id, data)
    return jsonify(result), 201

@finance_bp.route("/api/categories", methods=["POST"])
@jwt_required()
def add_category():
    user_id = get_jwt_identity()
    data = request.get_json()
    result = create_category(user_id, data)
    return jsonify(result), 201

@finance_bp.route("/api/transactions", methods=["POST"])
@jwt_required()
def add_transaction():
    user_id = get_jwt_identity()
    data = request.get_json()
    result = create_transaction(user_id, data)
    return jsonify(result), 201