from flask.views import MethodView
from flask import jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity, get_jwt_claims
)

from queries import get_user_by_email, get_email
from commands import create_user
from commons import check_password_requirements

class Register(MethodView):
    def post(self):
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        username = request.json.get('username', None)
        password = request.json.get('password', None)
        email = request.json.get('email', None)
        
        if not username:
            return jsonify({"msg": "Missing username parameter"}), 400
        elif not password:
            return jsonify({"msg": "Missing password parameter"}), 400
        elif not email:
            return jsonify({"msg": "Missing email parameter"}), 400
        elif check_password_requirements(password) is False:
            return jsonify({"msg": "Password  must have atleast one upper case...."}), 400
        elif get_user_by_email(username, email):
            return jsonify({"msg": "Username or email already exists."}), 400
        
        result = create_user(username, email, password)
        
        if result == None:
            return jsonify({"msg": f"Couldn't create user with username {username}"}), 500
        
        token = {
            "username": username,
        }
        
        tk = create_access_token(identity=token)
        return jsonify(access_token=tk), 200