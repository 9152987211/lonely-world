
function Player() {
  this.pos = createVector((WORLD_W * 0.5) - 56, (WORLD_H * 0.5) + 164);
  this.vel = createVector(0, 0);
  this.scl = 16;
  this.friction = 0.05;
  this.speed = 2.5;
  this.tempTime = millis();
  this.fireRate = 1.5;
  this.scrap = 100;
  this.dir = "down"; //"down", "up", "right", "left", "rightdown", "leftdown", "rightup" or "leftup".
  this.runDir = "down";
  this.threshold = 2;
  this.idle = true;
  this.scl = 0.25;
  this.angle = 0;
  this.shooting = false;
  this.shootAnimLength = 250; //Milliseconds
  this.tempShootAnimTime = millis() - this.shootAnimLength;
  this.bulletSpeed = 15;
  this.health = 10;
  this.healthSprites = [];
  for (let i = 0; i < 10; i++) {this.healthSprites.push(int(random(4)));}
  this.frame = 0;
  this.bullets = 100;
  this.stunTime = 500;
  this.tempStunTime = millis();
  this.placingTuret = false;
  this.placingBarbedWire = false;
  this.placingTurretDir = "right";
}

Player.prototype.update = function() {
  if (player.health > 0) {
    if (player.vel.mag() > player.speed) {player.vel.setMag(player.speed);}
    this.pos.add(this.vel);

    if (counter % 12 === 0) {
      this.frame++;
      if (this.frame > 3) {this.frame = 0;}
    }

    //Run Direction Check
    if (abs(this.vel.x) <= this.threshold) {
      if (this.vel.y > this.threshold) {this.runDir = "down"}
      if (this.vel.y < -this.threshold) {this.runDir = "up"}
    }
    if (abs(this.vel.y) <= this.threshold) {
      if (this.vel.x > this.threshold) {this.runDir = "right"}
      if (this.vel.x < -this.threshold) {this.runDir = "left"}
    }
    if (this.vel.x > this.threshold) {
      if (this.vel.y > this.threshold) {this.runDir = "rightdown"}
      if (this.vel.y < -this.threshold) {this.runDir = "rightup"}
    }
    if (this.vel.x < -this.threshold) {
      if (this.vel.y > this.threshold) {this.runDir = "leftdown"}
      if (this.vel.y < -this.threshold) {this.runDir = "leftup"}
    }

    if (millis() > this.tempShootAnimTime + this.shootAnimLength) {
      this.shooting = false;
    } else {
      this.shooting = true;
    }

    //Direction Calculation
    let dir = createVector(mouseX - ((width * 0.5) + (320 * this.scl)), mouseY - ((height * 0.5) + (320 * this.scl)));
    let pv = atan(dir.y / -dir.x);
    if (-dir.x < 0) {
      if (dir.y >= 0) {this.angle = pv + PI}
      if (dir.y < 0) {this.angle = pv - PI}
    } else {
      this.angle = pv;
    }

    this.dir = "right";
    for (let a = -PI - (PI / 8); a <= PI + (2 * (PI / 8)); a += PI / 4) {
      if (this.angle >= a && this.angle < a + (PI / 4)) {
        if (a == -PI + (PI / 8) + (0 * (PI / 4))) {
          this.dir = "rightup";
          break;
        } else if (a == -PI + (PI / 8) + (1 * (PI / 4))) {
          this.dir = "up";
          break;
        } else if (a == -PI + (PI / 8) + (2 * (PI / 4))) {
          this.dir = "leftup";
          break;
        } else if (a == -PI + (PI / 8) + (3 * (PI / 4))) {
          this.dir = "left";
          break;
        } else if (a == -PI + (PI / 8) + (4 * (PI / 4))) {
          this.dir = "leftdown";
          break;
        } else if (a == -PI + (PI / 8) + (5 * (PI / 4))) {
          this.dir = "down";
          break;
        } else if (a == -PI + (PI / 8) + (6 * (PI / 4))) {
          this.dir = "rightdown";
          break;
        }

      }
    }

    //Prevent the Player leaving the map
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = 0;
    } else if (this.pos.x + (320 * this.scl) > WORLD_W) {
      this.pos.x = WORLD_W - (320 * this.scl);
      this.vel.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = 0;
    } else if (this.pos.y + (320 * this.scl) > WORLD_H) {
      this.pos.y = WORLD_H - (320 * this.scl);
      this.vel.y = 0;
    }


    if (this.placingTuret) {
      let x = camera.pos.x - (width * 0.5) + mouseX - (320 * 0.25 * 0.5);
      let y = camera.pos.y - (height * 0.5) + mouseY - (320 * 0.25 * 0.5);

      if (player.placingTurretDir == "right") {
        image(IMG_TURRET_RIGHT_PLACING, x, y, IMG_TURRET_RIGHT_PLACING.width * 0.25, IMG_TURRET_RIGHT_PLACING.height * 0.25);
      } else if (player.placingTurretDir == "left") {
        image(IMG_TURRET_LEFT_PLACING, x, y, IMG_TURRET_LEFT_PLACING.width * 0.25, IMG_TURRET_LEFT_PLACING.height * 0.25);
      } else if (player.placingTurretDir == "down") {
        image(IMG_TURRET_DOWN_PLACING, x, y, IMG_TURRET_DOWN_PLACING.width * 0.25, IMG_TURRET_DOWN_PLACING.height * 0.25);
      } else if (player.placingTurretDir == "up") {
        image(IMG_TURRET_UP_PLACING, x, y, IMG_TURRET_UP_PLACING.width * 0.25, IMG_TURRET_UP_PLACING.height * 0.25);
      }
    } else if (this.placingBarbedWire) {
      let x = camera.pos.x - (width * 0.5) + mouseX - (320 * 0.25 * 0.5);
      let y = camera.pos.y - (height * 0.5) + mouseY - (320 * 0.25 * 0.5);

      image(IMG_BARBEDWIRE_PLACING, x, y, IMG_BARBEDWIRE_PLACING.width * 0.25, IMG_BARBEDWIRE_PLACING.height * 0.25);
    }
  } else {
    if (counter % 16 === 0) {
      if (this.frame < 2) {
        this.frame++;
      }
    }
  }

}

