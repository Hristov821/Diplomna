from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import recomend_user_based_on_following

class RecomendUsersBasedOnFollowing(MethodView):
    def get(self):
        username = get_jwt_identity().get("username", None)
        if username is None:
            return jsonify({"msg": "Missing username in jwt try to login again"}), 400

        users = recomend_user_based_on_following(username)
        
        return jsonify(recomended_users=users), 200