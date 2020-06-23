from flask.views import MethodView
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

class Login_requered(MethodView):
    def get(self):
        result = get_jwt_identity()
        return result

    def post(self):
        """ Responds to POST requests """
        return "Authenticated post"

    def put(self):
        """ Responds  PUT requests """
        return "Authenticated put"

    def patch(self):
        """ Responds to PATCH requests """
        return "Authenticated patch"

    def delete(self):
        """ Responds to DELETE requests """
        return "Authenticated delete"
