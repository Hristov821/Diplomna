from aplication import *

from flask_jwt_extended import JWTManager, jwt_required

from routes import Login
from routes import Login_requered
from routes import Register
from routes import UserFollowing
from routes import UserFollowers
from routes import UserRating

app.add_url_rule("/api/register", view_func=Register.as_view("register"))
################
login_requered_view = jwt_required(Login_requered.as_view("login_requered"))
app.add_url_rule("/api/login_requered", view_func=login_requered_view)
#################
login_get = jwt_required(Login.as_view("login_get"))
app.add_url_rule("/api/login/", view_func=login_get, methods=['GET']) 
app.add_url_rule("/api/login/", view_func=Login.as_view("login_post"), methods=['POST',])
################
user_follows_get = jwt_required(UserFollowers.as_view("user_follows_get"))
app.add_url_rule("/api/user_followers/", view_func=user_follows_get, methods=['GET',])
################

user_following_jwt = jwt_required(UserFollowing.as_view("user_following_jwt"))
app.add_url_rule("/api/user_following/", view_func=user_following_jwt, methods=['GET','POST'])
################

user_rating_jwt = jwt_required(UserRating.as_view("user_rating_jwt"))
app.add_url_rule("/api/user_rating/", view_func=user_rating_jwt, methods=['GET','POST'])

if __name__ == '__main__':
    app.run(use_debugger=True, debug=True, use_reloader=True, passthrough_errors=True)

# ?param1="+lat+"&param2="+lon