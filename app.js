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
//protagonist
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

function moveTo(item,target,speed){
    if(item.x < target.x){
        item.x+= Math.abs(item.x-target.x) / Math.sqrt(Math.pow(Math.abs(item.x-target.x),2)+Math.pow(Math.abs(item.y-target.y),2)) * speed
    }
    if(item.x > target.x){
        item.x-= Math.abs(item.x-target.x) / Math.sqrt(Math.pow(Math.abs(item.x-target.x),2)+Math.pow(Math.abs(item.y-target.y),2)) * speed
    }
    if(item.y < target.y){
        item.y+= Math.abs(item.y-target.y) / Math.sqrt(Math.pow(Math.abs(item.x-target.x),2)+Math.pow(Math.abs(item.y-target.y),2)) * speed
    }
    if(item.y > target.y){
        item.y-= Math.abs(item.y-target.y) / Math.sqrt(Math.pow(Math.abs(item.x-target.x),2)+Math.pow(Math.abs(item.y-target.y),2)) * speed
    }
}
  var updownspeed = 1
  var leftrightspeed = 1
  var mousedown = false
  document.addEventListener('mousedown', function(){
      target.x = mouse.x;
      target.y = mouse.y;
      let a = Math.abs(player.x-target.x)
      let b = Math.abs(player.y-target.y)
      let c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2))
    leftrightspeed = (a/c) * player.speed
    updownspeed = (b/c) * player.speed
    mousedown = true
  })
  document.addEventListener('mouseup', function(){
    mousedown = false
  })
  document.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    mouse.x= mousePos.x; 
    mouse.y= mousePos.y;

    if(mousedown == true){
        target.x = mouse.x;
        target.y = mouse.y;
    }
   

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

var slicePath = {
    start:{x: undefined, y:undefined},
    end:{x: undefined, y:undefined},
    opacity: 1,
    shadowBlur: 20
}

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

        slicePath.start.x = player.x
        slicePath.start.y = player.y
        slicePath.end.x = mouse.x
        slicePath.end.y = mouse.y
        // console.log(slicePath)

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
        
        slicePath.opacity = 1
        player.skill = undefined
        target.x = mouse.x;
        target.y = mouse.y;
        player.tail = []
    }
}


function afterImage(){
    slicePath.opacity-=0.1
    //hitbox
    
    //visible path
    c.save()
    c.lineWidth = 30
    c.shadowColor = '#4cc3ff'
    c.shadowBlur = 40
    c.strokeStyle = `rgba(255,255,255,${slicePath.opacity-0.5})`
    c.lineWidth = 8
    c.strokeStyle = `rgba(255,255,255,${slicePath.opacity})`
    c.beginPath()
    c.moveTo(slicePath.end.x,slicePath.end.y)
    c.lineTo(slicePath.start.x,slicePath.start.y)
    c.stroke()
    c.restore()
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



slicer()
afterImage()

c.fillStyle = "black"


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


c.fillStyle = "red"
c.fillRect(zombie.x,zombie.y,zombie.height,zombie.width)
moveTo(zombie,player,zombie.speed)


let currentpos = {x:undefined,y:undefined}



moveTo(player,target,player.speed)
currentpos.y = player.y
currentpos.x = player.x



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