from py2neo import Graph, NodeMatcher
from aplication import app, bcrypt

def find_similar_movies(movie_name):
   query="""
MATCH (a:Movie {title:$movie_name})-[*2]-(b:Movie)
WHERE a <> b AND a.title < b.title
WITH DISTINCT a,b
RETURN b.title as recommendation, gds.alpha.linkprediction.adamicAdar(a, b) AS score
ORDER BY score DESC
LIMIT 10
"""
   result = app.NEO4J_GRAPH.run(query,movie_name=movie_name).data()
   return result

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
MATCH (user:User {username: $username, email: $email})
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
return u.username as username
ORDER BY fl.timestamp
"""
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username).data()
   
   return result

def get_following(username, app=app):
   query = """
MATCH (user:User {username: $username})-[fl:FOLLOWS]->(u:User)
return u.username as username
ORDER BY fl.timestamp
"""
   graph = app.config["NEO4J_GRAPH"]
   result = graph.run(query, username=username).data()
   
   return result

def get_user_movie_ratings(username, movie_title=None):
   query = """
MATCH (user:User {username: $username})-[r:RATING]->(m:Movie)
return m.title as movie, r.value as rating
ORDER BY r.timestamp, r.value
""" 
   parameter_dict = {"username":username}
   graph = app.config["NEO4J_GRAPH"]
   if movie_title:
      query.replace("(m:Movie)","(m:Movie {title: $movie_title})")
      parameter_dict["movie_title"] = movie_title
   
   result = graph.run(query, username=username).data()
   return result