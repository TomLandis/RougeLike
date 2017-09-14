"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Viewer = function (_React$Component) {
  _inherits(Viewer, _React$Component);

  function Viewer(props) {
    _classCallCheck(this, Viewer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      gmap: "gameMap",
      pos: "startPos",
      stage: 1,
      playerTurn: true,
      lev2: "",
      lev3: "",
      lev4: "",
      killCount: 0,
      message1: "",
      message2: "",
      message3: "",
      itemCount: 0,
      weaponLevel: 1,
      dead: "hidden",
      winning: "hidden",
      possibleWeapons: {
        2: "toilet plunger",
        3: "rolled up catalogue",
        4: "phone book",
        5: "nerf gun"
      },
      stats: { level: 1, HP: 100, XP: 0, NextLevel: 100, Weapon: "thumbtack" }
    };
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.playAgain = _this.playAgain.bind(_this);
    _this.up = _this.up.bind(_this);
    _this.down = _this.down.bind(_this);
    _this.left = _this.left.bind(_this);
    _this.right = _this.right.bind(_this);

    return _this;
  }

  Viewer.prototype.componentWillMount = function componentWillMount() {
    var walls = [];
    var i = undefined,
        j = undefined,
        rand = undefined,
        monsterHP = undefined;
    var setUp = [];
    var shell = [];
    var setUp2 = [];
    var level2 = [];
    var level3 = [];
    var level4 = [];
    var level20 = [];
    var level30 = [];
    var level40 = [];
    var row = [];
    var gameMap = [];
    var startPos = 1206;
    var monmon = undefined;
    var numMon = 0;
    var monLev = 1;
    var monsters = [{
      name: "mosquito",
      health: 15,
      attack: [2, 1, 3, 4]
    }, {
      name: "toad",
      health: 30,
      attack: [2, 3, 4, 5]
    }, {
      name: "wasp",
      health: 45,
      attack: [4, 5, 6, 7]
    }, {
      name: "rat",
      health: 60,
      attack: [6, 7, 8, 9]
    }, {
      name: "rabid stray cat",
      health: 75,
      attack: [10, 11, 12, 13]
    }];

    for (var _i = 0; _i < 1500; _i++) {
      row.push(_i);
    }

    //big map is 50x30 tiles
    //walls must be generated
    //first outer walls
    for (i = 0; i < 51; i++) {
      walls.push(i);
      level20.push(i);
      level30.push(i);
      level40.push(i);
    }
    for (i = 99; i < 1501; i += 50) {
      walls.push(i);
      level20.push(i);
      level30.push(i);
      level40.push(i);
    }
    for (i = 1499; i > 1450; i--) {
      walls.push(i);
      level20.push(i);
      level30.push(i);
      level40.push(i);
    }
    for (i = 1450; i > 50; i -= 50) {
      walls.push(i);
      level20.push(i);
      level30.push(i);
      level40.push(i);
    }

    //maze walls

    for (i = 461; i < 482; i++) {
      walls.push(i);
    }

    for (i = 511; i < 1500; i += 50) {
      walls.push(i);
    }
    for (i = 991; i > 1; i = i) {
      walls.push(i);
      i = i - 50;
    }
    for (i = 990; i > 971; i--) {
      walls.push(i);
    }

    for (var _i2 = 0; _i2 < 1500; _i2++) {
      if (walls.includes(_i2)) {
        gameMap.push({ place: _i2, wall: true, monster: false });
        level3.push({ place: _i2, wall: true, monster: false });
      } else if (_i2 === startPos) {
        gameMap.push({ place: _i2, wall: false, monster: false, player: true });
        level3.push({ place: _i2, wall: false, monster: false, player: true });
      } else if (_i2 === 145) {
        gameMap.push({ place: _i2, wall: false, monster: false, portal: true });
        level3.push({ place: _i2, wall: false, monster: false, portal: true });
      } else if (Math.random() > 0.99) {
        monsterHP = Math.random() * 100;
        monsterHP = Math.ceil(monsterHP);
        numMon++;
        //the first ten monsters will be level 1, the next ten level 2, the next ten lev 3...
        numMon < 10 ? monLev = 1 : numMon < 20 ? monLev = 2 : numMon < 30 ? monLev = 3 : numMon < 40 ? monLev = 4 : monLev = 5;

        if (monsterHP < 20) {
          monmon = monsters[0];
        } else if (monsterHP < 40) {
          monmon = monsters[1];
        } else if (monsterHP < 60) {
          monmon = monsters[2];
        } else if (monsterHP < 80) {
          monmon = monsters[3];
        } else {
          monmon = monsters[4];
        }
        gameMap.push({
          place: _i2,
          wall: false,
          monster: true,
          monsterHp: monsterHP,
          monName: monmon.name,
          attackRange: monmon.attack,
          monsterLev: monLev
        });
        level3.push({
          place: _i2,
          wall: false,
          monster: true,
          monsterHp: monsterHP * 2,
          monName: monmon.name,
          attackRange: monmon.attack,
          monsterLev: monLev * 2
        });
      } else if (Math.random() > 0.995) {
        var health = Math.random() * 100;
        health = Math.ceil(health);

        gameMap.push({
          place: _i2,
          wall: false,
          monster: false,
          health: true,
          ammount: health
        });
        level3.push({
          place: _i2,
          wall: false,
          monster: false,
          health: true,
          ammount: health
        });
      } else {
        gameMap.push({ place: _i2, wall: false, monster: false });
        level3.push({ place: _i2, wall: false, monster: false });
      }
    }
    //2nd Level creation

    for (i = 1000; i < 1040; i++) {
      level20.push(i);
      level40.push(i);
    }

    for (i = 611; i < 651; i++) {
      level20.push(i);
      level40.push(i);
    }

    for (var _i3 = 0; _i3 < 1500; _i3++) {
      if (level20.includes(_i3)) {
        level2.push({ place: _i3, wall: true, monster: false });
        level4.push({ place: _i3, wall: true, monster: false });
      } else if (_i3 === startPos) {
        level2.push({ place: _i3, wall: false, monster: false, player: true });
        level4.push({ place: _i3, wall: false, monster: false, player: true });
      } else if (_i3 === 145) {
        level2.push({ place: _i3, wall: false, monster: false, portal: true });
        level4.push({
          place: _i3,
          wall: false,
          monster: true,
          boss: true,
          monsterHp: 500,
          monsterLev: 8
        });
      } else if (Math.random() > 0.99) {
        monsterHP = Math.random() * 100;
        monsterHP = Math.ceil(monsterHP);
        numMon++;
        //the first ten monsters will be level 1, the next ten level 2, the next ten lev 3...
        numMon < 10 ? monLev = 1 : numMon < 20 ? monLev = 2 : numMon < 30 ? monLev = 3 : numMon < 40 ? monLev = 4 : monLev = 5;

        if (monsterHP < 20) {
          monmon = monsters[0];
        } else if (monsterHP < 40) {
          monmon = monsters[1];
        } else if (monsterHP < 60) {
          monmon = monsters[2];
        } else if (monsterHP < 80) {
          monmon = monsters[3];
        } else {
          monmon = monsters[4];
        }
        level2.push({
          place: _i3,
          wall: false,
          monster: true,
          monsterHp: monsterHP,
          monName: monmon.name,
          attackRange: monmon.attack,
          monsterLev: monLev
        });
        level4.push({
          place: _i3,
          wall: false,
          monster: true,
          monsterHp: monsterHP * 3,
          monName: monmon.name,
          attackRange: monmon.attack,
          monsterLev: monLev * 3
        });
      } else if (Math.random() > 0.995) {
        var health = Math.random() * 100;
        health = Math.ceil(health);

        level2.push({
          place: _i3,
          wall: false,
          monster: false,
          health: true,
          ammount: health
        });
        level4.push({
          place: _i3,
          wall: false,
          monster: false,
          health: true,
          ammount: health
        });
      } else {
        level2.push({ place: _i3, wall: false, monster: false });
        level4.push({ place: _i3, wall: false, monster: false });
      }
    }
    level4[145].boss = true;
    level4[145].monName = "Boss";
    level4[145].monster = false;
    level4[154].monterHp = 500;

    this.setState({
      firstStage: gameMap,
      gmap: gameMap,
      pos: startPos,
      lev2: level2,
      lev3: level3,
      lev4: level4
    });
    document.addEventListener("keydown", this.onKeyDown);
  };

  Viewer.prototype.calcViz = function calcViz() {
    var dangerZone = [];
    var daMap = this.state.gmap;
    var pos = this.state.pos;
    var visTiles = [];
    var start = pos - 255;
    var end = pos + 255;
    var y = 46;
    for (var c = 0; c < 10; c++) {
      for (var z = 0; z < 4; z++) {
        dangerZone.push(y + z);
      }
      y = y + 50;
    }
    //console.log(dangerZone);

    for (var n = 1; n < 11; n++) {
      for (var i = start; i < start + 11; i++) {
        if (i > -1 && i < 1500) {
          visTiles.push(i);
        }
      }
      start = start + 50;
    }
    //console.log(visTiles[0].toString().slice(-2));

    var targ = visTiles[0].toString().slice(-2);
    targ = parseInt(targ);
    // console.log(visTiles);
    if (targ === 99 || targ === 49) {
      var n = 0;
      for (var i = 0; i < 11; i++) {
        visTiles.splice(n, 1);
        n = n + 10;
      }
    }
    if (targ === 98 || targ === 48) {
      var n = 0;
      for (var i = 0; i < 11; i++) {
        visTiles.splice(n, 2);
        n = n + 9;
      }
    }
    if (targ === 97 || targ === 47) {
      var n = 0;
      for (var i = 0; i < 11; i++) {
        visTiles.splice(n, 3);
        n = n + 8;
      }
    }
    if (targ === 96 || targ === 46) {
      var n = 0;
      for (var i = 0; i < 11; i++) {
        visTiles.splice(n, 4);
        n = n + 7;
      }
    }
    pos = pos.toString().slice(-2);
    pos = parseInt(pos);
    //  console.log(pos);

    var avoid = [51, 52, 53, 54, 55, 1, 2, 3, 4, 5];

    if (avoid.includes(pos)) {
      var _loop = function _loop(i) {
        var tes = dangerZone[i];
        if (visTiles.includes(tes)) {
          visTiles = visTiles.filter(function (num) {
            return num !== tes;
          });
        }
      };

      for (var i = 0; i < dangerZone.length; i++) {
        _loop(i);
      }
    }
    for (var i = 0; i < visTiles.length; i++) {
      var num = visTiles[i];
      daMap[num].seeable = true;
    }
  };

  Viewer.prototype.playAgain = function playAgain() {
    function reloader() {
      location.reload(true);
    }

    reloader();
  };

  Viewer.prototype.win = function win() {
    this.setState({ winning: "modal" });
    // console.log("winning!")
  };

  Viewer.prototype.kill = function kill(nextPos) {
    var newMap = this.state.gmap;
    var newKill = this.state.killCount + 1;
    var monName = newMap[nextPos].monName;
    var exp = undefined;
    var toNextLev = this.state.stats.NextLevel;
    monName === "mosquito" ? exp = 25 : monName === "toad" ? exp = 35 : monName === "wasp" ? exp = 45 : monName === "rat" ? exp = 55 : exp = 75;
    var newMessage = "You killed a " + monName + "! You gained " + exp + " points of XP!";
    newMap[nextPos].monster = false;
    var newStats = this.state.stats;
    if (exp >= toNextLev) {
      newStats.level = newStats.level + 1;
    }
    if (newMap[nextPos].boss) {
      this.win();
    }
    exp > toNextLev ? newStats.NextLevel = 100 : newStats.NextLevel = toNextLev - exp;
    newStats.XP += exp;
    this.setState({
      message3: this.state.message2,
      message2: this.state.message1,
      message1: newMessage,
      playerTurn: false,
      gmap: newMap,
      stats: newStats,
      killCount: newKill
    });
  };

  Viewer.prototype.attack = function attack(nextPos) {
    var newMessage = undefined;
    var fix = this.state.gmap;
    var newHealth = undefined;
    var monsterhp = this.state.gmap[nextPos].monsterHp;
    var monName = this.state.gmap[nextPos].monName;
    var damage = undefined;
    var lev = this.state.stats.level;
    var rando = Math.random();
    var mlev = this.state.gmap[nextPos].monsterLev;
    rando = rando * 10;
    rando = Math.ceil(rando);
    damage = rando * lev;

    if (damage >= monsterhp) {
      this.kill(nextPos);
    } else {
      newHealth = monsterhp - damage;
      fix[nextPos].monsterHp = newHealth;
      if (!fix[nextPos].boss) {
        newMessage = "You attack a level " + mlev + " " + monName + " for " + damage + " points of damage!";
      } else {
        newMessage = "You attack the boss for " + damage + " points of damage!";
      }
      this.setState({
        message3: this.state.message2,
        message2: this.state.message1,
        message1: newMessage,
        gmap: fix
      });

      // console.log("you attack " + monName + " for " + damage + " points of damage!")
      //console.log("attack for " + rando +" points of damage!")
      this.setState({ playerTurn: false });
    }
  };

  Viewer.prototype.defend = function defend(np) {
    var mappy = undefined,
        myHealth = undefined,
        rando = undefined,
        mLev = undefined,
        damage = undefined,
        newHealth = undefined,
        newMessage = undefined,
        monName = undefined,
        newStats = undefined;
    mappy = this.state.gmap;
    myHealth = this.state.stats.HP;
    mLev = mappy[np].monsterLev;
    monName = mappy[np].monName;
    rando = Math.random();
    rando = rando * 10;
    rando = Math.ceil(rando);
    damage = rando * mLev;
    newStats = this.state.stats;
    newStats.HP = newStats.HP - damage;
    newHealth = myHealth - damage;
    if (damage > myHealth) {
      this.die();
    } else if (mappy[np].boss) {
      newMessage = "The " + monName + " attacks you for " + damage + " points of damage!";
      this.setState({
        message3: this.state.message2,
        message2: this.state.message1,
        message1: newMessage,
        playerTurn: true,
        stats: newStats
      });
    } else {
      newMessage = "A level " + mLev + " " + monName + " attacks you for " + damage + " points of damage!";
      this.setState({
        message3: this.state.message2,
        message2: this.state.message1,
        message1: newMessage,
        playerTurn: true,
        stats: newStats
      });
    }
  };

  Viewer.prototype.die = function die() {
    //  console.log("this is the abyss")
    this.setState({ dead: "modal" });
  };

  Viewer.prototype.fight = function fight(hp, name, attack, playerStats, turn, nextPos) {
    //  console.log(name);
    //  console.log(attack);
    //  console.log(turn);
    if (turn) {
      this.attack(nextPos);
    } else {
      this.defend(nextPos);
    }
  };

  Viewer.prototype.up = function up() {
    var currentPos = this.state.pos;
    var nextPos = currentPos - 50;
    var mapo = this.state.gmap;
    var attack = undefined,
        name = undefined,
        hp = undefined,
        stats = undefined,
        turn = undefined;
    turn = this.state.playerTurn;

    if (this.state.gmap[nextPos].portal) {
      this.nextMap(currentPos);
    } else if (this.state.gmap[nextPos].monster) {
      stats = this.state.stats;
      turn = this.state.playerTurn;
      name = this.state.gmap[nextPos].monName;
      hp = this.state.gmap[nextPos].monsterHp;
      attack = this.state.gmap[nextPos].attackRange;
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].boss) {
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].health) {
      this.health(nextPos, currentPos);
    } else if (!this.state.gmap[nextPos].wall) {
      mapo[nextPos].player = true;
      mapo[currentPos].player = false;
      this.setState({ gmap: mapo, pos: nextPos });
    }
  };

  Viewer.prototype.down = function down() {
    var currentPos = this.state.pos;
    var nextPos = currentPos + 50;
    var mapo = this.state.gmap;
    var attack = undefined,
        name = undefined,
        hp = undefined,
        stats = undefined,
        turn = undefined;
    turn = this.state.playerTurn;

    if (this.state.gmap[nextPos].portal) {
      this.nextMap(currentPos);
    } else if (this.state.gmap[nextPos].monster) {
      stats = this.state.stats;
      turn = this.state.playerTurn;
      name = this.state.gmap[nextPos].monName;
      hp = this.state.gmap[nextPos].monsterHp;
      attack = this.state.gmap[nextPos].attackRange;
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].boss) {
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].health) {
      this.health(nextPos, currentPos);
    } else if (!this.state.gmap[nextPos].wall) {
      mapo[nextPos].player = true;
      mapo[currentPos].player = false;
      this.setState({ gmap: mapo, pos: nextPos });
    }
  };

  Viewer.prototype.right = function right() {
    var currentPos = this.state.pos;
    var nextPos = currentPos + 1;
    var mapo = this.state.gmap;
    var attack = undefined,
        name = undefined,
        hp = undefined,
        stats = undefined,
        turn = undefined;
    turn = this.state.playerTurn;

    if (this.state.gmap[nextPos].portal) {
      this.nextMap(currentPos);
    } else if (this.state.gmap[nextPos].monster) {
      stats = this.state.stats;
      turn = this.state.playerTurn;
      name = this.state.gmap[nextPos].monName;
      hp = this.state.gmap[nextPos].monsterHp;
      attack = this.state.gmap[nextPos].attackRange;
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].boss) {
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].health) {
      this.health(nextPos, currentPos);
    } else if (!this.state.gmap[nextPos].wall) {
      mapo[nextPos].player = true;
      mapo[currentPos].player = false;
      this.setState({ gmap: mapo, pos: nextPos });
    }
  };

  Viewer.prototype.left = function left() {
    var currentPos = this.state.pos;
    var nextPos = currentPos - 1;
    var mapo = this.state.gmap;
    var attack = undefined,
        name = undefined,
        hp = undefined,
        stats = undefined,
        turn = undefined;
    turn = this.state.playerTurn;

    if (this.state.gmap[nextPos].portal) {
      this.nextMap(currentPos);
    } else if (this.state.gmap[nextPos].monster) {
      stats = this.state.stats;
      turn = this.state.playerTurn;
      name = this.state.gmap[nextPos].monName;
      hp = this.state.gmap[nextPos].monsterHp;
      attack = this.state.gmap[nextPos].attackRange;
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].boss) {
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].health) {
      this.health(nextPos, currentPos);
    } else if (!this.state.gmap[nextPos].wall) {
      mapo[nextPos].player = true;
      mapo[currentPos].player = false;
      this.setState({ gmap: mapo, pos: nextPos });
    }
  };

  Viewer.prototype.nextMap = function nextMap(p) {
    var next = undefined;
    var num = this.state.stage;
    num++;
    if (this.state.stage === 1) {
      next = this.state.lev2;
    } else if (this.state.stage === 2) {
      next = this.state.lev3;
    } else {
      next = this.state.lev4;
    }
    this.setState({ gmap: next, pos: 1206, stage: num });
  };

  Viewer.prototype.newWeapon = function newWeapon(wl, np) {
    var mapo = this.state.gmap;
    mapo[np].health = false;
    var stats = this.state.stats;
    wl++;
    stats.Weapon = this.state.possibleWeapons[wl];

    var newMessage = "You found a " + this.state.possibleWeapons[wl] + "!";
    this.setState({
      gmap: mapo,
      stats: stats,
      weaponLevel: wl,
      message3: this.state.message2,
      message2: this.state.message1,
      message1: newMessage
    });
  };

  Viewer.prototype.health = function health(np, cp) {
    var newMessage = undefined;
    var wl = this.state.weaponLevel;
    var pts = this.state.gmap[np].ammount;
    var newMap = this.state.gmap;
    var newStats = this.state.stats;
    var counter = this.state.itemCount;
    if (counter > 3 && wl === 1) {
      this.newWeapon(wl, np);
    } else if (counter > 6 && wl === 2) {
      this.newWeapon(wl, np);
    } else {
      newMessage = "You picked up some health!  HP +" + pts + "!";
      newMap[np].health = false;
      newMap[cp].player = false;
      newMap[np].player = true;
      newStats.HP = newStats.HP + pts;
      counter++;
      this.setState({
        itemCount: counter,
        stats: newStats,
        gmap: newMap,
        message3: this.state.message2,
        message2: this.state.message1,
        message1: newMessage,
        pos: np
      });
    }
  };

  Viewer.prototype.onKeyDown = function onKeyDown(e) {
    //  console.log(e);
    var press = e.key;

    var keyed = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -50,
      ArrowDown: 50
    };
    // console.log(keyed[press]);
    var currentPos = this.state.pos;
    var mapo = this.state.gmap;

    var nextPos = keyed[press] + currentPos;
    var attack = undefined,
        name = undefined,
        hp = undefined,
        stats = undefined,
        turn = undefined;
    turn = this.state.playerTurn;
    if (this.state.gmap[nextPos].portal) {
      this.nextMap(currentPos);
    } else if (this.state.gmap[nextPos].monster) {
      stats = this.state.stats;
      turn = this.state.playerTurn;
      name = this.state.gmap[nextPos].monName;
      hp = this.state.gmap[nextPos].monsterHp;
      attack = this.state.gmap[nextPos].attackRange;
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].boss) {
      this.fight(hp, name, attack, stats, turn, nextPos);
    } else if (this.state.gmap[nextPos].health) {
      this.health(nextPos, currentPos);
    } else if (!this.state.gmap[nextPos].wall) {
      mapo[nextPos].player = true;
      mapo[currentPos].player = false;
      this.setState({ gmap: mapo, pos: nextPos });
    }
  };

  Viewer.prototype.render = function render() {
    this.calcViz();
    var info = this.state.gmap;
    // console.log(info);

    return React.createElement(
      "div",
      null,
      React.createElement(MessagePane, {
        message1: this.state.message1,
        message2: this.state.message2,
        message3: this.state.message3
      }),
      React.createElement(
        "div",
        null,
        React.createElement(Winning, {
          but: this.playAgain,
          viz: this.state.winning,
          kills: this.state.killCount,
          reset: this.reload
        }),
        React.createElement(Death, {
          but: this.playAgain,
          viz: this.state.dead,
          kills: this.state.killCount,
          reset: this.reload
        }),
        React.createElement(Vp, { inf: this.state.gmap }),
        " "
      ),
      React.createElement(
        "div",
        { className: "right" },
        React.createElement(StatusPane, {
          level: this.state.stats.level,
          hp: this.state.stats.HP,
          xp: this.state.stats.XP,
          nlp: this.state.stats.NextLevel,
          weapon: this.state.stats.Weapon
        })
      ),
      React.createElement(
        "div",
        null,
        React.createElement(Up, { track: this.up }),
        " "
      ),
      React.createElement(
        "div",
        null,
        "  ",
        React.createElement(Left, { track: this.left }),
        "   ",
        React.createElement(Right, { track: this.right })
      ),
      React.createElement(
        "div",
        null,
        "  ",
        React.createElement(Down, { track: this.down })
      )
    );
  };

  return Viewer;
}(React.Component);

