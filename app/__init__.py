import os
from flask import Flask
from config import Config


def create_app(config_class=Config):
    app = Flask(
        __name__,
        template_folder=os.path.join(os.path.dirname(__file__), 'views', 'templates'),
        static_folder=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static'),
    )
    app.config.from_object(config_class)

    # Register blueprints
    from app.controllers.main import main_bp
    from app.controllers.quote import quote_bp
    from app.controllers.contact import contact_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(quote_bp)
    app.register_blueprint(contact_bp)

    return app
