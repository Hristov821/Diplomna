import os
from py2neo import Graph

class Config(object):
    PASSWORD = os.environ.get('DATABASE_PASSWORD') or '123456'
    PORT = os.environ.get('PORT') or '7687'
    IP = os.environ.get('DATABASE_ADDRESS') or "localhost"
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    NEO4J_PATH = os.environ.get('NEO4_PATH') or "bolt://" + IP + ":" + PORT
    NEO4J_GRAPH = Graph("bolt://"+IP+":"+PORT, auth=("neo4j", PASSWORD))
    JWT_ACCESS_TOKEN_EXPIRES=False