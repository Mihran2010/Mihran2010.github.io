const board = document.getElementById("game-board");
const instrText = document.getElementById("instraction-text");
const logo = document.getElementById("logo");
const score=document.getElementById("score");
const highScoreText = document.getElementById("highScore");
let snake = [{ x: 10, y: 10 }];
let gridSize = 20;
let isGameStart = false;
let gameSpeed = 600;
let food = generateFood();
let wall = generateWall();
let direction = "right";
let gameIntervalId;
let highScore = 0;
let foodScore = 0;




let music = new Audio("./snake-hissing-6092.mp3");
let music2 = new Audio("eating-chips-81092.mp3");
let music3 = new Audio("./mixkit-arcade-retro-game-over-213.wav");

function draw() {
    board.innerHTML = "";
    drawSnake();
    drawFood();
    drawWall();
    gameScore();

    music.play();



}


function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
       

    });
}


function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    let foodElement = createElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    

}


function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };

}


  function drawWall(){

    let wallElement = createElement("div", "wall");
    setPosition(wallElement, wall);
    board.appendChild(wallElement);

  }


function generateWall() {

    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return{ x, y };

}

function move() {
    let head = { ...snake[0] };
    console.log(direction);
    switch (direction) {
        case "up":
            head.y--
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);
    
    

    if (head.x === food.x && head.y === food.y) {

        wall = generateWall();
        food = generateFood();
        
        
       clearInterval(gameIntervalId);
       gameIntervalId = setInterval(()=>{
            move()
            checkCollision(); 
            draw()
     
        },gameSpeed);

       gameSpeed =  gameSpeed -40;

        music2.play();

       

         if(gameSpeed <=80){
             
            gameSpeed = 80;

         }

         
    }



else{
    snake.pop();
}

}
document.addEventListener("keydown", handKeyPress );

function handKeyPress(event) {
    
if((!isGameStart && event.code === "Space")|| 
  (!isGameStart && event.key === "")){
      startGame();

}else{
    switch (event.key) {
        case "ArrowUp":
            direction = "up"
            break;
    
        case "ArrowDown":
          direction= "down";
          break;

          case "ArrowLeft":
          direction="left"
          break;

          case "ArrowRight":
            direction = "right"
        default:
            break;
    }

}

}

function startGame() {
    
    isGameStart = true;

    logo.style.display = 'none';
    instrText.style.display = 'none';



    
     gameIntervalId =  setInterval(()=>{
   
        move();
        checkCollision();
        draw();

    
},gameSpeed);
    
    




}


function checkCollision() {
    let head = { ...snake[0] };

   
    if (head.x > gridSize || head.x < 1 || head.y > gridSize || head.y < 1) {
        resetGame();
    }

   
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }

    
    if (head.x === wall.x && head.y === wall.y) {
        resetGame();
    }
}

function resetGame() {

    gameHighScore();
     stopGame();
    snake = [{x:10,y:10}];
    food = generateFood();
    wall = generateWall();
    direction = "right";
    gameSpeed = 600;
    gameScore();
}



function stopGame() {

    clearInterval(gameIntervalId);
    isGameStart= false;

    logo.style.display = "block";
    instrText.style.display="block";
    
    music3.play()
}


function gameScore() {
    
const currentScore = snake.length -1;
score.textContent = currentScore.toString().padStart(3,"0");


}


function gameHighScore(){

    let curentScore  = snake.length - 1;
    if(curentScore > highScore){
         highScore = curentScore;


    }

highScoreText.textContent=highScore.toString().padStart(3,"0");
highScoreText.style.display="block";

}
    

