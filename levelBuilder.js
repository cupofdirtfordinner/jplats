const canvas = document.getElementById("canvas")
const testspan = document.querySelectorAll(".testspan")

var floors = []
var pads = []

function place() {
  for (var i = 0; i < floors.length; i++) {
    var newdiv = document.createElement("div")
    var wallcollider = document.createElement("div")
    var ceilingcollider = document.createElement("div")

    newdiv.style.width = floors[i].width + "px"
    newdiv.style.height = floors[i].height + "px"
    newdiv.style.left = floors[i].x + "px"
    newdiv.style.top = floors[i].y + "px"
    canvas.appendChild(newdiv)
    newdiv.id = "floor"+i
    newdiv.classList.add("floor")
    var newdiv = document.createElement("div")
    var wallcollider = document.createElement("div")

    wallcollider.style.width = (floors[i].width + 12) + "px"
    wallcollider.style.height = (floors[i].height - 12) + "px"
    wallcollider.style.left = (floors[i].x - 6) + "px"
    wallcollider.style.top = (floors[i].y + 9) + "px"
    canvas.appendChild(wallcollider)
    wallcollider.id = "wall"+i
    wallcollider.classList.add("wall")

    ceilingcollider.style.width = (floors[i].width + 6) + "px"
    ceilingcollider.style.height = "4px"
    ceilingcollider.style.left = (floors[i].x - 4) + "px"
    ceilingcollider.style.top = ((floors[i].y + floors[i].height) + -2) + "px"
    canvas.appendChild(ceilingcollider)
    ceilingcollider.id = "ceiling"+i
    ceilingcollider.classList.add("ceiling")
  }

  for (var i = 0; i < pads.length; i++) {
    var newdiv = document.createElement("div")
    newdiv.style.width = "40px"
    newdiv.style.height = "10px"
    newdiv.style.left = floors[i].x + "px"
    newdiv.style.top = floors[i].y + "px"
    canvas.appendChild(newdiv)
    newdiv.id = "floor"+i
    newdiv.classList.add("floor")
  }
}
/*
for (let i = 0; i < document.querySelectorAll(".floor").length; i++) {
  testspan[0].textContent += document.querySelectorAll(".floor")[i].id
}
*/