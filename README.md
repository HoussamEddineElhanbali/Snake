# Snake Game

This is a classic Snake game built using JavaScript, HTML, and CSS. The player controls a snake that moves around a 20x20 grid, consuming food to grow longer while avoiding collisions with the walls and itself.

## How to Play

- Use the following keys to move the snake:

Z → Move Up
Q → Move Left
S → Move Down
D → Move Right

- The snake moves in the chosen direction automatically.
- Eating food increases your score and makes the snake longer.
- Colliding with the walls or yourself resets the game.
- The high score is updated when you beat your best score.

## Game Logic

- The game updates every 200ms, redrawing the snake and food.
- Food spawns in random locations, ensuring it doesn’t overlap with the snake.
- The snake moves based on the last input direction.
- If the snake eats food, it grows in length.
- If the snake collides with the walls or itself, the game resets, and the high score updates.