from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask import jsonify, request
from queries import get_users_with_similar_names
from commands import create_user_rating_relationship

class ListUsers(MethodView):
    def get(self):
        check_user = request.args.get("check_user", None)
        exclude_user = request.args.get("exclude_user", None)
        
        if check_user == None:
            return jsonify({"msg": "Missing mandatory parameter 'check_user'"}), 400
        elif exclude_user == None:
            return jsonify({"msg": "Missing mandatory parameter 'exclude_user'"}), 400
        
        result = get_users_with_similar_names(check_user, exclude_user)
        return  jsonify(result=result), 200
