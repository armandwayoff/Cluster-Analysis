const X = [9.8, 17.2, 13, 19.6, 16.4, 79, 82.4, 86.8, 84.8, 79.2, 82.8, 52.6, 55.6, 58.4, 55.8, 58.6, 52.4, 87.4, 77.6, 80.6, 87.2, 85.2, 89, 33.2, 36.4, 42, 41.2, 38.6, 35.2, 29.2, 35.6, 39.6, 83.2, 87, 86.2, 90, 93.2, 91.2, 84, 10.8, 21.8, 17.6, 19.4, 12.4, 14, 24.6, 9.8, 14, 88.4, 86.6];
const Y = [6, 6, 10, 9, 13.2, 6.8, 7.2, 5.8, 10.2, 10.8, 13.4, 35.2, 35.2, 35, 38.2, 40.2, 45, 83, 84.2, 89.2, 90.8, 86.2, 84.6, 52.6, 51.6, 51.6, 57, 53.4, 56.6, 56.4, 58.8, 61, 52.4, 56.4, 54.4, 51.6, 55, 59.6, 61, 84.6, 82.8, 84.4, 89.4, 87.6, 91.2, 87, 10.2, 15, 9.4, 13.8];

const NUMBER_VERTICES = 50;
const RADIUS = 6;
const SQUARE_SIDE = 60;

let vertices = [];

function setup() {
  createCanvas(600, 600);
  background('white');
  textAlign(CENTER);
  const scaleX = width / 100;
  const scaleY = height / 100;

  for (let i = 0; i < NUMBER_VERTICES; i++) {
    vertices[i] = new Vertex(X[i] * scaleX, Y[i] * scaleY, color(255, 0, 0, 170));
  }

  for (let i = 0; i < width; i += SQUARE_SIDE) {
    for (let j = 0; j < height; j += SQUARE_SIDE) {
      line(0, i, width, i);
      line(j, 0, j, height);
    }
  }
}

function draw() {
  // count vertices per squares
  for (let i = 0; i < width; i += SQUARE_SIDE) {
    for (let j = 0; j < height; j += SQUARE_SIDE) {
      let count = 0;
      for (let k = 0; k < vertices.length; k++) {
        if (vertices[k].x >= i && vertices[k].x <= i + SQUARE_SIDE &&
            vertices[k].y >= j && vertices[k].y <= j + SQUARE_SIDE) {
          count++;
        }
      }
      fill(0, count * 30, 0);
      rect(i, j, SQUARE_SIDE, SQUARE_SIDE);
      noStroke();
      fill('white');
      textSize(SQUARE_SIDE / 3);
      text(count, i + SQUARE_SIDE / 2, j + SQUARE_SIDE / 2);
    }
  }
  
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].display();
  }
}

class Vertex {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
  }

  display() {
    fill(this.c);
    circle(this.x, this.y, RADIUS * 2);
  }
}
