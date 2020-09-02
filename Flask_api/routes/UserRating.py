from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import get_user_movie_ratings
from commands import create_user_rating_relationship

class UserRating(MethodView):
    def get(self):
        username = request.args.get("username", None)
        movie_title = request.args.get("movie_title", None)
        
        username = username if username != None else get_jwt_identity().get("username", None)
        if username == None:
            return jsonify({"msg": "Missing mandatory parameter 'username'"}), 400
        
        result = get_user_movie_ratings(username, movie_title)
        print(result)
        return  jsonify(movies=result), 200

    def post(self):
        movie_title = request.json.get("movie_title", None)
        rating = request.json.get("rating", None)
        username = get_jwt_identity().get("username", None)
        
        if username == None:
            return jsonify({"msg": "Missing mandatory parameter 'username'"}), 400
        elif movie_title == None:
            return jsonify({"msg": "Missing mandatory parameter 'movie_title'"}), 400
        elif rating == None:
            return jsonify({"msg": "Missing mandatory parameter 'rating'"}), 400

        result = create_user_rating_relationship(username, movie_title, rating)
        return  jsonify(result=result), 200