from aplication import *

def create_friend_relationship(source_name, destination_name, app=app):
    command = """
MATCH (source:User {name:$source_name}), (destination:User {name:$destination_name)
    MERGE (n)-[r:FOLOWS]->(m)
    ON CREATE SET r.date = timestamp()
RETURN r
"""

    app.config["NEO4J_GRAPH"].run(command, source_name=source_name, destination_name=destination_name)
    
    
def create_user_movie_rating_relationship(user, movie, rating, bcrypt=bcrypt, app=app):
    command = """
MATCH (user:User {name:$user}), (movie:Movie {title:$movie)
    MERGE (user)-[r:USER_RATED]->(movie)
    ON CREATE SET r.date = timestamp(), r.rating = $rating
RETURN r
"""
    graph.run(command, user=user, movie=movie, rating=rating)
    
def create_user(username, email, password, bcrypt=bcrypt, app=app):
    
    password = password.encode("utf-8")
    pasword_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    if bcrypt.check_password_hash(pasword_hash, password) == False:
        raise ValueError("Couldn't verify the password")
    
    command ="""
CREATE (n:User { username: $username, email: $email, password: $password})
RETURN n
"""
    result = app.config["NEO4J_GRAPH"].run(command, username=username, email=email, password=pasword_hash).evaluate()
    return result
    
    


