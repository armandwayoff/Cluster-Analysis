import matplotlib.pyplot as plt
import networkx as nx
from math import sqrt
from random import randint


class Vertex:
    def __init__(self, x, y):
        self.x = x
        self.y = y


def dist(x1, y1, x2, y2):
    return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)


def initialPointSelection(lst1, lst2, n):
    while len(lst2) < n:
        random_index = randint(0, len(lst1) + 1)
        if random_index not in lst2:
            lst2.append(lst1[random_index])


def determineAppartenance(lst, target_lst):
    for i in range(len(lst)):
        distances = []
        for j in range(len(target_lst)):
            d = dist(lst[i].x, lst[i].y, target_lst[j].x, target_lst[j].y)
            distances.append(d)
        target_index = distances.index(min(distances))



NUMBER_VERTICES = 6
WIDTH = HEIGHT = 100  # dimension of the canvas
VERTEX_SIZE = 150
COLOR = ['orange', 'red', 'purple', 'green']

vertices = []

G = nx.Graph()

print("Number of vertices :", NUMBER_VERTICES, "| Dimensions of the canvas : (" + str(WIDTH), ";", str(HEIGHT) + ")\n")
print("Vertices coordinates :")
for i in range(NUMBER_VERTICES):
    new_vertex = Vertex(randint(0, WIDTH), randint(0, HEIGHT))
    vertices.append(new_vertex)
    G.add_node(i, pos=(new_vertex.x, new_vertex.y))
    print(i, ": (" + str(vertices[i].x), ";", str(vertices[i].y) + ")")

pos = nx.get_node_attributes(G, 'pos')
nx.draw(G, pos, node_size=VERTEX_SIZE, node_color=COLOR[2], with_labels=True)
plt.show()
