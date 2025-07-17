
function Wave() {
  if (!waveInProgress) {
    if (millis() >= waveTempTime + waveCooldown) {
      waveInProgress = true;
      waveAmount = int(waveAmount * waveAmountMULTIPLIER);
      wave++;
      waveTempSpawnTime = millis();
      waveAmountLeftToAdd = waveAmount;
    }
  } else {
    if (millis() >= waveTempSpawnTime + waveSpawnRate && waveAmountLeftToAdd) {
      waveTempSpawnTime = millis();
      waveAmountLeftToAdd--;
      zombies.push(new Zombie(roadEndPos[int(random(8))]));
    }
    if (waveAmountLeftToAdd === 0) {
      waveInProgress = false;
    }
  }

}




function Zombie(p) {
  this.pos = createVector(p.x, p.y);
  this.vel = createVector(bunker.pos.x - this.pos.x + random(-80, 80), bunker.pos.y - this.pos.y + random(-80, 80));
  this.defaultSpeed = random(0.8, 2);
  this.speed = this.defaultSpeed;
  this.vel.setMag(this.speed);
  this.scl = 0.25;
  this.alive = true;
  this.target = "bunker";
  this.frame = 0;
}

Zombie.prototype.update = function() {
  if (counter % 16 === 0) {
    if (this.frame === 0) {this.frame = 1;} else {this.frame = 0}
  }


  this.pos.add(this.vel);

  if (counter % 32 === 0) {
    let pV = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y);
    let pD = pV.mag();

    let bV = createVector(bunker.pos.x + (334 * 0.5) - this.pos.x, bunker.pos.y + (287 * 0.5) - this.pos.y);
    let bD = bV.mag();

    if (pD < bD) {
      this.target = "player";
    } else {
      this.target = "bunker";
    }

    if (this.target == "bunker") {
      this.vel.x = bunker.pos.x - this.pos.x;
      this.vel.y = bunker.pos.y - this.pos.y;
    } else if (this.target == "player")  {
      this.vel.x = player.pos.x - this.pos.x;
      this.vel.y = player.pos.y - this.pos.y;
    }
    this.vel.setMag(this.speed);
  }


  let s = 0.4;
  //Colliding With Player:
  if (millis() >= player.tempStunTime + player.stunTime) {
    if (this.pos.x + (320 * this.scl * s) >= player.pos.x && this.pos.x <= player.pos.x + (320 * this.scl * s)) {
      if (this.pos.y + (320 * this.scl * s) >= player.pos.y && this.pos.y <= player.pos.y + (320 * this.scl * s)) {
        player.health--;
        player.vel.copy(this.vel);
        player.vel.mult(0.8);
        player.tempStunTime = millis();
      }
    }
  }
}

Zombie.prototype.render = function() {
  image(IMG_ZOMBIE1[this.frame], this.pos.x, this.pos.y, IMG_ZOMBIE1[this.frame].width * this.scl, IMG_ZOMBIE1[this.frame].height * this.scl);
}

function ZombieFunctions() {
  for (let i = zombies.length - 1; i >= 0; i--) {
    if (zombies[i].alive) {
      zombies[i].update();
      zombies[i].render();
    } else {
      if (random() < 0.7) {scrap.push(new Scrap(zombies[i].pos.x + (320 * zombies[i].scl * 0.5), zombies[i].pos.y + (320 * zombies[i].scl)));}
      deadZombies.push(new DeadZombie(zombies[i].pos.x, zombies[i].pos.y));
      zombies.splice(i, 1);
      zombiesKilled++;
    }
  }
}







function DeadZombie(x, y) {
  this.pos = createVector(x, y);
  this.frame = 0;
  this.scl = 0.25;
  this.index = int(random(4));
  this.exists = true;
  this.spawnTime = millis();
  this.deadtime = 180 * 1000;
}

DeadZombie.prototype.update = function() {
  if (counter % 8 === 0 && this.frame < 2) {
    this.frame++;
  }

  if (millis() >= this.spawnTime + this.deadtime) {
    this.exists = false;
  }
}

DeadZombie.prototype.render = function() {
  if (this.frame < 2) {
    image(IMG_ZOMBIE1_DEATH[this.frame], this.pos.x, this.pos.y, IMG_ZOMBIE1_DEATH[this.frame].width * this.scl, IMG_ZOMBIE1_DEATH[this.frame].height * this.scl);
  } else {
    image(IMG_ZOMBIE1_DEATH_FINAL[this.index], this.pos.x, this.pos.y, IMG_ZOMBIE1_DEATH_FINAL[this.index].width * this.scl, IMG_ZOMBIE1_DEATH_FINAL[this.index].height * this.scl);
  }
}

function DeadZombies() {
  for (let i = deadZombies.length - 1; i >= 0; i--) {
    if (deadZombies[i].exists) {
      deadZombies[i].update();
      deadZombies[i].render();
    } else {
      deadZombies.splice(i, 1);
    }
  }
}
