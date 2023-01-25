//game constants and veriable
let inputDir={x:0,y:0};
const foodSound=new Audio('music/food.mp3');
const gameOverSound=new Audio('music/gameover.mp3');
const moveSound=new Audio('music/move.mp3');
//const musicSound=new Audio('music/music.mp3');
const scoreElement=document.getElementById("score");
let speed=5;
let lastPaintTime=0;
let snakeArr=[{x:12,y:10},{x:12,y:9}];
const board=document.getElementById("board");
let food={x:10, y : 5};
let score=0;
let hs=document.getElementById("high-score");
let playerName="default";
let hiScore=0;
let playerData={
    score:hiScore,
    Name:playerName
}
let direction={
    up:true,
    down:true,
    left:true,
    right:true
}
if(localStorage.getItem("highscore")==null){
    localStorage.setItem("highscore",JSON.stringify(playerData));
}
playerData=JSON.parse(localStorage.getItem("highscore"));
hiScore=playerData.score;


//game functions
function main(ctime){
    window.requestAnimationFrame(main);  //It become game loop main function call again and agin by this method
                                    //we can also use set animation method set interval and set timeout
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return ;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}
function isCollide(snake){
    // if snake bumb into itself
    if(snake[0].x===25 || snake[0].y===18 || snake[0].x===0 || snake[0].y===0)
        return true;
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    return false;
}
function gameEngine(){
    //part1: updating the snake and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        //musicSound.pause();
        inputDir={x:0,y:0};
        //seting high score
        if(hiScore<score){
            hiScore=score;
            playerData.Name=prompt("Enter game master");
            playerData.score=hiScore;
            localStorage.setItem("highscore",JSON.stringify(playerData));
        }
        alert("Game Over!!!! Press any key to restart");
        snakeArr=[{x:13,y:12}];
        //musicSound.play();
        score=0;
    }
    
    hs.innerHTML="HIGH SCORE <BR>"+ playerData.score + "<br> "+playerData.Name;
    //if snake has eaten the food then increse the score and regenerate the food
    //when snake will eat the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score+=1;
        scoreElement.innerHTML="Score  <br>"+ score;
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a) * Math.random()),y: Math.round(a+(b-a ) * Math.random())};

    }

    //moving the snake 
     
    for (let i = snakeArr.length-2; i >= 0; i--){
        snakeArr[i+1]={...snakeArr[i]};   // understand deconstruction 
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    
   
   //snakeArr[snakeArr.lenght-1].y+=inputDir.y;
   //part2 : Display the snake and food
    //Display the snake
        board.innerHTML="";
    snakeArr.forEach((e,index)=>{//for each understand call backs?
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        //snakeElement.classList.add('snake');
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    //for each understand call backs?
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    
    //part2:Render the snake and food


//main();

}

//game main logic


window.addEventListener('keydown', e => {

     inputDir={x:0,y:1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            if(direction.up===true){
                direction.left=true;
                direction.right=true;
                inputDir.x=0;
                inputDir.y=-1;
                direction.down=false;
                console.log("ArrowUp up = "+ direction.up + " down = "+ direction.down + " left = "+ direction.left + " right = "+ direction.right);
                
            }
            break;
        case "ArrowDown":
            if(direction.down===true){

                direction.left=true;
                direction.right=true;
                inputDir.x=0;
                inputDir.y=1;
                direction.up=false;
                console.log("ArrowDown up = "+ direction.up + " down = "+ direction.down + "  left = "+ direction.left + "  right = "+ direction.right);
            }
            break;
        case "ArrowLeft":
            if(direction.left===true){
                direction.up=true;
                direction.down=true;
                inputDir.x=-1;
                inputDir.y=0;
                direction.right=false;
                
                console.log("ArrowLeft up = "+ direction.up + " down = "+ direction.down + "  left = "+ direction.left + "  right = "+ direction.right);
            }
            break;
        case "ArrowRight":
            if(direction.right===true){
                direction.up=true;
                direction.down=true;
                inputDir.x=1;
                inputDir.y=0;
                direction.left=false;
                console.log("ArrowUp right = "+ direction.up + " down = "+ direction.down + "  left = "+ direction.left + "  right = "+ direction.right);
                
            }
            break;
        Default: break;
            
        }
    })
    window.requestAnimationFrame(main);
    