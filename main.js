function dist(a1, a2){
    return Math.sqrt((a1[0]-a2[0])*(a1[0]-a2[0]) + (a1[1]-a2[1])*(a1[1]-a2[1]));
}
var canvas = document.getElementById('myCanvas');

var parent = document.getElementsByClassName('intro')[0];
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;
console.log(canvas.width,canvas.height);
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'blue';
ctx.strokeRect(10,10,100,100);
let pts = [];
let vel = [];
let vel_mag = 2;
let N = 200;
for(let i=0;i<N;i++){
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    let vx = Math.random()*(2*vel_mag) - vel_mag;
    let vy = Math.random()*(2*vel_mag) - vel_mag;
    pts.push([x,y]);
    vel.push([vx,vy]);
}
let S = 'hello there!!!!!!!                  ';
let s = '';
let inc = true;
function render(){   
    ctx.strokeStyle = '#aaa'
    ctx.fillStyle = 'black'
    
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = 'white'
    ctx.font = '30px Courier New'
    
    if(inc){
        s = S.slice(0,s.length+1);
        if (s==S) inc = false;
        //console.log(s);
    }else{
        if (s.length<=1){
            inc = true;
        }
        s = s.slice(0, s.length-1);
        //console.log(s)
    }
    ctx.fillText(s, canvas.width/2 - 200, canvas.height/2)

    for(let i=0;i<N;i++){
        for(let j=i;j<N;j++){
            if (dist(pts[i],pts[j]) < 50 ){

                ctx.lineWidth = Math.random()*2;
                ctx.beginPath();
                ctx.moveTo(pts[i][0], pts[i][1]);
                ctx.lineTo(pts[j][0], pts[j][1]);
                ctx.stroke();
            }
        }
        pts[i][0] += vel[i][0];
        pts[i][1] += vel[i][1];
        if (pts[i][0]<0 || pts[i][0]>canvas.width){
            vel[i][0] = -vel[i][0];
        }
        if (pts[i][1]<0 || pts[i][1]>canvas.height){
            vel[i][1] = -vel[i][1];
        }
    }
    
    requestAnimationFrame(render);

}
render();