var Up = function (_React$Component2) {
  _inherits(Up, _React$Component2);

  function Up() {
    _classCallCheck(this, Up);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Up.prototype.render = function render() {
    return React.createElement(
      "button",
      { onClick: this.props.track },
      "▲"
    );
  };

  return Up;
}(React.Component);

var Down = function (_React$Component3) {
  _inherits(Down, _React$Component3);

  function Down() {
    _classCallCheck(this, Down);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Down.prototype.render = function render() {
    return React.createElement(
      "button",
      { onClick: this.props.track },
      "▼"
    );
  };

  return Down;
}(React.Component);

var Left = function (_React$Component4) {
  _inherits(Left, _React$Component4);

  function Left() {
    _classCallCheck(this, Left);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Left.prototype.render = function render() {
    return React.createElement(
      "button",
      { onClick: this.props.track },
      "◀ "
    );
  };

  return Left;
}(React.Component);

var Right = function (_React$Component5) {
  _inherits(Right, _React$Component5);

  function Right() {
    _classCallCheck(this, Right);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  Right.prototype.render = function render() {
    return React.createElement(
      "button",
      { onClick: this.props.track },
      " ▶"
    );
  };

  return Right;
}(React.Component);

var Vp = function (_React$Component6) {
  _inherits(Vp, _React$Component6);

  function Vp() {
    _classCallCheck(this, Vp);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  Vp.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "viz" },
      this.props.inf.map(function (data) {
        return React.createElement("span", {
          className: !data.seeable ? "blacked" : data.monster ? "monster" : data.health ? "item" : data.wall ? "wall" : data.player ? "player" : data.portal ? "portal" : data.boss ? "boss" : "floor",
          id: "tile",
          wall: data.wall,
          monster: data.monster,
          item: data.item,
          player: data.player
        });
      })
    );
  };

  return Vp;
}(React.Component);

var MessagePane = function (_React$Component7) {
  _inherits(MessagePane, _React$Component7);

  function MessagePane() {
    _classCallCheck(this, MessagePane);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  MessagePane.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "messages" },
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          { className: "old" },
          this.props.message1,
          " "
        ),
        React.createElement(
          "li",
          { className: "older" },
          this.props.message2,
          " "
        ),
        React.createElement(
          "li",
          { className: "oldest" },
          this.props.message3,
          " "
        )
      ),
      " "
    );
  };

  return MessagePane;
}(React.Component);

