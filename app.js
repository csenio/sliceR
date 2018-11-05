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
      x: evt.clientX,
      y: evt.clientY
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
    speed:20,
    tail: [],
    skill: undefined
}

  var updownspeed = 1
  var leftrightspeed = 1
  document.addEventListener('click', function(){
      target.x = mouse.x;
      target.y = mouse.y;
      let a = Math.abs(player.x-target.x)
      let b = Math.abs(player.y-target.y)
      let c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2))
    leftrightspeed = (a/c) * player.speed
    updownspeed = (b/c) * player.speed
  })

  document.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    mouse.x= mousePos.x; 
    mouse.y= mousePos.y;
  }, false);


document.addEventListener('keydown',function(e){
    if(e.keyCode == '32'){
        player.skill = 'charge'
        console.log(player.skill)
    }
})
document.addEventListener('keyup',function(e){
    if(e.keyCode == '32'){
        player.skill = 'slice'
        console.log(player.skill)
    }
})


function slicer(){
    if(player.skill == 'charge'){
        c.save()
        c.lineWidth = 30
        c.shadowColor = 'white'
        c.shadowBlur = '20'
        c.strokeStyle = 'rgba(255,255,255,0.2)'
        c.beginPath()
        c.moveTo(mouse.x,mouse.y)
        c.lineTo(player.x,player.y)
        c.stroke()
        c.moveTo(player.x,player.y)
        c.strokeStyle = 'rgba(255,255,255,0.8)'
        c.lineWidth = 5
        c.lineTo(mouse.x, mouse.y)
        c.stroke()
        c.beginPath()
        c.fillStyle = 'white'
        c.arc(mouse.x,mouse.y,15,0,Math.PI*2)
        c.fill()
        c.restore()
    }
    if(player.skill == 'slice'){
        let aa = Math.abs(player.x-mouse.x)
        let bb = Math.abs(player.y-mouse.y)
        let cc = Math.sqrt(Math.pow(aa,2)+Math.pow(bb,2))
        xspeed = (aa/cc) * cc
        yspeed = (bb/cc) * cc

        if(player.x < mouse.x){
            // console.log(updownspeed)
            player.x += xspeed
        }
        if(player.x > mouse.x){
            // console.log(xspeed)
            player.x-= xspeed
        }
        if(player.y < mouse.y){    
            // console.log(leftrightspeed)
            player.y+= yspeed
        }
        if(player.y > mouse.y){
            // console.log(yspeed)
            player.y-= yspeed
        }
        player.skill = undefined
        target.x = mouse.x;
        target.y = mouse.y;
        player.tail = []
    }
}

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


// c.beginPath()
// c.moveTo(mouse.x,mouse.y)
// c.lineTo(player.x,player.y)
// c.stroke()

slicer()




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
c.restore()
c.fillStyle = "green"
c.fillRect(zombie.x,zombie.y,zombie.height,zombie.width)



if(zombie.x < player.x){
    zombie.x+= Math.abs(zombie.x-target.x) / Math.sqrt(Math.pow(Math.abs(zombie.x-target.x),2)+Math.pow(Math.abs(zombie.y-target.y),2)) * zombie.speed
}
if(zombie.x > player.x){
    zombie.x-= Math.abs(zombie.x-target.x) / Math.sqrt(Math.pow(Math.abs(zombie.x-target.x),2)+Math.pow(Math.abs(zombie.y-target.y),2)) * zombie.speed
}
if(zombie.y < player.y){
    zombie.y+= Math.abs(zombie.y-target.y) / Math.sqrt(Math.pow(Math.abs(zombie.x-target.x),2)+Math.pow(Math.abs(zombie.y-target.y),2)) * zombie.speed
}
if(zombie.y > player.y){
    zombie.y-= Math.abs(zombie.y-target.y) / Math.sqrt(Math.pow(Math.abs(zombie.x-target.x),2)+Math.pow(Math.abs(zombie.y-target.y),2)) * zombie.speed
}


let currentpos = {x:0,y:0}


if(player.x < target.x){
    // console.log(updownspeed)
    player.x += leftrightspeed
    currentpos.x = player.x
}
if(player.x > target.x){
    // console.log(leftrightspeed)
    player.x-= leftrightspeed
    currentpos.x = player.x
}
if(player.y < target.y){    
    // console.log(leftrightspeed)
    player.y+= updownspeed
    currentpos.y = player.y
}
if(player.y > target.y){
    // console.log(updownspeed)
    player.y-= updownspeed
    currentpos.y = player.y
}

tail(currentpos)

c.beginPath()
// c.moveTo(player.x,player.y)
c.strokeStyle = 'white'
c.fillStyle = 'rgba(255,255,255,0.2)'
var tailRadius = player.width
for(let i = player.tail.length -1; i>0; i--){
    if(tailRadius > 0){
        tailRadius -= 2
    }
    
    c.arc(player.tail[i].x,player.tail[i].y,tailRadius,0, Math.PI*2)
}
c.fill()
// c.beginPath()
// c.moveTo(mouse.x,mouse.y)
// c.lineTo(player.x,player.y)
// c.stroke()



}

animate()


function tail(obj){
    player.tail.push(obj)

    if(player.tail.length > 10){
        player.tail.shift()    
    }

}