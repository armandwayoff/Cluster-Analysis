class Point {
  constructor(x_, y_, c_) {
    this.x = x_;
    this.y = y_;
    // this.x = random(bord, width - bord);
    // this.y = random(bord, height - bord);
    this.c = c_;
  }

  affichage() {
    noStroke();
    fill(color(this.c));
    circle(this.x, this.y, rayon);
  }
}

class Barycentre {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
  }

  affichage() {
    noStroke();
    point(this.x, this.y)
  }
}
