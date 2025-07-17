
function renderUI() {

  push();

  translate(camera.pos.x - (width * 0.5), camera.pos.y - (height * 0.5));

  UI_HOTBAR();
  UI_HEALTHTICKS();
  UI_RIGHTSIDEICONS();
  UI_LEFTSIDEICONS();
  UI_TIMER();
  UI_ZOMBIESKILLED();
  UI_FRAMERATE();

	pop();
}

function UI_HOTBAR() {
  image(IMG_HOTBAR, 0, height - IMG_HOTBAR.height);
}

function UI_HEALTHTICKS() {
  let startX = 332;
  let startY = height - IMG_HOTBAR.height + 30;
  for (let i = 0; i < player.health; i++) {
    image(IMG_HEALTHTICK[player.healthSprites[i]], startX + (i * 6) + (i * 32), startY);
  }
}

function UI_RIGHTSIDEICONS() {
  let tc = color(255, 200, 130);
  //Scrap Icon
  let x = width - 192;
  let y = height - 114;
  let w = 32;
  let h = 32;
  image(IMG_ICON_SCRAP, x, y, w, h);
  //Scrap Text
  stroke(tc);
  strokeWeight(1);
  fill(tc);
  let ts = 16;
  textSize(ts);
  text(player.scrap, x + w + 6, y + (ts * 1.25));

  //Bullet Icon
  x = width - 192;
  y = height - 114 + h + 16;
  w = 32;
  h = 32;
  image(IMG_ICON_BULLET, x, y, w, h);
  //Bullet Text
  stroke(tc);
  strokeWeight(1);
  fill(tc);
  ts = 16;
  textSize(ts);
  text(player.bullets, x + w + 6, y + (ts * 1.25));
}

function UI_LEFTSIDEICONS() {
  let startX = 32;
  let startY = height - IMG_HOTBAR.height + 8;
  let spacing = 32;
  let x;
  let ts = 16;
  let tc = color(255, 200, 130);

  textSize(ts);
  stroke(tc);
  fill(tc);
  strokeWeight(1);
  textAlign(CENTER);

  x = startX;
  image(IMG_ICON_TURRET, x, startY, 64, 64);
  text(turretCost, x + 32, startY + 72);

  x = startX + spacing + 64;
  image(IMG_ICON_BARBEDWIRE, x, startY, 64, 64);
  text(barbedWireCost, x + 32, startY + 72);

  x = startX + (2 * spacing) + (2 * 64);
  image(IMG_ICON_BULLET, x + 4, startY, 56, 56);
  text(bulletCost, x + 32, startY + 72);

  stroke(255);
  strokeWeight(1);
  fill(255);
  textSize(12);
  textAlign(RIGHT);

  text(turretAmount, startX + 56, startY + 52);
  text(barbedWireAmount, startX + spacing + 64 + 56, startY + 52);
}

function UI_TIMER() {
  let tc = color(255, 200, 130);
  stroke(tc);
  fill(tc);
  strokeWeight(1);
  let time = 0;
  if (player.health >= 0) {
    time= int(millis() / 1000) - int(startTime / 1000);
  } else {
    time = finshedTime;
  }

  mins = int(time / 60);
  secs = time - (mins * 60);
  textAlign(CENTER);
  textSize(32);
  if (mins < 10) {
    if (secs < 10) {
      text("0" + mins + ":0" + secs, width * 0.5, 32);
    } else {
      text("0" + mins + ":" + secs, width * 0.5, 32);
    }
  } else {
    if (secs < 10) {
      text(mins + ":0" + secs, width * 0.5, 32);
    } else {
      text(mins + ":" + secs, width * 0.5, 32);
    }
  }
}

function UI_ZOMBIESKILLED() {
  let tc = color(255, 200, 130);
  stroke(tc);
  fill(tc);
  strokeWeight(1);
  textAlign(LEFT);
  textSize(32);
  text(zombiesKilled, 72, 32);

  image(IMG_ZOMBIE1_DEATH_FINAL[0], 4, -24, 64, 64);
}

function UI_FRAMERATE() {
  let tc = color(255, 200, 130);
  stroke(tc);
  fill(tc);
  strokeWeight(1);
  textAlign(RIGHT);
  textSize(32);
  text(fps, width - 10, 32);
}