var Death = function (_React$Component8) {
  _inherits(Death, _React$Component8);

  function Death() {
    _classCallCheck(this, Death);

    return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
  }

  Death.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: this.props.viz },
      React.createElement(
        "div",
        { className: "modal-content" },
        React.createElement(
          "p",
          { className: "status" },
          "You have died... "
        ),
        React.createElement(
          "p",
          { className: "status" },
          " ",
          "During your quest you vanquished ",
          this.props.kills,
          " enemies before meeting a foe who vanquished you...",
          " "
        ),
        React.createElement(
          "button",
          { className: "status", onClick: this.props.but },
          "try again"
        )
      )
    );
  };

  return Death;
}(React.Component);

var Winning = function (_React$Component9) {
  _inherits(Winning, _React$Component9);

  function Winning() {
    _classCallCheck(this, Winning);

    return _possibleConstructorReturn(this, _React$Component9.apply(this, arguments));
  }

  Winning.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: this.props.viz },
      React.createElement(
        "div",
        { className: "modal-content" },
        React.createElement(
          "p",
          { className: "status" },
          "You have Won! "
        ),
        React.createElement(
          "p",
          { className: "status" },
          " ",
          "During your quest you vanquished ",
          this.props.kills,
          " enemies before meeting a boss who you also vanquished!",
          " "
        ),
        React.createElement(
          "button",
          { className: "status", onClick: this.props.but },
          "Replay Value?"
        )
      )
    );
  };

  return Winning;
}(React.Component);

