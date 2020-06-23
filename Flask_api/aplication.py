from aplication import *

from flask_jwt_extended import JWTManager, jwt_required

from routes import Login
from routes import Login_requered
from routes import Register

app.add_url_rule("/api/register/", view_func=Register.as_view("register"))

login_requered_view = jwt_required(Login_requered.as_view("login_requered"))
app.add_url_rule("/api/login_requered/", view_func=login_requered_view)

login = jwt_required(Login_requered.as_view("login"))
app.add_url_rule("/api/login/", view_func=login, methods=['GET',], defaults={'user_id': None}) 
app.add_url_rule("/api/login/", view_func=Login.as_view("login"), methods=['POST',])

if __name__ == '__main__':
    app.run(use_debugger=True, debug=True, use_reloader=True, passthrough_errors=True)
