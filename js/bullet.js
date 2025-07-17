
function Bullet(x, y, vx, vy) {
	this.pos = createVector(x, y);
	this.vel = createVector(vx, vy);
	this.r = 6;
	this.exists = true;
}

Bullet.prototype.update = function() {
	this.pos.add(this.vel);

	for (let i = zombies.length - 1; i >= 0; i--) {
		if (this.pos.x + this.r >= zombies[i].pos.x && this.pos.x - this.r <= zombies[i].pos.x + (320 * zombies[i].scl)) {
			if (this.pos.y + this.r >= zombies[i].pos.y && this.pos.y - this.r <= zombies[i].pos.y + (320 * zombies[i].scl)) {
				zombies[i].alive = false;
				this.exists = false;
			}
		}
	}
}

Bullet.prototype.render = function() {
	fill(255, 255, 100, 100);
	noStroke();
	ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
}


function BulletFunctions() {
	for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].exists) {
      bullets[i].update();
      bullets[i].render();
    } else {
      bullets.splice(i, 1);
    }
  }
}
