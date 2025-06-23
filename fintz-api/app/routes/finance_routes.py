from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.finance_service import (
    create_account, get_accounts, update_account, delete_account,
    create_category, get_categories, update_category, delete_category,
    create_transaction, get_transactions, update_transaction, delete_transaction
)

finance_bp = Blueprint("finance_routes", __name__)

# FINANCE ACCOUNTS
@finance_bp.route("/api/accounts", methods=["POST"])
@jwt_required()
def add_account():
    user_id = get_jwt_identity()
    return jsonify(create_account(user_id, request.json)), 201

@finance_bp.route("/api/accounts", methods=["GET"])
@jwt_required()
def list_accounts():
    user_id = get_jwt_identity()
    return jsonify(get_accounts(user_id))

@finance_bp.route("/api/accounts/<int:account_id>", methods=["PUT"])
@jwt_required()
def edit_account(account_id):
    user_id = get_jwt_identity()
    return jsonify(update_account(user_id, account_id, request.json))

@finance_bp.route("/api/accounts/<int:account_id>", methods=["DELETE"])
@jwt_required()
def remove_account(account_id):
    user_id = get_jwt_identity()
    return jsonify(delete_account(user_id, account_id))

# CATEGORIES
@finance_bp.route("/api/categories", methods=["POST"])
@jwt_required()
def add_category():
    user_id = get_jwt_identity()
    return jsonify(create_category(user_id, request.json)), 201

@finance_bp.route("/api/categories", methods=["GET"])
@jwt_required()
def list_categories():
    user_id = get_jwt_identity()
    return jsonify(get_categories(user_id))

@finance_bp.route("/api/categories/<int:category_id>", methods=["PUT"])
@jwt_required()
def edit_category(category_id):
    user_id = get_jwt_identity()
    return jsonify(update_category(user_id, category_id, request.json))

@finance_bp.route("/api/categories/<int:category_id>", methods=["DELETE"])
@jwt_required()
def remove_category(category_id):
    user_id = get_jwt_identity()
    return jsonify(delete_category(user_id, category_id))

# TRANSACTIONS
@finance_bp.route("/api/transactions", methods=["POST"])
@jwt_required()
def add_transaction():
    user_id = get_jwt_identity()
    return jsonify(create_transaction(user_id, request.json)), 201

@finance_bp.route("/api/transactions", methods=["GET"])
@jwt_required()
def list_transactions():
    user_id = get_jwt_identity()
    filters = request.args.to_dict()
    return jsonify(get_transactions(user_id, filters))

@finance_bp.route("/api/transactions/<int:transaction_id>", methods=["PUT"])
@jwt_required()
def edit_transaction(transaction_id):
    user_id = get_jwt_identity()
    return jsonify(update_transaction(user_id, transaction_id, request.json))

@finance_bp.route("/api/transactions/<int:transaction_id>", methods=["DELETE"])
@jwt_required()
def remove_transaction(transaction_id):
    user_id = get_jwt_identity()
    return jsonify(delete_transaction(user_id, transaction_id))
