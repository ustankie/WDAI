
function createZombie(idx,duration){
    const field=document.getElementById("field");
    const move=document.createElement("div");
    const zombie=document.createElement("div");
    const points=document.getElementById("points").innerHTML;

    move.className="move";
    zombie.id=idx;
    zombie.className="zombies";

    if(parseInt(points)>0){
        zombie.onclick=function(){
            if(zombie.style.display!="none"){
                setPoints(13);
                move.style.animationPlayState='paused';
                zombie.style.display="none";
            }
        };
    }

    
    move.onanimationend=(event)=>{
        zombie.style.display='none';
        console.log("Animation ended");
        heartLoss();
        event.preventDefault();
    };

    var y=Math.random()*(document.documentElement.clientHeight-400)-100;
    y=Math.round(y);

    var size=Math.random()*0.7+0.4;
    console.log(zombie.id);
    

    move.style.top=y+'px';
    move.style.setProperty("-webkit-animation-duration",duration+"s");

    zombie.style.transform="scale("+size+")";



    move.appendChild(zombie);
    field.appendChild(move);

    
}

function setPoints(add){
    const points=document.getElementById("points");
    const points_val=points.innerHTML;
    var new_points=Math.max(0,parseInt(points_val)+parseInt(add));



    var n=5-new_points.toString().length;

    

    var zeros='';

    for(var i=0;i<n;i++){
        zeros=zeros+'0';
    }
    if(new_points<=0){
        document.getElementById("body_").onclick=function() { };
        const elements=document.getElementsByClassName("zombies");
        Array.from(elements).forEach(function (element) {
            element.onclick=function() { };
        });  
    }

    points.innerHTML=zeros+new_points;

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function run(){
    var id=0;
    const fullHeart="file:///home/urszula/html/WDAI/game/resources/full_heart.png";

    while(document.getElementById("heart1").src==fullHeart){
        var time=Math.random()*(2500-Math.min(id*80,1500))+100;
        var duration=Math.random()*10+5;
        createZombie(id,duration);
    

        await sleep(time);
        

        id+=1;
        

        
    }
    return true;

}


document.getElementById("body_").onclick=function(){
    const points=parseInt(document.getElementById("points").innerHTML); 
    setPoints(-3);
    const points1=parseInt(document.getElementById("points").innerHTML); 
    console.log(points1);
    if(points1<=0){
        const shoot=document.getElementById("shoot");

        shoot.style.visibility="visible";

        console.log(shoot.innerHTML);

    }
}

function heartLoss(){
    const heart1=document.getElementById("heart1");
    const heart2=document.getElementById("heart2");
    const heart3=document.getElementById("heart3");

    const fullHeart="file:///home/urszula/html/WDAI/game/resources/full_heart.png";

    if(heart3.src==fullHeart){
        heart3.src="file:///home/urszula/html/WDAI/game/resources/empty_heart.png";
        return;
    }

    if(heart2.src==fullHeart){
        heart2.src="file:///home/urszula/html/WDAI/game/resources/empty_heart.png";
        return;
    }

    if(heart1.src==fullHeart){
        heart1.src="file:///home/urszula/html/WDAI/game/resources/empty_heart.png";
        const score_div=document.getElementById("score");
        const points=parseInt(document.getElementById("points").innerHTML);
        const score=document.getElementById("score_num");
        score.innerHTML='';
        score.innerHTML=points;

        const shoot=document.getElementById("shoot");

        shoot.style.visibility="hidden";

        document.getElementById("body_").onclick=function() { };
        const elements=document.getElementsByClassName("zombies");
        Array.from(elements).forEach(function (element) {
            element.onclick=function() { };
        });
        const score_box=document.getElementById("game_over");
        score_box.style.display="flex";
        return;
    }

}

run();