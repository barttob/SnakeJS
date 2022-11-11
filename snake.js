document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".button");
  const pointsDiv = document.querySelector(".points");

  const width = 20;
  let direction;
  let snakeLength;
  let speed = 100;
  let apple;
  let points;
  let interval = 0;

  for (let i = 0; i < width * width; i++) {
    document.querySelector(".grid").innerHTML += "<div></div>";
  }

  const squares = document.querySelectorAll(".grid div");

  function game() {
    startBtn.style.display = "none";
    pointsDiv.style.opacity = "0.2";
    points = 0;
    pointsDiv.innerHTML = points;
    direction = 1;
    snakeLength = [2, 1];
    snakeLength.forEach((index) => squares[index].classList.add("snake"));
    generateApple();
    move();
  }

  function move() {
    clearInterval(interval);

    if (
      (snakeLength[0] % width == 0 && direction == -1) ||
      (snakeLength[0] % width == width - 1 && direction == 1) ||
      (snakeLength[0] - width < 0 && direction == -width) ||
      (snakeLength[0] + width >= width * width && direction == width) ||
      squares[snakeLength[0] + direction].classList.contains("snake")
    )
      end();
    else {
      snakeLength.unshift(snakeLength[0] + direction);
      squares[snakeLength[0]].classList.add("snake");

      if (squares[snakeLength[0]].classList.contains("apple")) {
        squares[apple].classList.remove("apple");
        points++;
        pointsDiv.innerHTML = points;
        generateApple();
      } else {
        squares[snakeLength[snakeLength.length - 1]].classList.remove("snake");
        snakeLength.pop();
      }

      interval = setInterval(move, speed);
    }
  }

  function generateApple() {
    do {
      apple = Math.floor(Math.random() * squares.length);
    } while (squares[apple].classList.contains("snake"));
    squares[apple].classList.add("apple");
  }

  function control(e) {
    if (e.keyCode === 39 && direction != -1) {
      direction = 1;
    } else if (e.keyCode === 38 && direction != width) {
      direction = -width;
    } else if (e.keyCode === 37 && direction != 1) {
      direction = -1;
    } else if (e.keyCode === 40 && direction != -width) {
      direction = width;
    }
  }

  function end() {
    clearTimeout(interval);
    snakeLength.forEach((index) => squares[index].classList.remove("snake"));
    squares[apple].classList.remove("apple");
    pointsDiv.style.opacity = "0.6";
    startBtn.innerHTML = "RESTART";
    startBtn.style.display = "block";
  }

  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", game);
});
