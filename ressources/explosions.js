var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight

colors = [`rgba(255, 249, 254, 1)`,`rgba(255, 255, 228, 1)`,`#ffcd9b`,`rgba(206, 17, 0, 0.6)`,`#e05200`]
function random(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function getMousePos(evt) {
      mouse.x = evt.clientX,
      mouse.y = evt.clientY
  }

  document.addEventListener('mousemove',getMousePos,false)
  var mouse = {
      x: 0,
      y: 0
  }

  function arc(x,y,radius,color){
    c.beginPath()
    c.arc(x,y,radius,0,Math.PI*2)
    c.fillStyle = color
    c.fill()
  }
  
function Arc(x,y,radius,color,xVelocity = 0,yVelocity = 0){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xVelocity = xVelocity
    this.yVelocity = yVelocity
    this.velocity = 1
    this.opacity = 0.6
    this.colors = [`rgba(255, 249, 254, 1)`,`rgba(255, 255, 228, 1)`,`#ffcd9b`,`rgba(206, 17, 0, 0.6)`,`rgba(87, 0, 25, 0.6)`]
    this.color = color;
    this.cycle = 'grow'
}

Arc.prototype.update = function(){
    arc(this.x,this.y,this.radius,this.color)
    this.x += this.xVelocity
    this.y += this.yVelocity
}

function calculateVelocity(object,goal){
    let a =  object.x - goal.x 
    let b = object.y - goal.y  
    let c = Math.sqrt( Math.pow(a,2)+Math.pow(b,2)) 
    object.xVelocity = (a/c) * object.velocity
    object.yVelocity = (b/c) * object.velocity
}

var tempTarget = {
    x: 0,
    y: 0
}

  function explode(target){
    tempTarget.x = target.x;
    tempTarget.y = target.y;

    for(var i = 0; i<360; i+=10){
        radius = 50

        let x = tempTarget.x + Math.cos(i*(Math.PI/180)) * (radius* Math.random())
        let y = tempTarget.y + Math.sin(i*(Math.PI/180)) * (radius* Math.random())
        
        explosionInner.push(new Arc(x,y,0.5,colors[random(3,0)]))
    }
   
    for(var i = 0; i<360; i+=30){
        radius = 90

        let x = tempTarget.x + Math.cos(i*(Math.PI/180)) * (radius* Math.random())
        let y = tempTarget.y + Math.sin(i*(Math.PI/180)) * (radius*  Math.random())
 
        explosionOuter.push(new Arc(x,y,0,colors[random(5,3)]))
    }
   
  }

var explosionInner = []
var explosionOuter = []

// document.addEventListener('click', function(){
//     explode(mouse)
// })

// function animate(){
//         requestAnimationFrame(animate);
//         c.clearRect(0,0,window.innerWidth,window.innerHeight)


//         // arc(mouse.x,mouse.y,50,'rgba(255,255,255,0.4)')

       


//     explosionInner.forEach(function(i,index){
//         i.update()
//         if(i.cycle == 'grow'){
//             i.radius*=1.8   
//         }else if(i.radius > 10){
//             i.radius/= 1.5 
//         }else{
//             i.radius -=0.2
//         }
//         if(i.radius > 40){
//             i.cycle = 'shrink'
//         }
        
//         if(i.radius <= 0){
//             explosionInner.splice(index,1)
//         }
//     })
//     if(explosionInner && explosionInner[0].cycle ==  'shrink')
//         explosionOuter.forEach(function(i,index){
//             i.update()
//             i.radius+=1.8   
//             if(i.radius >= 20){
//                 explosionOuter.splice(index,1)
//             }
//         })

    


// }

// animate()