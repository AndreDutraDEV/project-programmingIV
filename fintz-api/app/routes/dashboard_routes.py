from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.dashboard_service import total_by_category, balance_by_account

dashboard_bp = Blueprint("dashboard_routes", __name__)

@dashboard_bp.route("/api/dashboard/categories", methods=["GET"])
@jwt_required()
def dashboard_category():
    return jsonify(total_by_category(get_jwt_identity()))

@dashboard_bp.route("/api/dashboard/accounts", methods=["GET"])
@jwt_required()
def dashboard_account():
    return jsonify(balance_by_account(get_jwt_identity()))
