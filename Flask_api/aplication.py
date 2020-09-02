from aplication import *

from flask_jwt_extended import JWTManager, jwt_required

from routes import Login
from routes import Login_requered
from routes import Register
from routes import UserFollowing
from routes import UserFollowers
from routes import UserRating
from routes import UserMovieRecomendation
from routes import ListUsers
from routes import MovieFollowersBasedRecomendation
from routes import RecomendUsersBasedOnFollowing

app.add_url_rule("/api/register/", view_func=Register.as_view("register"), methods=['POST',])

login_get = jwt_required(Login.as_view("login_get"))
app.add_url_rule("/api/login/", view_func=login_get, methods=['GET']) 
app.add_url_rule("/api/login/", view_func=Login.as_view("login_post"), methods=['POST',])

user_follows_get = jwt_required(UserFollowers.as_view("user_follows_get"))
app.add_url_rule("/api/user_followers/", view_func=user_follows_get, methods=['GET',])


user_following_jwt = jwt_required(UserFollowing.as_view("user_following_jwt"))
app.add_url_rule("/api/user_following/", view_func=user_following_jwt, methods=['GET','POST'])


user_rating_jwt = jwt_required(UserRating.as_view("user_rating_jwt"))
app.add_url_rule("/api/user_rating/", view_func=user_rating_jwt, methods=['GET','POST'])


app.add_url_rule("/api/movie/", view_func=UserMovieRecomendation.as_view("movie"), methods=['GET',])

list_user_jwt = jwt_required(ListUsers.as_view("list_user_jwt"))
app.add_url_rule("/api/list_users/", view_func=list_user_jwt, methods=['GET'])

followers_based_jwt = jwt_required(MovieFollowersBasedRecomendation.as_view("followers_based_recomendation"))
app.add_url_rule("/api/followers_based_recomendation/", view_func=followers_based_jwt, methods=['GET'])

recomend_users_jwt = jwt_required(RecomendUsersBasedOnFollowing.as_view("recomend_users"))
app.add_url_rule("/api/users_based_recomendation/", view_func=recomend_users_jwt, methods=['GET'])

if __name__ == '__main__':
    app.run(use_debugger=True, debug=True, use_reloader=True, passthrough_errors=True)

