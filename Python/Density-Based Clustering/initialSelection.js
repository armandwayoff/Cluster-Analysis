const X = [9.8, 17.2, 13, 19.6, 16.4, 79, 82.4, 86.8, 84.8, 79.2, 82.8, 52.6, 55.6, 58.4, 55.8, 58.6, 52.4, 87.4, 77.6, 80.6, 87.2, 85.2, 89, 33.2, 36.4, 42, 41.2, 38.6, 35.2, 29.2, 35.6, 39.6, 83.2, 87, 86.2, 90, 93.2, 91.2, 84, 10.8, 21.8, 17.6, 19.4, 12.4, 14, 24.6, 9.8, 14, 88.4, 86.6];
const Y = [6, 6, 10, 9, 13.2, 6.8, 7.2, 5.8, 10.2, 10.8, 13.4, 35.2, 35.2, 35, 38.2, 40.2, 45, 83, 84.2, 89.2, 90.8, 86.2, 84.6, 52.6, 51.6, 51.6, 57, 53.4, 56.6, 56.4, 58.8, 61, 52.4, 56.4, 54.4, 51.6, 55, 59.6, 61, 84.6, 82.8, 84.4, 89.4, 87.6, 91.2, 87, 10.2, 15, 9.4, 13.8];

const SIZE = 600;
const NUMBER_VERTICES = 50;
const NUMBER_CLUSTERS = 7;
const RAD = 8;
const NUMBER_COL = 3;
const COL_WIDTH = SIZE / NUMBER_COL;
const FONT_SIZE = COL_WIDTH / 2;
const scale = SIZE / 100;

let vertices = [];
let densities = [];
let dens = [];
let matrixVertices = [];

function setup() {
  createCanvas(SIZE, SIZE);
  textAlign(CENTER);
  textSize(FONT_SIZE * 0.75);

  for (let i = 0; i < NUMBER_VERTICES; i++) {
    vertices[i] = new Vertex(X[i] * scale, Y[i] * scale, 'red');
  }

  for (let i = 0; i < NUMBER_COL; i++) {
    densities.push([]);
    matrixVertices.push([]);
    for (let j = 0; j < NUMBER_COL; j++) {
      matrixVertices[i].push([]);
      densities[i].push([]);
    }
  }
}

function draw() {
  background(255);

  for (let i = 0; i < NUMBER_COL; i++) {
    for (let j = 0; j < NUMBER_COL; j++) {
      line(0, i * COL_WIDTH, SIZE, i * COL_WIDTH);
      line(j * COL_WIDTH, 0, j * COL_WIDTH, SIZE);
      let count = 0;
      for (let k = 0; k < NUMBER_VERTICES; k++) {
        if (vertices[k].inside(i * COL_WIDTH, j * COL_WIDTH, COL_WIDTH)) {
          matrixVertices[j][i].push(vertices[k]);
          count++;
        }
      }
      text(count, i * COL_WIDTH + FONT_SIZE, j * COL_WIDTH + FONT_SIZE * 5 / 4);
      densities[j][i].push(count);
      dens.push(count);
    }
  }

  let pics = kBiggest(dens, NUMBER_CLUSTERS);
  let initialSelection = [];

  for (let i = 0; i < NUMBER_COL; i++) {
    for (let j = 0; j < NUMBER_COL; j++) {
      if (pics.includes(densities[j][i][0])) {
        matrixVertices[j][i][0].c = 'blue';
        initialSelection.push(matrixVertices[j][i][0]);
        pics.splice(pics.indexOf(densities[j][i][0]), 1);
      }
    }
  }

  for (let i = 0; i < NUMBER_VERTICES; i++) {
    vertices[i].display();
  }

  print(initialSelection);
  noLoop();
}

function kBiggest(list, k) {
  let newList = reverse(sort(list));
  return subset(newList, 0, k);
}

class Vertex {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }

  display() {
    noStroke();
    fill(this.c);
    circle(this.x, this.y, RAD * 2);
  }

  inside(x, y, w) {
    if (this.x >= x && this.x <= x + w && this.y >= y && this.y <= y + w) {
      return true;
    } else {
      return false;
    }
  }
}
