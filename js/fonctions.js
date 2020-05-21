function egales(list1, list2) {
  if (list1.length !== list2.length) {
    return false;
  } else {
    for (let i = 0; i < list1.length; i++) {
      if (list1[i] !== list2[i]) {
        return false;
      }
    }
    return true;
  }
}



function determinerBarycentre(list) {
  let xG = 0;
  let yG = 0;
  for (let i = 0; i < list.length; i++) {
    xG += list[i].x / list.length;
    yG += list[i].y / list.length;
  }
  let bary = new Barycentre(xG, yG);
  barycentres.push(bary);
  bary.affichage();
}



function determinerAppartenance(list, targetList) { // Associer chaque articles de list à l'article de targetList le plus proche
  for (let i = 0; i < list.length; i++) {
    let distances = [];
    for (let j = 0; j < targetList.length; j++) {
      let d = dist(list[i].x, list[i].y, targetList[j].x, targetList[j].y);
      distances.push(d);
    }
    let targetIndex = distances.indexOf(min(distances));
    list[i].c = col[targetIndex];
    groupes[targetIndex].push(list[i]);
  }
}



function selectionInitialePoints(listDep, listArr, n) { // Sélectioner aléatoirement n articles de listDep et les ajouter à listArr
  while (listArr.length < n) {
    let randomIndex = floor(random(listDep.length));
    if (!listArr.includes(randomIndex)) {
      listArr.push(listDep[randomIndex]);
    }
  }
}
