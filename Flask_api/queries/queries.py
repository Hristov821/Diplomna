from py2neo import Graph, NodeMatcher
from aplication import app, bcrypt

def find_similar_movies(movie, categories):
   categories_str = ""
   
   for category in categories:
      if category != "undefined":
         categories_str = categories_str + ",(b)-[:IN_CATEGORY]->(Category {{name:\"{}\"}})".format(category)
      
   query="""
MATCH (a:Movie {title:$movie})-[*2]-(b:Movie)
""" + categories_str + """
WHERE a <> b AND a.title < b.title
WITH DISTINCT a,b
RETURN b as recommendation, gds.alpha.linkprediction.adamicAdar(a, b) AS score
ORDER BY score DESC
LIMIT 10
"""
   print(query)
   result = app.config["NEO4J_GRAPH"].run(query,movie=movie).data()
   return result

# MATCH (a:Movie {title:"Pulp Fiction"})-[*2]-(b:Movie)
# WHERE a <> b AND a.title < b.title
# WITH DISTINCT a,b
# RETURN b as recommendation, gds.alpha.linkprediction.adamicAdar(a, b, {relationshipQuery: 'ACTED_IN'}) AS score
# ORDER BY score DESCMATCH (a:Movie {title:"Kill Bill: Vol. 1"})-[*2]-(b:Movie)
# WHERE a <> b AND a.title < b.title
# WITH DISTINCT a,b
# RETURN b.title as recommendation, gds.alpha.linkprediction.adamicAdar(a, b) AS score
# ORDER BY score DESC LIMIT 3

def find_similar_actors(actor_name):
   query="""
MATCH (a:Actor {name:$actor_name})-[*2]-(b:Actor)
WHERE a <> b AND a.title < b.title
WITH DISTINCT a,b
RETURN b.name as recommendation, gds.alpha.linkprediction.adamicAdar(a, b) AS score
ORDER BY score DESC
LIMIT 10
"""

   result = app.config["NEO4J_GRAPH"].run(query,actor_name=actor_name).data()
   return result

def get_user_by_email(username, email, app=app):
   query = """
MATCH (user:User)
where user.username = $username or user.email = $email
return user   
"""
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username, email=email).data()
   return result

def get_email(email, app=app):
   query = """
MATCH (user:User {email: $email})
return user   
"""
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, email=email).data()
   return result

def validate_password(username, password, app=app, bcrypt=bcrypt):
   query = """
MATCH (user:User {username: $username})
return user.password as PASSWORD 
"""
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username).data()
   
   if len(result) == 0:
      return False
   
   hashed_password = result[0]["PASSWORD"]
   if result and bcrypt.check_password_hash(hashed_password, password) == True:
      return True
   return False

def get_followers(username, app=app):
   query = """
MATCH (user:User {username: $username})<-[fl:FOLLOWS]-(u:User)
return u.username as username, u.poster as poster
ORDER BY fl.timestamp
"""

   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username).data()
   
   return result

def get_following(username, app=app):
   query = """
MATCH (user:User {username: $username})-[fl:FOLLOWS]->(u:User)
return u.username as username, u.poster as poster
ORDER BY fl.timestamp
"""
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username).data()
   
   return result

def get_user_movie_ratings(username, movie_title=None):
   query = """
MATCH (user:User {username: $username})-[r:USER_RATED]->(m:Movie)
return m as movie
ORDER BY r.timestamp, r.value
""" 
   parameter_dict = {"username":username}
   graph = app.config["NEO4J_GRAPH"]
   if movie_title:
      query.replace("(m:Movie)","(m:Movie {title: $movie_title})")
      parameter_dict["movie_title"] = movie_title
   
   result = graph.run(query, username=username).data()
   return result


def get_users_with_similar_names(username, exclude_user):
   query = """
MATCH (n:User) 
where toLower(n.username) contains toLower(\'{search_user_pattern}\') 
and NOT n.username=\'{exclude_user}\'
return n.username as username, n.poster as poster
""".format(search_user_pattern=username, exclude_user=exclude_user)

   print(query)
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query).data()
   
   return result


def recomend_movies_base_on_followers(username):
   query = """
MATCH (u:User {username:$username})-[f:FOLLOWS]->(u2:User)-[r:USER_RATED]->(movie:Movie)
where u<>u2 and r.rating > 3
RETURN distinct movie
"""
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username).data()
   
   return result


def check_if_user_follows_user(user1, user2):
   query = """
MATCH p=(u:User {username:$user1})-[r:FOLLOWS]->(u2: User {username:$user2}) 
RETURN count(r) as count
"""

   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, user1=user1, user2=user2).data()

   if int(result[0]["count"]) > 0:
      return True
   return False


def recomend_user_based_on_following(username):
   query = """
MATCH p=(u:User {username:$username})-[f1:FOLLOWS*2]->(fl1:User)
where not EXISTS((u)-[:FOLLOWS]->(fl1)) and u.username<>fl1.username 
return distinct fl1.username as username, fl1.poster as poster
"""

   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username).data()
   
   return result

# add poster
# MATCH (n:Movie {title:"Taxi Driver"}) SET n.poster = "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR1,0,182,268_AL_.jpg" return n