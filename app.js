var canvas = document.querySelector("canvas")
var c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var cooldown = 0

setInterval(function(){
    if(cooldown>0){
        cooldown -= 1
    }
   
},3)

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
    skill: undefined,
    isInvulnerable: false,
    score: 0,
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
    3
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

var zombieIsSliced = false
document.addEventListener('keydown',function(e){
    if(e.keyCode == '32' && cooldown == 0){
        player.skill = 'charge'
    }
    zombieIsSliced = true
})
document.addEventListener('keyup',function(e){
    if(e.keyCode == '32' && cooldown == 0){
        player.skill = 'slice'
    }
})

var slicePath = {
    start:{x: undefined, y:undefined},
    end:{x: undefined, y:undefined},
    opacity: 1,
    shadowBlur: 20
}

var hitbox = []

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
        cooldown += 1000
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
        
        if(player.x > mouse.x){
            xspeed *=-1
        }
        if(player.y > mouse.y){
            yspeed *= -1
        }

        if(slicePath.start.x !== slicePath.end.x && slicePath.start.y !== slicePath.end.y){
            player.x += xspeed
            player.y += yspeed
        }
      

        slicePath.opacity = 1
        player.skill = undefined
        target.x = mouse.x;
        target.y = mouse.y;
        player.tail = []

        
        for(i of zombies){
            // i.burst(xspeed/100, yspeed/100)
            i.xlinespeed = (xspeed/cc)*i.radius
            i.ylinespeed = (yspeed/cc)*i.radius
        }

        for(i= 0;i<cc; i+=10){
            let tempX = slicePath.start.x +(xspeed/cc)*i
            let tempY = slicePath.start.y + (yspeed/cc)*i

        zombies.forEach( function(j,index){
            var state = false


            if( Math.sqrt( Math.pow(j.x-tempX,2)+Math.pow(j.y-tempY,2) ) - (40 + j.radius)  <= 0){
                state = true
                explode(j)
                player.score ++
                cooldown -= 100
            }


            if(state == true){
                zombies.splice(index,1)
            }

        })

        }
        hitbox = []
    }
}



function HitboxArc(x,y){
    this.x = x;
    this.y = y;
    this.radius = 40;
}


function afterImage(){
    slicePath.opacity-=0.1

    //visible path
    c.save()
    c.lineWidth = 30
    c.shadowColor = '#4cc3ff'
    c.shadowBlur = 40
    c.lineWidth = 8
    c.strokeStyle = `rgba(255,255,255,${slicePath.opacity})`
    c.beginPath()
    c.moveTo(slicePath.end.x,slicePath.end.y)
    c.lineTo(slicePath.start.x,slicePath.start.y)
    c.stroke()
    c.restore()
}

function Zombie(){
    this.x = Math.floor(Math.random() * (window.innerWidth - 0 + 1)) + 0;
    this.y = Math.floor(Math.random() * (window.innerHeight - 0 + 1)) + 0;
    this.width = 40;
    this.height = 40;
    this.radius = 40;
    this.speed = Math.random()+1.5;
    this.color = 'red';
    this.opacity = 1;
    this.xlinespeed; 
    this.ylinespeed;
}

Zombie.prototype.draw = function(){
    c.beginPath()
    c.arc(this.x,this.y,this.radius,0,Math.PI*2)
    c.fillStyle = this.color;
    c.fill()
    // c.strokeStyle = `rgb(255,255,255)`
    c.stroke()
    c.closePath()
}


var zombies = []
var particles = []




Zombie.prototype.burst = function(xVelocity,yVelocity){
        this.radius -= 40
        for(let i = 0;i<200; i++){
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            // var int = Math.random() * (40 - 30) + 30 * plusOrMinus

            particles.push(new Particle(this.x , this.y, xVelocity + Math.random()-0.5 * 5 ,yVelocity + Math.random()-0.5 * 5 ))
        }

}


var intervalID = window.setInterval(zombieSpawner, 2000);

function zombieSpawner() {
        var zombie = new Zombie()
        zombies.push(zombie)
}



// ANIMATION START
function animate(){

    if(player.life > 0){
        requestAnimationFrame(animate);
}else{
    c.fillStyle = 'red'
    // c.fillRect(0,0,window.innerWidth, window.innerHeight)
    c.font = "80px Arial";
    c.fillText(`You lost! \n your score is: ${player.score}`,100,500);
}

c.clearRect(0,0,window.innerWidth,window.innerHeight)

c.font = "30px Arial";
c.fillText(`score: ${player.score}`,10,50);

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

if(cooldown > 0){
    c.fillStyle = "#8cfffd"
    c.beginPath()
    c.arc(player.x,player.y, cooldown * player.width/1000 ,0,2*Math.PI)
    c.fill()
}
c.restore()

c.fillStyle = "red"
zombies.forEach(function(i,index){
    i.draw()
    moveTo(i,player,i.speed)
    if(   Math.sqrt(Math.pow((i.x-player.x),2)+Math.pow((i.y-player.y),2)) - (player.width+i.width) <0 && player.isInvulnerable == false ){

        console.log('ouch')
        player.life --
        // alert('you lost')

        // setTimeout(function(){
        //     player.isInvulnerable == false
        // },1000)
    }
})


let currentpos = {x:undefined,y:undefined}



moveTo(player,target,player.speed)
currentpos.y = player.y
currentpos.x = player.x


if(explosionInner.length !==0){
    explosionInner.forEach(function(i,index){
        i.update()
        if(i.cycle == 'grow'){
            i.radius*=1.8   
        }else if(i.radius > 10){
            i.radius/= 1.5 
        }else{
            i.radius -=0.2
        }
        if(i.radius > 40){
            i.cycle = 'shrink'
        }
        
        if(i.radius <= 0){
            explosionInner.splice(index,1)
        }
    })
}
if(explosionInner.length !== 0 && explosionInner[0].cycle ==  'shrink')
    explosionOuter.forEach(function(i,index){
        i.update()
        i.radius+=1.8   
        if(i.radius >= 20){
            explosionOuter.splice(index,1)
        }
    })


tail(currentpos)

c.beginPath()
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
}


    animate()




function tail(obj){
    player.tail.push(obj)

    if(player.tail.length > 10){
        player.tail.shift()    
    }

}