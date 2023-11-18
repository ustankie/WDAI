
function createZombie(){
    const field=document.getElementById("field");
    const move=document.createElement("div");
    const zombie=document.createElement("div");

    move.className="move";
    zombie.id="zombie1";
    zombie.className="zombies";

    var y=Math.random()*(document.documentElement.clientHeight-400)+100;
    y=Math.round(y);

    var size=Math.random()*0.7+0.4;

    move.style.top=y+'px';

    zombie.style.transform="scale("+size+")";



    move.appendChild(zombie);
    field.appendChild(move);
}

function setPoints(add){
    const points=document.getElementById("points");
    const points_val=points.innerHTML;
    var new_points=parseInt(points_val)+parseInt(add);

    var n=4-new_points.toString.length;

    

    var zeros='';

    for(var i=0;i<n;i++){
        zeros=zeros+'0';
    }

    points.innerHTML=zeros+new_points;










}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
setPoints(20);
createZombie();
sleep(20000).then(() =>{
    const zombie=document.getElementById("zombie1");
zombie.style.visibility='hidden';
});




