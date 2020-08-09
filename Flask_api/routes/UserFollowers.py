from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import get_followers

class UserFollowers(MethodView):
    def get(self):
        username = request.args.get("username", None)
        
        if username is None:
            return jsonify({"msg": "Missing parameter username"}), 400

        followers = get_followers(username)

        return jsonify(followers=followers), 200
