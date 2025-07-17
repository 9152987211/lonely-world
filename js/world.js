
function renderWorld() {
  image(IMG_MAP, 0, 0, WORLD_W, WORLD_H);
  image(IMG_NOISE, 0, 0, WORLD_W, WORLD_H);

  /*stroke(255, 40);
  strokeWeight(1);
  for (let i = 0; i < WORLD_W; i += 16) {
    line(i, 0, i, WORLD_H);
  }
  for (let j = 0; j < WORLD_H; j += 16) {
    line(0, j, WORLD_W, j);
  }*/
}



function Bunker() {
  this.health = 100;
  this.pos = createVector(1873, 1400);
  this.w = 334;
  this.h = 287;
}

Bunker.prototype.render = function() {
  image(IMG_BUNKER, this.pos.x, this.pos.y, this.w, this.h);
}



function setupSolids() {
  //Bunker:
  solids.push(new Solid(1873, 1400, 334, 287));
}
