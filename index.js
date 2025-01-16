"use strict"

const gameBoard = document.querySelector(".gameBoard");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highScore");

let snake = [{x : 10, y : 10},{x : 11, y : 10}];
let food = {};
let direction = "down";
let lastDirection = direction;
let scoreValue = 0;
let highScoreValue = 0;

//create a div for snake parts or food and append it to board
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

//generate food and check if food placed inside snake or not
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

//clear the board from the food and snake to draw the next frame
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

//updates the direction of the snake
function detectInput(event)
{
        lastDirection = direction;

        switch (event.key) 
        {
            case "Z":
                direction = "up";
                break;
            case "Q":
                direction = "left";
                break;
            case "S":
                direction = "down";
                break;
            case "D":
                direction = "right";
                break;
        }
}

//move the snake in the current direction
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

//check if the snake head if above a wall and restart the game if it does
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

//check if the snake head if above a food and add a part if it does
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

//check if the snake head is above himself
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

//add the score or reset it
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