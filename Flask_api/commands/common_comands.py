from py2neo import Graph

def create_index(index_name, label, prop):
    command = """
CREATE INDEX $index
FOR (n:$leb)
ON (n.$p)
"""
    graph.run(command, index=index_name, leb=label, p=prop)
    
def create_constrain(label, prop):
    command = """
CREATE CONSTRAINT ON (n:$label)
ASSERT n.$prop IS UNIQUE
""".format(leb = label, p = prop)

    graph.run(cypher,label=label, prop=prop)
    
    
def calculate_category_similaryties():
   command = """
MATCH (m:Movie)-[:IN_CATEGORY]->(cat:Category)
WITH {item:id(cat), categories: collect(id(m))} as userData
WITH collect(userData) as data
    CALL gds.alpha.similarity.overlap.write({nodeProjection: '*', relationshipProjection: '*', data: data, similarityCutoff: 0.60,topK: 5, writeRelationshipType:"SIMILAR_TO"})
    YIELD nodes, similarityPairs, writeRelationshipType, writeProperty, min, max, mean, stdDev, p25, p50, p75, p90, p95, p99, p999, p100
RETURN similarityPairs
 """
   result = graph.run(command)
   return result