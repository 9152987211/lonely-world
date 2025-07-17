let WORLD_W = 4096;
let WORLD_H = 3072;
let player;
let camera;
let bunker;
let bullets = [];
let chShootingPos;
let counter = 0;
let roadEndPos;
let zombies = [];
let solids = [];
let scrap = [];
let deadZombies = [];
let mins = 0;
let secs = 0;
let zombiesKilled = 0;
let fps = 0;
let startTime = 0;

let endTime = 0;
let endLength = 10 * 1000;

let introPlayed = false;

let creditTime = 0;
let creditLength = 10 * 1000;
let creditTimerStarted = false;

let turrets = [];
let barbedWire = [];

let wave = 0;
let waveAmount = 30;
let waveSpawnRate = 700; //Number of milliseconds inbetween each enemy spawned
let waveTempTime = 0;
let waveTempSpawnTime = 0;
let waveAmountMULTIPLIER = 1.7;
let waveCooldown = 10000//20000;
let waveInProgress = false;
let waveAmountLeftToAdd = waveAmount;

let barbedWireCost = 5;
let turretCost = 20;
let bulletCost = 2;
let bulletAmount = 5;
let turretAmount = 0;
let barbedWireAmount = 0;

let barbedWireCraftBUTTON;
let turretCraftBUTTON;
let bulletCraftBUTTON;

let menuOpen = true;

let fadeStartTime = 0;
let fadeLength = 13 * 1000;
let fadeAlpha = 255;

let fadeOutAlpha = 0;

let bgMusicPlaying = false;

let finshedTime = 0;
let gotFinishedTime = false;

let IMG_PLAYER_IDLE_RIGHT;
let IMG_PLAYER_IDLE_LEFT;
let IMG_PLAYER_IDLE_DOWN;
let IMG_PLAYER_IDLE_UP;
let IMG_PLAYER_IDLE_RIGHTDOWN;
let IMG_PLAYER_IDLE_LEFTDOWN;
let IMG_PLAYER_IDLE_RIGHTUP;
let IMG_PLAYER_IDLE_LEFTUP;

let IMG_PLAYER_SHOOT_RIGHT;
let IMG_PLAYER_SHOOT_LEFT;
let IMG_PLAYER_SHOOT_DOWN;
let IMG_PLAYER_SHOOT_UP;
let IMG_PLAYER_SHOOT_RIGHTDOWN;
let IMG_PLAYER_SHOOT_LEFTARROW;
let IMG_PLAYER_SHOOT_RIGHTUP;
let IMG_PLAYER_SHOOT_LEFTUP;

let IMG_PLAYER_MOVEMENT_RIGHT;
let IMG_PLAYER_MOVEMENT_LEFT;
let IMG_PLAYER_MOVEMENT_DOWN;
let IMG_PLAYER_MOVEMENT_UP;
let IMG_PLAYER_MOVEMENT_RIGHTDOWN;
let IMG_PLAYER_MOVEMENT_LEFTDOWN;
let IMG_PLAYER_MOVEMENT_RIGHTUP;
let IMG_PLAYER_MOVEMENT_LEFTUP;

let IMG_PLAYER_DEATH;

let IMG_CROSSHAIR;
let IMG_HOTBAR;
let IMG_HEALTHTICK;
let IMG_MAP;
let IMG_NOISE;

let IMG_ICON_BULLET;
let IMG_ICON_SCRAP;

let IMG_ZOMBIE1;
let IMG_ZOMBIE1_DEATH;
let IMG_ZOMBIE1_DEATH_FINAL;

let IMG_SCRAP;
let IMG_BUNKER;

let IMG_ICON_TURRET;
let IMG_ICON_BARBEDWIRE;

let IMG_TURRET_RIGHT;
let IMG_TURRET_LEFT;
let IMG_TURRET_DOWN;
let IMG_TURRET_UP;

let IMG_TURRET_RIGHT_PLACING;
let IMG_TURRET_LEFT_PLACING;
let IMG_TURRET_DOWN_PLACING;
let IMG_TURRET_UP_PLACING;

let IMG_BARBEDWIRE;
let IMG_BARBEDWIRE_PLACING;

let IMG_MENU;
let IMG_BUTTON;

let SOUND_BACKGROUND_MUSIC;
let SOUND_BUNKER;

let IMG_GAMEOVER;
let IMG_CREDITS;