var Key = function Key() {
  return React.createElement(
    "span",
    null,
    React.createElement(
      "span",
      { className: "player" },
      "You"
    ),
    " ",
    React.createElement(
      "span",
      { className: "monster" },
      "enemies"
    ),
    " ",
    React.createElement(
      "span",
      { className: "portal" },
      " portal"
    ),
    " ",
    React.createElement(
      "span",
      { className: "item" },
      "item"
    ),
    " ",
    React.createElement(
      "span",
      { className: "boss" },
      "boss"
    )
  );
};

var StatusPane = function (_React$Component10) {
  _inherits(StatusPane, _React$Component10);

  function StatusPane() {
    _classCallCheck(this, StatusPane);

    return _possibleConstructorReturn(this, _React$Component10.apply(this, arguments));
  }

  StatusPane.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "status" },
      React.createElement(
        "h5",
        null,
        "Level: ",
        this.props.level,
        " | HP: ",
        this.props.hp,
        " | XP: ",
        this.props.xp,
        " ",
        "| Next Level: ",
        this.props.nlp,
        " | Weapon: ",
        this.props.weapon
      ),
      React.createElement(
        "h4",
        null,
        " ",
        this.props.message
      )
    );
  };

  return StatusPane;
}(React.Component);

var App = function (_React$Component11) {
  _inherits(App, _React$Component11);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component11.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Key, null),
      React.createElement(Viewer, null)
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("App"));