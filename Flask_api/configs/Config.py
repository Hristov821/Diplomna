import os
from py2neo import Graph

class Config(object):
    ip="localhost"
    port="7687"
    pwd="123456"
    
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    NEO4J_PATH = os.environ.get('NEO4_PATH') or "bolt://"+ip+":"+port
    NEO4J_AUTH = os.environ.get('NEO4_PASSWORD') or ("neo4", pwd)
    NEO4J_GRAPH = Graph("bolt://"+ip+":"+port, auth=("neo4j", pwd))
    JWT_ACCESS_TOKEN_EXPIRES=False