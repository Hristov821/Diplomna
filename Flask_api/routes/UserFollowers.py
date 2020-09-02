from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import get_followers, check_if_user_follows_user

class UserFollowers(MethodView):
    def get(self):
        username = request.args.get("username", None)
        current_username = request.args.get("current_username", None)
        if username is None:
            return jsonify({"msg": "Missing parameter username"}), 400

        if current_username is not None:
            relationship = check_if_user_follows_user(current_username, username)
            print(relationship)
            return jsonify(user_follows=relationship)
        
        followers = get_followers(username)
        return jsonify(followers=followers), 200