Player.prototype.render = function() {
  /*fill(0, 255, 0);
  stroke(0);
  strokeWeight(2);
  ellipse(this.pos.x, this.pos.y, this.scl, this.scl);*/

  if (player.health > 0) {
    if (this.idle && !this.shooting) {
      if (this.dir == "down") {
        image(IMG_PLAYER_IDLE_DOWN, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_DOWN.width * this.scl, IMG_PLAYER_IDLE_DOWN.height * this.scl);
      } else if (this.dir == "up") {
        image(IMG_PLAYER_IDLE_UP, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_UP.width * this.scl, IMG_PLAYER_IDLE_UP.height * this.scl);
      } else if (this.dir == "right") {
        image(IMG_PLAYER_IDLE_RIGHT, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_RIGHT.width * this.scl, IMG_PLAYER_IDLE_RIGHT.height * this.scl);
      } else if (this.dir == "left") {
        image(IMG_PLAYER_IDLE_LEFT, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_LEFT.width * this.scl, IMG_PLAYER_IDLE_LEFT.height * this.scl);
      } else if (this.dir == "rightdown") {
        image(IMG_PLAYER_IDLE_RIGHTDOWN, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_RIGHTDOWN.width * this.scl, IMG_PLAYER_IDLE_RIGHTDOWN.height * this.scl);
      } else if (this.dir == "leftdown") {
        image(IMG_PLAYER_IDLE_LEFTDOWN, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_LEFTDOWN.width * this.scl, IMG_PLAYER_IDLE_DOWN.height * this.scl);
      } else if (this.dir == "rightup") {
        image(IMG_PLAYER_IDLE_RIGHTUP, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_RIGHTUP.width * this.scl, IMG_PLAYER_IDLE_RIGHTUP.height * this.scl);
      } else if (this.dir == "leftup") {
        image(IMG_PLAYER_IDLE_LEFTUP, this.pos.x, this.pos.y, IMG_PLAYER_IDLE_LEFTUP.width * this.scl, IMG_PLAYER_IDLE_LEFTUP.height * this.scl);
      }
    } else if (this.shooting){
      if (this.dir == "down") {
        image(IMG_PLAYER_SHOOT_DOWN, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_DOWN.width * this.scl, IMG_PLAYER_SHOOT_DOWN.height * this.scl);
      } else if (this.dir == "up") {
        image(IMG_PLAYER_SHOOT_UP, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_UP.width * this.scl, IMG_PLAYER_SHOOT_UP.height * this.scl);
      } else if (this.dir == "right") {
        image(IMG_PLAYER_SHOOT_RIGHT, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_RIGHT.width * this.scl, IMG_PLAYER_SHOOT_RIGHT.height * this.scl);
      } else if (this.dir == "left") {
        image(IMG_PLAYER_SHOOT_LEFT, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_LEFT.width * this.scl, IMG_PLAYER_SHOOT_LEFT.height * this.scl);
      } else if (this.dir == "rightdown") {
        image(IMG_PLAYER_SHOOT_RIGHTDOWN, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_RIGHTDOWN.width * this.scl, IMG_PLAYER_SHOOT_RIGHTDOWN.height * this.scl);
      } else if (this.dir == "leftdown") {
        image(IMG_PLAYER_SHOOT_LEFTDOWN, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_LEFTDOWN.width * this.scl, IMG_PLAYER_SHOOT_DOWN.height * this.scl);
      } else if (this.dir == "rightup") {
        image(IMG_PLAYER_SHOOT_RIGHTUP, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_RIGHTUP.width * this.scl, IMG_PLAYER_SHOOT_RIGHTUP.height * this.scl);
      } else if (this.dir == "leftup") {
        image(IMG_PLAYER_SHOOT_LEFTUP, this.pos.x, this.pos.y, IMG_PLAYER_SHOOT_LEFTUP.width * this.scl, IMG_PLAYER_SHOOT_LEFTUP.height * this.scl);
      }
    } else {
      if (this.runDir == "down") {
        image(IMG_PLAYER_MOVEMENT_DOWN[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_DOWN[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_DOWN[this.frame].height * this.scl);
      } else if (this.runDir == "up") {
        image(IMG_PLAYER_MOVEMENT_UP[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_UP[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_UP[this.frame].height * this.scl);
      } else if (this.runDir == "right") {
        image(IMG_PLAYER_MOVEMENT_RIGHT[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_RIGHT[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_RIGHT[this.frame].height * this.scl);
      } else if (this.runDir == "left") {
        image(IMG_PLAYER_MOVEMENT_LEFT[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_LEFT[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_LEFT[this.frame].height * this.scl);
      } else if (this.runDir == "rightdown") {
        image(IMG_PLAYER_MOVEMENT_RIGHTDOWN[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_RIGHTDOWN[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_RIGHTDOWN[this.frame].height * this.scl);
      } else if (this.runDir == "leftdown") {
        image(IMG_PLAYER_MOVEMENT_LEFTDOWN[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_LEFTDOWN[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_LEFTDOWN[this.frame].height * this.scl);
      } else if (this.runDir == "rightup") {
        image(IMG_PLAYER_MOVEMENT_RIGHTUP[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_RIGHTUP[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_RIGHTUP[this.frame].height * this.scl);
      } else if (this.runDir == "leftup") {
        image(IMG_PLAYER_MOVEMENT_LEFTUP[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_MOVEMENT_LEFTUP[this.frame].width * this.scl, IMG_PLAYER_MOVEMENT_LEFTUP[this.frame].height * this.scl);
      }
    }
  } else {
    image(IMG_PLAYER_DEATH[this.frame], this.pos.x, this.pos.y, IMG_PLAYER_DEATH[this.frame].width * this.scl, IMG_PLAYER_DEATH[this.frame].height * this.scl);
  }

}

Player.prototype.renderCrosshair = function() {
  push();
  imageMode(CENTER);
  image(IMG_CROSSHAIR, camera.pos.x - (width * 0.5) + mouseX, camera.pos.y - (height * 0.5) + mouseY, 32, 32);
  pop();
}

Player.prototype.movement = function() {
  let right = false;
  let left = false;
  let down = false;
  let up = false;

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {right = true;}
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {left = true;}
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {down = true;}
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {up = true;}

  //Idle Check
  if (!right && !left && !down && !up) {this.idle = true;} else {this.idle = false;}


  if (right && left) {
    //Do Nothing
  } else if (right) {
    player.vel.x = this.speed;
  } else if (left) {
    player.vel.x = -this.speed;
  } else {
    player.vel.x = lerp(this.vel.x, 0, this.friction);
  }

  if (down && up) {
    //Do Nothing
  } else if (down) {
    player.vel.y = this.speed;
  } else if (up) {
    player.vel.y = -this.speed;
  } else {
    player.vel.y = lerp(this.vel.y, 0, this.friction);
  }
}

Player.prototype.shoot = function() {
  if (player.bullets > 0) {
    if (millis() >= this.tempTime + (1000 / this.fireRate)) {
      chShootingPos = createVector(mouseX, mouseY);
      this.tempTime = millis();
      this.tempShootAnimTime = millis();
      let dir = createVector(mouseX - (width * 0.5), mouseY - (height * 0.5));
      dir.setMag(this.bulletSpeed);
      if (dir.mag() > 0) {
        player.bullets--;
        bullets.push(new Bullet(player.pos.x + (320 * this.scl * 0.5), player.pos.y + (320 * this.scl * 0.5), dir.x, dir.y));
      }
    }
  }
}

Player.prototype.craftTurret = function() {
  if (player.scrap >= turretCost) {
    player.scrap -= turretCost;
    turretAmount++;
  }
}

Player.prototype.craftBarbedWire = function() {
  if (player.scrap >= barbedWireCost) {
    player.scrap -= barbedWireCost;
    barbedWireAmount++;
  }
}

Player.prototype.craftBullet = function() {
  if (player.scrap >= bulletCost) {
    player.scrap -= bulletCost;
    player.bullets += 10;
  }
}


function PlayerShoot() {
  if (mouseIsPressed && !player.placingTuret && !player.placingBarbedWire) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height - 128) {
      player.shoot();
    }
  }
}
