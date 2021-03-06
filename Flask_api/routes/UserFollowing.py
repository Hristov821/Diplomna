from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import get_following
from commands import create_user_follows_relationship

class UserFollowing(MethodView):
    def get(self):
        username = request.args.get("username", None)
        if username is None:
            username = get_jwt_identity().get("username", None)
        
        following = get_following(username)

        return jsonify(following=following), 200
    
    def post(self):
        user_to_follow = request.json.get("user_to_follow", None)
        if user_to_follow is None:
             return jsonify({"msg": "Missing parameter user_to_follow"}), 400
        elif get_jwt_identity().get("username", None) is None:
            return jsonify({"msg": "Missing user in url"})
        
        current_user = get_jwt_identity().get("username", None)
        result = create_user_follows_relationship(current_user, user_to_follow)
        return jsonify(result=result), 200