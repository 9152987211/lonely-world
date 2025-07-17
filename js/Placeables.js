
function Turret(x, y, dir) {
  this.scl = 0.25;
  this.pos = createVector(x, y);
  this.dir = dir;
  this.w = 320 * this.scl;
  this.h = 320 * this.scl;
  this.target = null;
  this.bulletSpeed = 15;
  this.tempTime = millis();
  this.fireRate = 1;
  this.range = 256;
  this.maxHealth = 100;
  this.health = this.maxHealth;
}

Turret.prototype.render = function() {
  stroke(0);
  strokeWeight(2);
  noFill();
  rect(this.pos.x, this.pos.y - 4, this.w, 8);
  noStroke();
  let ratio = (this.health / this.maxHealth) * this.w;
  if (ratio > this.w) {ratio = this.w;} else if (ratio < 0) {ratio = 0;}
  fill(255 - ((255 * ratio) / this.w), (255 * ratio) / this.w, 0, 100);
  rect(this.pos.x + 1, this.pos.y - 4 + 1, ratio - 2, 8 - 2);

  if (this.dir == "right") {
    image(IMG_TURRET_RIGHT, this.pos.x, this.pos.y, this.w, this.h);
  } else if (this.dir == "left") {
    image(IMG_TURRET_LEFT, this.pos.x, this.pos.y, this.w, this.h);
  } else if (this.dir == "down") {
    image(IMG_TURRET_DOWN, this.pos.x, this.pos.y, this.w, this.h);
  } else if (this.dir == "up") {
    image(IMG_TURRET_UP, this.pos.x, this.pos.y, this.w, this.h);
  }

  /*noStroke();
  fill(0, 255, 0, 20);
  ellipse(this.pos.x + (this.w * 0.5), this.pos.y + (this.h * 0.5), this.range * 2, this.range * 2);*/
}

Turret.prototype.shoot = function() {
  let dist = 100000;
  this.target = null;
  for (let i = zombies.length - 1; i >= 0; i--) {
    if (this.dir == "right") {
      if (zombies[i].pos.x > this.pos.x) {
        let dir = createVector(zombies[i].pos.x - (this.pos.x + (this.w * 0.5)), zombies[i].pos.y - (this.pos.y + (this.h * 0.5)));
        if (dir.mag() < dist) {
          dist = dir.mag();
          this.target = zombies[i];
        }
      }
    } else if (this.dir == "left") {
      if (zombies[i].pos.x < this.pos.x) {
        let dir = createVector(zombies[i].pos.x - (this.pos.x + (this.w * 0.5)), zombies[i].pos.y - (this.pos.y + (this.h * 0.5)));
        if (dir.mag() < dist) {
          dist = dir.mag();
          this.target = zombies[i];
        }
      }
    } else if (this.dir == "down") {
      if (zombies[i].pos.y > this.pos.y) {
        let dir = createVector(zombies[i].pos.x - (this.pos.x + (this.w * 0.5)), zombies[i].pos.y - (this.pos.y + (this.h * 0.5)));
        if (dir.mag() < dist) {
          dist = dir.mag();
          this.target = zombies[i];
        }
      }
    } else if (this.dir == "up") {
      if (zombies[i].pos.y < this.pos.y) {
        let dir = createVector(zombies[i].pos.x - (this.pos.x + (this.w * 0.5)), zombies[i].pos.y - (this.pos.y + (this.h * 0.5)));
        if (dir.mag() < dist) {
          dist = dir.mag();
          this.target = zombies[i];
        }
      }
    }
  }

  if (zombies.length > 0 && this.target != null && dist <= this.range) {
    let x = this.pos.x + (this.w * 0.5);
    let y = this.pos.y + (this.h * 0.5);
    let zx = this.target.pos.x + (320 * 0.25 * 0.5);
    let zy = this.target.pos.y + (320 * 0.25 * 0.5)
    let vel = createVector(zx - x, zy - y);
    vel.setMag(this.bulletSpeed);
    let spread = 8;
    bullets.push(new Bullet(x, y, vel.x + random(-spread, spread), vel.y + random(-spread, spread)));
    this.health--;
  }
}


function TurretFunctions() {
  for (let i = turrets.length - 1; i >= 0; i--) {
    if (turrets[i].health > 0) {
      turrets[i].render();

      if (millis() >= turrets[i].tempTime + (1000 / turrets[i].fireRate)) {
        if (player.health >= 0) {turrets[i].shoot()};
        turrets[i].tempTime = millis();
      }
    } else {
      turrets.splice(i, 1);
    }
  }
}


function BarbedWire(x, y) {
  this.pos = createVector(x, y);
  this.scl = 0.25;
  this.w = 320 * this.scl;
  this.h = 320 * this.scl;
  this.maxHealth = 10;
  this.health = this.maxHealth;
  this.index = int(random(2));
}

BarbedWire.prototype.render = function() {
  image(IMG_BARBEDWIRE[this.index], this.pos.x, this.pos.y, IMG_BARBEDWIRE[this.index].width * this.scl, IMG_BARBEDWIRE[this.index].height * this.scl);
}

BarbedWire.prototype.collisions = function() {
  //With player:
  player.speed = 2.5;
  if (player.pos.x + (320 * player.scl) >= this.pos.x && player.pos.x <= this.pos.x + this.w) {
    if (player.pos.y + (320 * player.scl) >= this.pos.y && player.pos.y <= this.pos.y + this.h) {
      player.speed = 1;
    }
  }

  //With zombies:
  for (let i = zombies.length - 1;  i >= 0; i--) {
    zombies[i].speed = zombies[i].defaultSpeed;
    if (zombies[i].pos.x + (320 * zombies[i].scl) >= this.pos.x && zombies[i].pos.x <= this.pos.x + this.w) {
      if (zombies[i].pos.y + (320 * zombies[i].scl) >= this.pos.y && zombies[i].pos.y <= this.pos.y + this.h) {
        zombies[i].speed = zombies[i].defaultSpeed * 0.2;
      }
    }
  }
}


function BarbedWireFunctions() {
  for (let i = barbedWire.length - 1; i >= 0; i--) {
    if (barbedWire[i].health > 0) {
      barbedWire[i].render();
      barbedWire[i].collisions();
    } else {
      barbedWire.splice(i, 1);
    }
  }
}
