from flask.views import MethodView
from flask import jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity, get_jwt_claims
)

from flask import redirect
from queries import validate_password, get_email

class Login(MethodView):
    
    def get(self):
        return redirect("https://www.google.com/", 302)

    def post(self):
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        username = request.json.get('username', None)
        password = request.json.get('password', None)
        
        if not username:
            return jsonify({"msg": "Missing username parameter"}), 400
        elif not password:
            return jsonify({"msg": "Missing password parameter"}), 400
        if validate_password(username, password) is False:
            return jsonify({"msg": "Invalid password or username"}), 400

        token = {
            "username": username,
        }
        
        tk = create_access_token(identity=token)
        return jsonify(access_token=tk), 200

    def put(self):
        """ Responds to PUT requests """
        return "Responding to a PUT request"

    def patch(self):
        """ Responds to PATCH requests """
        return "Responding to a PATCH request"

    def delete(self, entity):
        """ Responds to DELETE requests """
        return "Responding to a DELETE request"
