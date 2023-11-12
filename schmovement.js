const player = document.getElementById("pligsplattin")
const scroll = document.getElementById("pligsplattincamera")

const floordivs = document.querySelectorAll('.floor')
const walldivs = document.querySelectorAll('.wall')
const ceilingdivs = document.querySelectorAll('.ceiling')
var yvel = 0
var xvel = 0
var finalxvel = xvel + dashamt
var pushback = 0
var speed = .02
var jumpheight = 0
var playerpos = {x:0, y:0}
var t=setInterval(upd,1);

var direction = 1
var keysmashprevention = true
const dashdef = 10
var dashamt = 0

var lastplayerpos
var allowgravity = false
var gravitymomentum = .02
var gravitydefinition = .02

var pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }

//prevent scroll via spacebar
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

function upd() {
  finalxvel = xvel + dashamt
  
  scroll.scrollIntoView(true);
  
  //dashing
  dashamt /= 1.08
  if (Math.abs(dashamt) < 0.2) { dashamt = 0 }
  if (Math.abs(pushback) < 0.05) { pushback = 0 }
  
  lastplayerpos = playerpos
  player.style.left = playerpos.x +"px"
  player.style.top = playerpos.y +"px"
  //gravity
  for (var counter = 0; counter < floordivs.length; counter++) {
    if ( !isCollide(counter) ) {
      allowgravity = true
    } else {
      gravitymomentum = -.09
      jumpheight = 0
    }
  }
  
  if (allowgravity === true) {
    gravitymomentum += gravitydefinition
  } else {
  }
  
  //controls
  if (pressedKeys[65]) {
    xvel -= speed
    direction = -1
  }
  
  if (pressedKeys[68]) {
    xvel += speed
    direction = 1
  }
  
  if (pressedKeys[32]) {
    jumpheight = 2.2
  }
  
  if (pressedKeys[16]) {
    if (keysmashprevention) {
      dashamt = dashdef * direction
      keysmashprevention = false
    }
  } else {keysmashprevention = true}
  
  if (pressedKeys[83]) {
    document.getElementById('pligsplattin').style.height = "20px"
    gravitymomentum *= 1.008
  } else {
    document.getElementById('pligsplattin').style.height = "40px"
  }
  
  xvel *= 0.988
  pushback *= 0.9
  playerpos.x += (finalxvel + pushback)
  playerpos.y += (gravitymomentum + yvel) - jumpheight
  
}

function isCollide(counter) {
    var playerRect = player.getBoundingClientRect();
    var floorRect = floordivs[counter].getBoundingClientRect();
    var wallRect = walldivs[counter].getBoundingClientRect();
    var ceilingRect = ceilingdivs[counter].getBoundingClientRect();
    
    const playerbottom = playerRect.top + playerRect.height
    const playerright = playerRect.left + playerRect.width

    const floorbottom = floorRect.top + floorRect.height
    const floorright = floorRect.left + floorRect.width

    const wallbottom = wallRect.top + wallRect.height
    const wallright = wallRect.left + wallRect.width

    const ceilingbottom = ceilingRect.top + ceilingRect.height
    const ceilingright = ceilingRect.left + ceilingRect.width

    if (
      !(
        (playerbottom < wallRect.top) ||
        (playerRect.top > wallbottom) ||
        (playerright < wallRect.left) ||
        (playerRect.left > wallright)
      )
    ) {
      pushback = Math.sign(finalxvel + (direction * .01)) * -2
      xvel = finalxvel*-1

      if (pressedKeys[32]) {
      gravitymomentum = -0.01
      }
      //make it so you cant hold a direction for a little bit
    }

    if (
      !(
        (playerbottom < ceilingRect.top) ||
        (playerRect.top > ceilingbottom) ||
        (playerright < ceilingRect.left) ||
        (playerRect.left > ceilingright)
      )
    ) {
      gravitymomentum = 3
    }
    
    return !(
        (playerbottom < floorRect.top) ||
        (playerRect.top > floorbottom) ||
        (playerright < floorRect.left) ||
        (playerRect.left > floorright)
    );
}