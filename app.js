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

var player = {
    x: 500,
    y: 100,
    width: 40,
    height: 40,
    life: 9,
    speed: 8,
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



document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        // Move ('left');
    }
})




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
c.fillRect(player.x,player.y,player.height,player.width)

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


}

animate()