function preload() {
  IMG_PLAYER_DEATH = [
    loadImage("./assets/images/player/Death/1.png"),
    loadImage("./assets/images/player/Death/2.png"),
    loadImage("./assets/images/player/Death/3.png"),
    loadImage("./assets/images/player/Death/4.png")
  ];

  IMG_GAMEOVER = loadImage("./assets/images/lose.png");
  IMG_CREDITS = loadImage("./assets/images/Credits.png");

  IMG_MENU = loadImage("./assets/images/Menu.png");
  IMG_BUTTON = loadImage("./assets/images/Button.png")

  IMG_BARBEDWIRE = [
    loadImage("./assets/images/Wire/Placed/1.png"),
    loadImage("./assets/images/Wire/Placed/2.png")
  ];
  IMG_BARBEDWIRE_PLACING = loadImage("./assets/images/Wire/Placing/1.png");

  IMG_TURRET_RIGHT_PLACING = loadImage("./assets/images/Turret/Placing/Right.png");
  IMG_TURRET_LEFT_PLACING = loadImage("./assets/images/Turret/Placing/Left.png");
  IMG_TURRET_DOWN_PLACING = loadImage("./assets/images/Turret/Placing/Down.png");
  IMG_TURRET_UP_PLACING = loadImage("./assets/images/Turret/Placing/Up.png");

  IMG_TURRET_RIGHT = loadImage("./assets/images/Turret/Placed/Right.png");
  IMG_TURRET_LEFT = loadImage("./assets/images/Turret/Placed/Left.png");
  IMG_TURRET_DOWN = loadImage("./assets/images/Turret/Placed/Down.png");
  IMG_TURRET_UP = loadImage("./assets/images/Turret/Placed/Up.png");

  IMG_CROSSHAIR = loadImage("./assets/images/crosshair.png");
  IMG_HOTBAR = loadImage("./assets/images/HotBar/HotBar 1.png");
  IMG_MAP = loadImage("./assets/images/Map.png");
  IMG_NOISE = loadImage("./assets/images/Noise.png");

  IMG_ICON_TURRET = loadImage("./assets/images/Icons/Turret.png");
  IMG_ICON_BARBEDWIRE = loadImage("./assets/images/Icons/Barbed Wire.png");

  IMG_ICON_BULLET = loadImage("./assets/images/Icons/Bullet.png");
  IMG_ICON_SCRAP = loadImage("./assets/images/Icons/Scrap.png");

  IMG_SCRAP = loadImage("./assets/images/Scrap.png");
  IMG_BUNKER = loadImage("./assets/images/Bunker.png");

  IMG_HEALTHTICK = [
    loadImage("./assets/images/HotBar/Health Ticks/HealthTick1.png"),
    loadImage("./assets/images/HotBar/Health Ticks/HealthTick2.png"),
    loadImage("./assets/images/HotBar/Health Ticks/HealthTick3.png"),
    loadImage("./assets/images/HotBar/Health Ticks/HealthTick4.png")
  ];

  IMG_ZOMBIE1 = [
    loadImage("./assets/images/Zombies/Zombie 1/1.png"),
    loadImage("./assets/images/Zombies/Zombie 1/2.png")
  ];

  IMG_ZOMBIE1_DEATH = [
    loadImage("./assets/images/Zombies/Zombie 1/dead/1.png"),
    loadImage("./assets/images/Zombies/Zombie 1/dead/2.png")
  ];
  IMG_ZOMBIE1_DEATH_FINAL = [
    loadImage("./assets/images/Zombies/Zombie 1/dead/3.png"),
    loadImage("./assets/images/Zombies/Zombie 1/dead/4.png"),
    loadImage("./assets/images/Zombies/Zombie 1/dead/5.png"),
    loadImage("./assets/images/Zombies/Zombie 1/dead/6.png")
  ];

  IMG_PLAYER_IDLE_RIGHT = loadImage("./assets/images/player/idle/3 Right.png");
  IMG_PLAYER_IDLE_LEFT = loadImage("./assets/images/player/idle/7 Left.png");
  IMG_PLAYER_IDLE_DOWN = loadImage("./assets/images/player/idle/5 Down.png");
  IMG_PLAYER_IDLE_UP = loadImage("./assets/images/player/idle/1 Up.png");
  IMG_PLAYER_IDLE_RIGHTDOWN = loadImage("./assets/images/player/idle/4 Down Right.png");
  IMG_PLAYER_IDLE_LEFTDOWN = loadImage("./assets/images/player/idle/6 Down Left.png");
  IMG_PLAYER_IDLE_RIGHTUP = loadImage("./assets/images/player/idle/2 Up Right.png");
  IMG_PLAYER_IDLE_LEFTUP = loadImage("./assets/images/player/idle/8 Up Left.png");

  IMG_PLAYER_SHOOT_RIGHT = loadImage("./assets/images/player/shoot/3 Right.png");
  IMG_PLAYER_SHOOT_LEFT = loadImage("./assets/images/player/shoot/7 Left.png");
  IMG_PLAYER_SHOOT_DOWN = loadImage("./assets/images/player/shoot/5 Down.png");
  IMG_PLAYER_SHOOT_UP = loadImage("./assets/images/player/shoot/1 Up.png");
  IMG_PLAYER_SHOOT_RIGHTDOWN = loadImage("./assets/images/player/shoot/4 Down Right.png");
  IMG_PLAYER_SHOOT_LEFTDOWN = loadImage("./assets/images/player/shoot/6 Down Left.png");
  IMG_PLAYER_SHOOT_RIGHTUP = loadImage("./assets/images/player/shoot/2 Up Right.png");
  IMG_PLAYER_SHOOT_LEFTUP = loadImage("./assets/images/player/shoot/8 Up Left.png");

  IMG_PLAYER_MOVEMENT_RIGHT = [
    loadImage("./assets/images/player/movement/Run Right/1.png"),
    loadImage("./assets/images/player/movement/Run Right/2.png"),
    loadImage("./assets/images/player/movement/Run Right/3.png"),
    loadImage("./assets/images/player/movement/Run Right/4.png")
  ];
  IMG_PLAYER_MOVEMENT_LEFT = [
    loadImage("./assets/images/player/movement/Run Left/1.png"),
    loadImage("./assets/images/player/movement/Run Left/2.png"),
    loadImage("./assets/images/player/movement/Run Left/3.png"),
    loadImage("./assets/images/player/movement/Run Left/4.png")
  ];
  IMG_PLAYER_MOVEMENT_DOWN = [
    loadImage("./assets/images/player/movement/Run Down/1.png"),
    loadImage("./assets/images/player/movement/Run Down/2.png"),
    loadImage("./assets/images/player/movement/Run Down/3.png"),
    loadImage("./assets/images/player/movement/Run Down/4.png")
  ];
  IMG_PLAYER_MOVEMENT_UP = [
    loadImage("./assets/images/player/movement/Run Up/1.png"),
    loadImage("./assets/images/player/movement/Run Up/2.png"),
    loadImage("./assets/images/player/movement/Run Up/3.png"),
    loadImage("./assets/images/player/movement/Run Up/4.png")
  ];
  IMG_PLAYER_MOVEMENT_RIGHTDOWN = [
    loadImage("./assets/images/player/movement/Run Down Right/1.png"),
    loadImage("./assets/images/player/movement/Run Down Right/2.png"),
    loadImage("./assets/images/player/movement/Run Down Right/3.png"),
    loadImage("./assets/images/player/movement/Run Down Right/4.png")
  ];
  IMG_PLAYER_MOVEMENT_LEFTDOWN = [
    loadImage("./assets/images/player/movement/Run Down Left/1.png"),
    loadImage("./assets/images/player/movement/Run Down Left/2.png"),
    loadImage("./assets/images/player/movement/Run Down Left/3.png"),
    loadImage("./assets/images/player/movement/Run Down Left/4.png")
  ];
  IMG_PLAYER_MOVEMENT_RIGHTUP = [
    loadImage("./assets/images/player/movement/Run Up Right/1.png"),
    loadImage("./assets/images/player/movement/Run Up Right/2.png"),
    loadImage("./assets/images/player/movement/Run Up Right/3.png"),
    loadImage("./assets/images/player/movement/Run Up Right/4.png")
  ];
  IMG_PLAYER_MOVEMENT_LEFTUP = [
    loadImage("./assets/images/player/movement/Run Up Left/1.png"),
    loadImage("./assets/images/player/movement/Run Up Left/2.png"),
    loadImage("./assets/images/player/movement/Run Up Left/3.png"),
    loadImage("./assets/images/player/movement/Run Up Left/4.png")
  ];

  SOUND_BACKGROUND_MUSIC = new Howl({
    src: ["./assets/sounds/Loopable Background Music.mp3"],
    volume: 0.1,
    loop: true
  });

  SOUND_BUNKER = new Howl({
    src: ["./assets/sounds/Bunker.mp3"],
    volume: 0.1,
    loop: false
  });
}



