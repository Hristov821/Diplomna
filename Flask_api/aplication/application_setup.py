from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import JWTManager, jwt_required
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from configs import Config

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

