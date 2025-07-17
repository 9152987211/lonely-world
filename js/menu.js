
function Menu() {
  translate(0, 0);
  image(IMG_MENU, 0, 0, 1024, 768);

  //Play Button
  let w = 256;
  let h = 64;
  let x = (width * 0.5) - (w * 0.5);
  let y = (height * 0.5);
  image(IMG_BUTTON, x, y, w, h);

  let tc = color(255);
  stroke(tc);
  fill(tc);
  strokeWeight(1);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("PLAY", width * 0.5, (height * 0.5) + (h * 0.5));

  if (mouseIsPressed) {
    if (mouseX >= x && mouseX <= x + w) {
      if (mouseY >= y && mouseY <= y + h) {
        menu_play();
      }
    }
  }
}

function menu_play() {
  menuOpen = false;
  if (!introPlayed) {SOUND_BUNKER.play(); introPlayed = true;}
  setup();

}

function FadeInDisplay() {
  push();
  translate(camera.pos.x - (width * 0.5), camera.pos.y - (height * 0.5));
  noStroke();
  fill(0, fadeAlpha);
  rect(0, 0, width, height);
  pop();

  if (millis() >= fadeStartTime + fadeLength) {
    if (!bgMusicPlaying && fadeAlpha === 0) {SOUND_BACKGROUND_MUSIC.play(); bgMusicPlaying = true;}
    fadeAlpha -= 1;
    if (fadeAlpha < 0) {
      fadeAlpha = 0;
    }



    if (fadeAlpha < 100) {
      turretCraftBUTTON.show();
      barbedWireCraftBUTTON.show();
      bulletCraftBUTTON.show();
    }
  }
}






function GameOver() {
  push();
  translate(camera.pos.x - (width * 0.5), camera.pos.y - (height * 0.5));
  noStroke();
  fill(150, 0, 0, fadeOutAlpha);
  rect(0, 0, width, height);
  if (fadeOutAlpha == 99) {endTime = millis();}
  if (fadeOutAlpha < 100) {
    fadeOutAlpha += 1;
  } else {
    turretCraftBUTTON.hide();
    barbedWireCraftBUTTON.hide();
    bulletCraftBUTTON.hide();
    image(IMG_GAMEOVER, (width * 0.5) - 320, (height * 0.5) - 320, 640, 640);
    if (millis() >= endTime + endLength) {
      noStroke();
      fill(0);
      rect(0, 0, width, height);
      image(IMG_CREDITS, 0, 0, width, height);
      if (!creditTimerStarted) {creditTimerStarted = true; creditTime = millis();}

      if (millis() >= creditTime + creditLength) {
        menuOpen = true;
        cursor();
      }
    }
  }


  pop();
}
