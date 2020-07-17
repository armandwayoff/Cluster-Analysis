import matplotlib.pyplot as plt
import networkx as nx
from random import randint, sample
from math import sqrt


class Vertex:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Centroid:
    def __init__(self, x, y):
        self.x = x
        self.y = y


def dist(x1, y1, x2, y2):
    return sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)


def create_clusters(reference_elements, elements_to_organise):
    global target_index
    colors = []
    c = [[] for _ in range(NUMBER_CLUSTERS)]  # initialisation of the clusters list
    for i in range(len(elements_to_organise)):
        record_distance = dist(0, 0, WIDTH, HEIGHT)
        for j in range(len(reference_elements)):
            d = dist(elements_to_organise[i].x, elements_to_organise[i].y,
                     reference_elements[j].x, reference_elements[j].y)
            if d < record_distance:
                record_distance = d
                target_index = j
        c[target_index].append(elements_to_organise[i])
        colors.append(COLORS[target_index])
    return c, colors


def centroid_of(lst):
    xG = 0
    yG = 0
    for a in range(len(lst)):
        xG += lst[a].x
        yG += lst[a].y
    xG /= len(lst)
    yG /= len(lst)
    return Centroid(xG, yG)


NUMBER_VERTICES = 500
NUMBER_CLUSTERS = 3
WIDTH = HEIGHT = 100  # dimension of the canvas
VERTEX_SIZE = 150
COLORS = ['orange', 'red', 'purple', 'green', 'black']

vertices = []
G = nx.Graph()

print("* K-means *")
print("Number of vertices :", NUMBER_VERTICES,
      "| Number of clusters :", NUMBER_CLUSTERS,
      "| Dimensions of the canvas : (" + str(WIDTH), ";", str(HEIGHT) + ")\n")

# creation of the vertices
print("Vertices coordinates :")
for i in range(NUMBER_VERTICES):
    new_vertex = Vertex(randint(1, WIDTH), randint(1, HEIGHT))
    vertices.append(new_vertex)
    G.add_node(i, pos=(new_vertex.x, new_vertex.y))
    print(i, ": (" + str(vertices[i].x), ";", str(vertices[i].y) + ")")

# initialisation
initial_vertices = sample(vertices, NUMBER_CLUSTERS)
pos = nx.get_node_attributes(G, 'pos')
node_color = []
for vertex in vertices:
    if vertex in initial_vertices:
        node_color.append('red')
    else:
        node_color.append('black')
plt.figure(str(NUMBER_CLUSTERS) + "-means | initial random selection")
nx.draw(G, pos, node_size=VERTEX_SIZE, node_color=node_color)

clusters, node_color = create_clusters(initial_vertices, vertices)
print("Percentages of the first iteration :")
for cluster in clusters:
    print(len(cluster) * 100 / NUMBER_VERTICES)
plt.figure(str(NUMBER_CLUSTERS) + "-means | First iteration")
nx.draw(G, pos, node_size=VERTEX_SIZE, node_color=node_color)

previous_state = clusters
current_state = []
iteration = 0
while previous_state != current_state:
    previous_state = clusters
    current_state = []
    centroids = []
    for cluster in clusters:
        centroids.append(centroid_of(cluster))
    clusters, node_color = create_clusters(centroids, vertices)
    current_state = clusters
    iteration += 1

print("Percentages of the final iteration :")
for cluster in clusters:
    print(len(cluster) * 100 / NUMBER_VERTICES)

plt.figure(str(NUMBER_CLUSTERS) + "-means | Iteration " + str(iteration))
nx.draw(G, pos, node_size=VERTEX_SIZE, node_color=node_color)
plt.show()
