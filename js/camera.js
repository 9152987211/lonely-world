
function Camera() {
  this.pos = createVector((WORLD_W * 0.5) - 64, (WORLD_H * 0.5));
  this.smoothness = 0.1;
}

Camera.prototype.update = function() {
  this.pos.x = lerp(this.pos.x, player.pos.x + (320 * player.scl * 0.5), this.smoothness);
  this.pos.y = lerp(this.pos.y, player.pos.y + (320 * player.scl * 0.5), this.smoothness);

  if (this.pos.x + (width * 0.5) > WORLD_W) {
    this.pos.x = WORLD_W - (width * 0.5);
  } else if (this.pos.x - (width * 0.5) < 0) {
    this.pos.x = (width * 0.5);
  }

  if (this.pos.y + (height * 0.5) > WORLD_H) {
    this.pos.y = WORLD_H - (height * 0.5);
  } else if (this.pos.y - (height * 0.5) < 0) {
    this.pos.y = (height * 0.5);
  }
}
