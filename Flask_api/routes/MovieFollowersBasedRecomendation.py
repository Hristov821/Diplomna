from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import recomend_movies_base_on_followers

class MovieFollowersBasedRecomendation(MethodView):
    def get(self):
        username = get_jwt_identity().get("username", None)
        if username is None:
            return jsonify({"msg": "Missing username in jwt try to login again"}), 400

        movies = recomend_movies_base_on_followers(username)
        
        return jsonify(movies=movies), 200
    