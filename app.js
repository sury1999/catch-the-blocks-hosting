document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const easyBtn = document.querySelector('#difficulty-easy');
const hardBtn = document.querySelector('#difficulty-hard');
let timerId;
const width = 40;
let score = 0;
//for difficulty
let easy = 1;
let difficult = 2;
//platform
const platform = [0, 1, 2, 3, 4];

//blocks of different sizes
const size1 = [
  [1],
  [1],
  [1]
];

const size2 = [
  [1, width + 1],
  [1,2],
  [1, width + 1]
];

const size4 = [
  [1, 2, 3, 4],
  [1, width + 1, 2*width + 1, 3*width + 1],
  [1, 2, width + 1, width + 2]
];

const blocks = [size1, size2, size4];

let currentPosition = 1;

let currentPlatformPosition = 778;

let random = Math.floor(Math.random()*blocks.length);
let orientation = Math.floor(Math.random()*blocks.length);
let current = blocks[random][orientation];

//draw the platform
function drawPlatform() {
  platform.forEach(index => {
    squares[currentPlatformPosition + index].classList.add('platform');
  })

}

function undrawPlatform() {
  platform.forEach(index => {
    squares[currentPlatformPosition + index].classList.remove('platform');
  })
}

// draw the blocks
function draw() {
  current.forEach(index =>  {
    squares[currentPosition + index].classList.add('block');
  })
}

// remove the blocks
function undraw() {
  current.forEach(index => {
    squares[currentPosition + index].classList.remove('block');
  })
}

//move down function
function moveDown() {
  undraw();
  currentPosition += width;
  draw();

  //need to write
  gameOver();
  gameContinue();


}

// controls the platform
function control(e)
{
  if(e.keyCode === 37)
  {
  moveLeft();
  }
  else if(e.keyCode === 39)
  {
    moveRight();
  }
}
document.addEventListener('keyup', control)

//move platform left until at the edge
function moveLeft() {
   undrawPlatform();
   const isAtLeftEdge = platform.some(index => (currentPlatformPosition + index) % width === 0);
   if(!isAtLeftEdge) currentPlatformPosition -=1;
   drawPlatform();
 }

 //move platform right until at the edge
 function moveRight() {
    undrawPlatform();
    const isAtRightEdge = platform.some(index => (currentPlatformPosition + index) % width === 39);
    if(!isAtRightEdge) currentPlatformPosition +=1;
    drawPlatform();
  }

//start button functionality
  startBtn.addEventListener('click', () => {
  if(timerId)
  {
    clearInterval(timerId);
    timerId = null;
  }
  else
  //diff fall speeds for the first block only
  {
    if(random == 0)
    {
    timerId = setInterval(moveDown, 2000);
    }
    else if(random == 1)
    {
      timerId = setInterval(moveDown, 1000);
    }
    else if(random == 2)
    {
      timerId = setInterval(moveDown, 500);
    }
    random = Math.floor(Math.random()*blocks.length);

  }
})

// blocks from random position
function numberOfBlocks (){
  let newRandom = Math.floor(Math.random()* 10);
  currentPosition = 4*newRandom;
  draw();
}
//end game


function gameContinue() {
  if(current.some(index => squares[currentPosition + index + width].classList.contains('platform'))) {
  undraw();
  addScore();
   random2 = Math.floor(Math.random()*blocks.length);
   orientation2 = Math.floor(Math.random()*blocks.length);
   current = blocks[random2][orientation2];
   numberOfBlocks();
   difficulty();
 }
}
   //different falling speeds and difficulty

   function difficulty() {
   clearInterval(timerId);

   var rates = document.getElementsByName('difficultyType');
   var rate_value;
   for(var i = 0; i < rates.length; i++){
       if(rates[i].checked){
           rate_value = rates[i].value;
       }
   }

      if(random2 == 2)
     {
       timerId = setInterval(moveDown, 500/rate_value);
       console.log(rates);
     }
     else if(random2 == 1)
     {
       timerId = setInterval(moveDown, 800/rate_value);
       console.log(rates);
     }
     else if(random2 == 0)
     {
       timerId = setInterval(moveDown, 1000/rate_value);
       console.log(rates);
     }

}



//adds the score
function addScore() {

    for(let i = 0; i < current.length; i ++)
    {
        {
          score += 1;
          scoreDisplay.innerHTML = score;
          const squaresRemoved = squares.splice(i,width);
          squares = squaresRemoved.concat(squares);
          squares.forEach(cell => grid.appendChild(cell));


        }
      }
  }

  function gameOver()
{
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken')))
  {
    scoreDisplay.innerHTML = 'end';
    clearInterval(timerId);
  }
}




numberOfBlocks();
drawPlatform();
gameOver();
gameContinue();

//need to get difficulty added
//this
//is
//for
//any ctrl+z

})
