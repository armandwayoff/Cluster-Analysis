"""
* DBSCAN *
"""


import matplotlib.pyplot as plt
import networkx as nx


class Vertex:
    def __init__(self, x, y):
        self.x = x
        self.y = y


X = [9.8, 17.2, 13, 19.6, 16.4, 79, 82.4, 86.8, 84.8, 79.2, 82.8, 52.6, 55.6, 58.4, 55.8, 58.6, 52.4, 87.4, 77.6, 80.6, 87.2, 85.2, 89, 33.2, 36.4, 42, 41.2, 38.6, 35.2, 29.2, 35.6, 39.6, 83.2, 87, 86.2, 90, 93.2, 91.2, 84, 10.8, 21.8, 17.6, 19.4, 12.4, 14, 24.6, 9.8, 14, 88.4, 86.6]
Y = [6, 6, 10, 9, 13.2, 6.8, 7.2, 5.8, 10.2, 10.8, 13.4, 35.2, 35.2, 35, 38.2, 40.2, 45, 83, 84.2, 89.2, 90.8, 86.2, 84.6, 52.6, 51.6, 51.6, 57, 53.4, 56.6, 56.4, 58.8, 61, 52.4, 56.4, 54.4, 51.6, 55, 59.6, 61, 84.6, 82.8, 84.4, 89.4, 87.6, 91.2, 87, 10.2, 15, 9.4, 13.8]


NUMBER_VERTICES = len(X)
NUMBER_CLUSTERS = 4
WIDTH = HEIGHT = 100  # dimension of the canvas
VERTEX_SIZE = 80

vertices = []
G = nx.Graph()

print("* DBSCAN *")
print("Number of vertices :", NUMBER_VERTICES,
      "| Number of clusters :", NUMBER_CLUSTERS,
      "| Dimensions of the canvas : (" + str(WIDTH), ";", str(HEIGHT) + ")\n")

# creation of the vertices
for i in range(NUMBER_VERTICES):
    new_vertex = Vertex(X[i], Y[i])
    vertices.append(new_vertex)
    G.add_node(i, pos=(new_vertex.x, new_vertex.y))

pos = nx.get_node_attributes(G, 'pos')
nx.draw(G, pos, node_size=VERTEX_SIZE, node_color='black')
plt.show()
