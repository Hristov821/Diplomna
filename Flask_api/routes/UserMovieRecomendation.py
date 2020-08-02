from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import find_similar_movies

class UserMovieRecomendation(MethodView):
    def get(self):
        username = request.args.get("username", "GOSHO")
        movie = request.args.get("movie", None)
        categories = request.args.get("categories", [])
        
        if movie is None:
            return jsonify({"msg": "Missing movie parameter"}), 400
        
        if username is None:
            username = get_jwt_identity().get("username", None)

        categories = categories.split(",")
        movies = find_similar_movies(movie, categories, username)

        return jsonify(movies=movies), 200
    