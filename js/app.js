// 参考https://discussions.youdaxue.com/t/topic/43326思路实现游戏 游戏暂停功能
let gamePause = false;

// 游戏通用参数
let _img = 'images/char-boy.png';
const vWidth = 101;
const vHeight = 83;
let count = 1;

// 这是玩家要躲避的敌人
class Enemy {
  constructor(y, speed) { // 构造函数
    // 要应用到每个敌人的实例的变量写在这里
    this.speed = speed;
    // this.speedcrise = 1 + 0.01 * (count - 1);
    this.x = -vWidth;
    this.y = 51 + vHeight * y;
    // 敌人的图片，用一个工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
  }
  // 此为游戏必须的函数，用来更新敌人的位置
  // 参数: dt ，表示时间间隙
  update(dt) {
    // 每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
    this.x = this.speed * dt * 100 * (1 + 0.01 * (count - 1)) + this.x;
    if (this.y == player.y) {
      if (this.x >= player.x - 40 && this.x <= player.x + 40) {
        player.reset();
      }
    }
  }
  // 此为游戏必须的函数，用来在屏幕上画出敌人
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// 玩家类
class Player {
  constructor(y, speed) { // 构造函数
    this.x = 202;
    this.y = 383;
    this.sprite = _img;
  }
  // 此为游戏必须的函数，用来在屏幕上画出玩家
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update(dt) {
    this.sprite = _img;
  }

  // 此函数为玩家的重置，用来在游戏成功或者失败后重置位置
  reset() {
    console.info(this.y)
    if (this.y < 60) {
      count += 1;
      document.querySelector('.count').innerHTML = count;
    }
    return this.x = 202, this.y = 383;
  }
  // 此函数为玩家控制函数，用来判断按下键盘后的控制方向
  handleInput(val) {
    if (val == "left") {
      this.x = (this.x < 102) ? 0 : (this.x - vWidth);
    }
    if (val == "right") {
      this.x = (this.x > 303) ? 404 : (this.x + vWidth);
    }
    if (val == "up") {
      this.y = (this.y < 100) ? this.reset() : (this.y - vHeight);
    }
    if (val == "down") {
      this.y = (this.y > 290) ? 383 : (this.y + vHeight);
    }
    if (val == 'change') {
      let _div = document.querySelector('.dialog').classList;
      if (_div.value.indexOf("active") != -1) {
        _div.remove("active");
      } else {
        _div.add("active");
        gamePause = true;
        let _divImg = document.getElementsByClassName('dialog-box');
        _divImg[0].onclick = function(e) {
          let _src = '';
          if (e.path[0].getAttribute("src")) {
            _src = e.path[0].getAttribute("src")
          } else {
            _src = e.path[0].firstChild.getAttribute("src")
          }
          _img = _src
          _div.remove("active");
          gamePause = false;
        }
      }
    }
  }

}

// 实例化所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [];
setInterval(function() {
  var enemy = new Enemy(Math.floor(Math.random() * 4), Math.floor(Math.random() * 4 + 1));
  allEnemies.push(enemy);
  if (allEnemies.length > 10) {
    allEnemies.splice(0, 1)
  }
}, 800)
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()方法里面。
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    82: 'change'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// 判断数组b是否存在于数组a中，不存在则将数组b添加到数组a
function checkArray(a, b) {
  if (JSON.stringify(a).indexOf(JSON.stringify(b)) === -1) {
    a.push(b)
  } else {
    return false;
  }
}

//