function setup() {

  angleMode(RADIANS);
  textFont("Courier New");
  createCanvas(1024, 768);
  player = new Player();
  camera = new Camera();
  bunker = new Bunker();

  roadEndPos = [
    createVector(1476, 0),
    createVector(2588, 0),
    createVector(4096, 1090),
    createVector(4096, 1965),
    createVector(2591, 3072),
    createVector(1474, 3072),
    createVector(0, 1962),
    createVector(0, 1087)
  ];

  setupSolids();

  zombies = [];
  deadZombies = [];
  zombiesKilled = 0;
  startTime = millis();
  creditTimerStarted = false;



  if (!menuOpen) {
    noCursor();
    barbedWireCraftBUTTON = createButton("Craft");
    turretCraftBUTTON = createButton("Craft");
    bulletCraftBUTTON = createButton("Craft");

    turretCraftBUTTON.position(38, height - 32);
    barbedWireCraftBUTTON.position(134, height - 32);
    bulletCraftBUTTON.position(230, height - 32);

    turretCraftBUTTON.mousePressed(player.craftTurret);
    barbedWireCraftBUTTON.mousePressed(player.craftBarbedWire);
    bulletCraftBUTTON.mousePressed(player.craftBullet);

    turretCraftBUTTON.hide();
    barbedWireCraftBUTTON.hide();
    bulletCraftBUTTON.hide();
  }
}



