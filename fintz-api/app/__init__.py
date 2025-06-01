from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.routes.user_routes import user_bp
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Segurança básica
    CORS(app)
    JWTManager(app)

    # Rotas
    app.register_blueprint(user_bp, url_prefix="/api/users")

    @app.route("/")
    def health_check():
        return {"status": "API running"}, 200

    return app
