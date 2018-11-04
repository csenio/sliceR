var canvas = document.querySelector("canvas")
var c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  var mouse = {
      x: 0,
      y: 0
  }

  var target = {
      x: 0,
      y:0
  }

  var player = {
    x: 500,
    y: 100,
    width: 40,
    height: 40,
    life: 9,
    speed: 8,
}

  var updownspeed = 1
  var leftrightspeed = 1
  document.addEventListener('click', function(){
      target.x = mouse.x;
      target.y = mouse.y;
      updownspeed = Math.sqrt(Math.pow(player.x-target.x,2))/Math.sqrt(Math.pow(player.y-target.y,2)) * 150
      leftrightspeed = 150
    //   updownspeed = Math.sqrt(Math.pow(player.x-target.x,2))
    //   leftrightspeed = Math.sqrt(Math.pow(player.y-target.y,2))
  })

  document.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    mouse.x= mousePos.x; 
    mouse.y= mousePos.y;
  }, false);

  var jumpdistance = 400

//   document.addEventListener('click', function(){
//       player.x += (mouse.x - player.x)*50/ Math.sqrt( Math.pow((mouse.x - player.x), 2) + Math.pow((mouse.y - player.y), 2)) 
//       player.y += (mouse.y - player.y)*50/ Math.sqrt( Math.pow((mouse.y - player.y), 2) + Math.pow((mouse.x - player.x), 2)) 
//       if(player.x > canvas.width-player.width){ player.x=canvas.width-player.width }
//       if(player.x < 0){ player.x=0 }
//       if(player.y > canvas.height-player.height){ player.y=canvas.height-player.height }
//       if(player.y < 0){ player.y=0 }
//   })



var zombie = {
    x: 200,
    y: 300,
    width: 40,
    height: 40,
    speed: 2
}


function animate(){
requestAnimationFrame(animate);
c.clearRect(0,0,window.innerWidth,window.innerHeight)

// console.log(mouse)
// document.addEventListener('keydown', function(event) {
//     if(event.keyCode == 37) {
//         // Move ('left');
//     }
// })

c.beginPath()
c.moveTo(mouse.x,mouse.y)
c.lineTo(player.x,player.y)
c.stroke()








if(keyState[37] || keyState[65]) {
    // console.log('left')
    if(player.x>0) player.x-=player.speed

}
if(keyState[39] || keyState[68]) {
    // console.log('right')
    if(player.x<canvas.width-player.width) player.x+=player.speed
}
if(keyState[38] || keyState[87]) {
    // console.log('up')
    if(player.y > 0) player.y-=player.speed
}
if(keyState[40] || keyState[83]) {
    // console.log('down')
    if(player.y < canvas.height - player.height) player.y+=player.speed
}

c.fillStyle = "black"
// console.log(player.x, player.y)
// c.strokeRect(player.x,player.y,player.height,player.width)
c.save()
c.shadowColor = "#E3EAEF"
c.shadowBlur = "20"
c.beginPath()
c.arc(player.x,player.y,player.width,0,2*Math.PI)
c.strokeStyle = "white";
c.fillStyle = "white"
c.stroke()
c.fill()
c.fillStyle = "green"
// c.fillRect(zombie.x,zombie.y,zombie.height,zombie.width)


if(zombie.x < player.x){
    zombie.x+= zombie.speed
}
if(zombie.x > player.x){
    zombie.x-= zombie.speed
}
if(zombie.y < player.y){
    zombie.y+= zombie.speed
}
if(zombie.y > player.y){
    zombie.y-= zombie.speed
}



if(player.x < target.x){
    console.log(updownspeed/20)
    player.x += updownspeed/20
}
if(player.x > target.x){
    console.log(updownspeed/20)
    player.x-= updownspeed/20
}
if(player.y < target.y){
    console.log(leftrightspeed/20)
    player.y+= leftrightspeed/20
}
if(player.y > target.y){
    console.log(leftrightspeed/20)
    player.y-= leftrightspeed/20
}

}

animate()