function draw() {
  if (menuOpen) {
    Menu();
  } else {
    counter++;
    background(51);
    camera.update();
    translate((width * 0.5) - camera.pos.x, (height * 0.5) - camera.pos.y);
    renderWorld();


    if (player.health > 0) {PlayerShoot()};

    bunker.render();

    DeadZombies();

    BarbedWireFunctions();
    TurretFunctions();

    ScrapFunctions();

    if (millis() >= player.tempStunTime + player.stunTime && player.health > 0) {
      player.movement();
    }

    player.update();

    SolidCollisions();

    player.render();

    ZombieFunctions();


    BulletFunctions();

    if (counter % 32 === 0) {
      fps = int(frameRate());
    }
    renderUI();

    player.renderCrosshair();

    Wave();

    FadeInDisplay();

    if (player.health <= 0) {
      if (!gotFinishedTime) {gotFinishedTime = true; finshedTime = int(millis() / 1000) - int(startTime / 1000); player.frame = 0;}
      GameOver();
    }
  }
}





function keyPressed() {
  if (keyCode == 49 && !player.placingTuret && !player.placingBarbedWire && turretAmount > 0) {
    player.placingTuret = true;
  } else if (keyCode == 82 && player.placingTuret) {
    if (player.placingTurretDir == "right") {
      player.placingTurretDir = "down";
    } else if (player.placingTurretDir == "down") {
      player.placingTurretDir = "left";
    } else if (player.placingTurretDir == "left") {
      player.placingTurretDir = "up";
    } else if (player.placingTurretDir == "up") {
      player.placingTurretDir = "right";
    }
  } else if (keyCode == 50 && !player.placingTuret && !player.placingBarbedWire && barbedWireAmount > 0) {
    player.placingBarbedWire = true;
  } else if (keyCode == 27) {
    player.placingTuret = false;
    player.placingBarbedWire = false;
  }
}





function mousePressed() {
  if (player.placingTuret) {
    player.placingTuret = false;
    turretAmount--;
    turrets.push(new Turret(camera.pos.x - (width * 0.5) + mouseX - (320 * 0.25 * 0.5), camera.pos.y - (height * 0.5) + mouseY - (320 * 0.25 * 0.5), player.placingTurretDir));
  } else if (player.placingBarbedWire) {
    player.placingBarbedWire = false;
    barbedWireAmount--;
    barbedWire.push(new BarbedWire(camera.pos.x - (width * 0.5) + mouseX - (320 * 0.25 * 0.5), camera.pos.y - (height * 0.5) + mouseY - (320 * 0.25 * 0.5)));
  }
}
