from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify
from queries import get_following
from commands import create_user_follows_relationship

class UserFollowing(MethodView):
    def get(self,username=None):
        if username is None:
            username = get_jwt_identity().get("username", None)
        
        following = get_following(username)

        return jsonify(following=following), 200
    
    def post(self,user_to_follow):
        if user_to_follow is None:
             return jsonify({"msg": "Missing user_to_follow in url"}), 400
        
        current_user = get_jwt_identity()["username"]
        result = create_user_follows_relationship(current_user, user_to_follow)
        return jsonify(result=result), 200