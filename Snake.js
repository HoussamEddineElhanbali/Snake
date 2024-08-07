"use strict"

//defining html elements Variable
const gameBoard = document.querySelector(".gameBoard");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highScore");

//defining game variables
let snake = [{x : 10, y : 10},{x : 11, y : 10}];
let food = {};
let direction = "down";
let lastDirection = direction;
let scoreValue = 0;
let highScoreValue = 0;

//game logic
function draw(tag,position)
{
    let box = document.createElement("div");
    box.className = tag;
    box.style.gridColumn = position.x;
    box.style.gridRow = position.y;
    gameBoard.appendChild(box);
}

function drawSnake()
{
    snake.forEach(element => {draw("snake",element)});
}

function drawFood()
{
    if(Object.keys(food).length === 0)
    {
        generateFoodRandomNumber();
        while(checkSnakeParts(food))
        {
            generateFoodRandomNumber();
        }
        draw("food",food);
    }
}

function generateFoodRandomNumber()
{
    let x = Math.floor((Math.random() * 20) +1);
    let y = Math.floor((Math.random() * 20) +1);
    food = {x,y};
}

function clearBoard()
{
    let snakeToRemove = document.querySelectorAll(".snake");
    let foodToRemove = document.querySelector(".food");

    if(snakeToRemove != null)
    {
        snakeToRemove.forEach(element => {element.parentNode.removeChild(element)});
    }

    if(foodToRemove != null && Object.keys(food).length === 0)
    {
        foodToRemove.parentNode.removeChild(foodToRemove);
    }
}

function detectInput(event)
{
        lastDirection = direction;

        switch (event.key) 
        {
            case "z":
                direction = "up";
                break;
            case "q":
                direction = "left";
                break;
            case "s":
                direction = "down";
                break;
            case "d":
                direction = "right";
                break;
        }
}

function move()
{
    let snakeHead = {x : snake[0].x, y : snake[0].y};

    if(direction === "right" && lastDirection === "left" ||
       direction === "left" && lastDirection === "right" ||
       direction === "up" && lastDirection === "down" ||
       direction === "down" && lastDirection === "up")
    {
        direction = lastDirection;
    }

    switch (direction)
    {
        case "right":
                snakeHead.x++;
            break;
        case "left":
                snakeHead.x--;
            break;
        case "up":
                snakeHead.y--;
            break;
        case "down":
                snakeHead.y++;
            break;
    }

    if(checkSnakeParts(snakeHead))
    {
        snake = [{x : 10, y : 10},{x : 11, y : 10}];
        updateHighScore();
        updateScore(false);
    }
    else
    {
        snake.unshift(snakeHead);
        snake.pop();
    }
}

function checkWalls()
{
    snake.forEach
    (
        function(element)
        {
            if(element.x > 20 || element.x < 1 || element.y > 20 || element.y < 1)
            {
                snake = [{x : 10, y : 10},{x : 11, y : 10}];
                updateHighScore();
                updateScore(false);
            }
        }
    )
}

function checkFood()
{
    if(Object.keys(food).length !== 0)
    {
        if(snake[0].x === food.x && snake[0].y === food.y)
        {
            food = {};
            let snakeTail = {x : snake[snake.length -1].x, y : snake[snake.length -1].y};
            snake.push(snakeTail);
            updateScore(true);
        }
    }
}

function checkSnakeParts(foodOrSnakeHead)
{
    for(let i = 0; i < snake.length; i++)
    {
        if(snake[i].x === foodOrSnakeHead.x && snake[i].y === foodOrSnakeHead.y)
        {
            return true;
        }
    } 
    return false;
}

function updateScore(isAdding)
{
    if(isAdding)
    {
        scoreValue += 10;
    }
    else
    {
        scoreValue = 0;
    }
    score.innerHTML = "SCORE : " + scoreValue;
}

function updateHighScore()
{
    if(scoreValue > highScoreValue)
    {
        highScoreValue = scoreValue;
    }
    highScore.innerHTML = "HIGHSCORE : " + highScoreValue;
}

document.addEventListener("keydown",detectInput);

function gameLoop()
{
    checkFood();
    clearBoard();
    drawFood();
    move();
    checkWalls();
    drawSnake();
}

setInterval(gameLoop,200);