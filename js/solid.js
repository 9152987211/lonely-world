
function Solid(x, y, w, h) {
  this.pos = createVector(x, y);
  this.w = w;
  this.h = h;
}

Solid.prototype.playerCollisions = function() {
  if (player.pos.x + (320 * player.scl) > this.pos.x && player.pos.x < this.pos.x + this.w) {
    if (player.pos.y + (320 * player.scl) > this.pos.y && player.pos.y + (320 * player.scl) < this.pos.y + player.speed + 1) {
      player.pos.y = this.pos.y - (320 * player.scl);
      player.vel.y = 0;
    } else if (player.pos.y < this.pos.y + this.h && player.pos.y > this.pos.y + this.h - player.speed - 1) {
      player.pos.y = this.pos.y + this.h;
      player.vel.y = 0;
    }
  }

  if (player.pos.y + (320 * player.scl) > this.pos.y && player.pos.y < this.pos.y + this.h) {
    if (player.pos.x + (320 * player.scl) > this.pos.x && player.pos.x + (320 * player.scl) < this.pos.x + player.speed + 1) {
      player.pos.x = this.pos.x - (320 * player.scl);
      player.vel.x = 0;
    } else if (player.pos.x < this.pos.x + this.w && player.pos.x > this.pos.x + this.w - player.speed - 1) {
      player.pos.x = this.pos.x + this.w;
      player.vel.x = 0;
    }
  }
}

Solid.prototype.zombieCollisions = function() {
  for (let i = zombies.length - 1; i >= 0; i--) {
    if (zombies[i].pos.x + (320 * zombies[i].scl) > this.pos.x && zombies[i].pos.x < this.pos.x + this.w) {
    if (zombies[i].pos.y + (320 * zombies[i].scl) > this.pos.y && zombies[i].pos.y + (320 * zombies[i].scl) < this.pos.y + zombies[i].speed + 1) {
      zombies[i].pos.y = this.pos.y - (320 * zombies[i].scl);
      zombies[i].vel.y = 0;
    } else if (zombies[i].pos.y < this.pos.y + this.h && zombies[i].pos.y > this.pos.y + this.h - zombies[i].speed - 1) {
      zombies[i].pos.y = this.pos.y + this.h;
      zombies[i].vel.y = 0;
    }
  }

  if (zombies[i].pos.y + (320 * zombies[i].scl) > this.pos.y && zombies[i].pos.y < this.pos.y + this.h) {
    if (zombies[i].pos.x + (320 * zombies[i].scl) > this.pos.x && zombies[i].pos.x + (320 * zombies[i].scl) < this.pos.x + zombies[i].speed + 1) {
      zombies[i].pos.x = this.pos.x - (320 * zombies[i].scl);
      zombies[i].vel.x = 0;
    } else if (zombies[i].pos.x < this.pos.x + this.w && zombies[i].pos.x > this.pos.x + this.w - zombies[i].speed - 1) {
      zombies[i].pos.x = this.pos.x + this.w;
      zombies[i].vel.x = 0;
    }
  }
  }
}

function SolidCollisions() {
  for (let i = 0; i < solids.length; i++) {
    solids[i].playerCollisions();
    solids[i].zombieCollisions();
  }
}
