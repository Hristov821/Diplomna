from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify
from queries import get_followers

class UserFollowers(MethodView):
    def get(self,username=None):
        if username is None:
            username = get_jwt_identity().get("username", None)
        
        followers = get_followers(username)

        return jsonify(followers=followers), 200
