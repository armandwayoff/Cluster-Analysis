const nbrPtn = 50;
const nbrGrp = 4;
const rayon = 10;
// const bord = 10;
const nbrMaxIter = 10;

let col = ["red", "green", "blue", "purple", "orange"];
let p = [];
let groupes = [];
let barycentres = [];

let distance;
let distanceRecord = Infinity;
// let groupesRecord = [];

function setup() {
  createCanvas(770, 550);

  for (let i = 0; i < nbrPtn; i++) {
    p[i] = new Point(X[i], Y[i], 100);
  }
}

function draw() {
  for (let iter = 0; iter < nbrMaxIter; iter++) {
    main();
    print(groupes);

    background(255);
    noStroke();
    textSize(20);
    text("Itération : " + (iter + 1) + " / " + nbrMaxIter, 20, 20);

    distance = 0;
    for (let i = 0; i < nbrGrp; i++) {
      for (let j = 0; j < groupes[i].length; j++) {
        stroke(0);
        strokeWeight(1);
        line(barycentres[i].x, barycentres[i].y, groupes[i][j].x, groupes[i][j].y);
        // distance += dist(barycentres[i].x, barycentres[i].y, groupes[i][j].x, groupes[i][j].y);
      }
    }
    //distance = round(distance);

    for (let i = 0; i < p.length; i++) {
      p[i].affichage();
    }


    // if (distance < distanceRecord) {
    //   distanceRecord = distance;
    //   print("Nouveau record");
    //   // groupesRecord = groupes.slice();
    //   // print(groupes);
    //   noStroke();
    //   text("Nouveau record : " + round(distanceRecord) + " px", 530, 20);
    //   // saveCanvas((iter + 1) + "  " + round(distanceRecord), "png");
    // }
  }
  print("Terminé");
  noLoop();
}

function main() {
  let groupesPrecedents = [];

  let ptnInitiaux = [];
  selectionInitialePoints(p, ptnInitiaux, nbrGrp);
  for (let i = 0; i < nbrGrp; i++) {
    groupes.push([]);
  }
  determinerAppartenance(p, ptnInitiaux);

  let processusEnCours = true;
  while (processusEnCours) {
    barycentres = [];

    groupesPrecedents = groupes.slice();

    for (let i = 0; i < nbrGrp; i++) {
      determinerBarycentre(groupes[i]);
    }

    groupes = [];
    for (let i = 0; i < nbrGrp; i++) {
      groupes.push([]);
    }

    determinerAppartenance(p, barycentres);

    for (let i = 0; i < nbrGrp; i++) {
      if (!egales(groupesPrecedents[i], groupes[i])) {
        processusEnCours = true;
        break;
      } else {
        processusEnCours = false;
      }
    }
  }
}
