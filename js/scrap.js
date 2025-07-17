
function Scrap(x, y) {
  this.pos = createVector(x, y);
  this.exists = true;
  this.spawnTime = millis();
  this.lifeTime = 15 * 1000; //Milliseconds
  this.scl = 24;
}

Scrap.prototype.update = function() {
  if (millis() >= this.spawnTime + this.lifeTime) {
    this.exists = false;
  }
}

Scrap.prototype.render = function() {
  image(IMG_SCRAP, this.pos.x, this.pos.y, this.scl, this.scl);
}

Scrap.prototype.playerCollect = function() {
  if (this.pos.x + this.scl >= player.pos.x && this.pos.x <= player.pos.x + (320 * player.scl)) {
    if (this.pos.y + this.scl >= player.pos.y && this.pos.y <= player.pos.y + (320 * player.scl)) {
      player.scrap++;
      this.exists = false;
    }
  }
}

function ScrapFunctions() {
  for (let i = scrap.length - 1; i >= 0; i--) {
    if (scrap[i].exists) {
      scrap[i].update();
      scrap[i].render();
      scrap[i].playerCollect();
    } else {
      scrap.splice(i, 1);
    }
  }
}
