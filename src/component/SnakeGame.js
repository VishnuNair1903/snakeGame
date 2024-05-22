import React from 'react';
import GameBoard from './GameBoard';
import { useState, useEffect } from 'react';
import '../App.css';

function SnakeGame() {
  const boardSize = 20;
  const directions={
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
 
  }
  const getRandomPosition = () => {
    return [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
  };

  const [snake, setSnake] = useState([[2, 2]]);
  const [food, setFood] = useState(getRandomPosition());
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState(directions.ArrowRight);


  const [board, setBoard] = useState(
    new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null))
  );

  const handlenewGame = () => {
    setSnake([[2, 2]]);
    setFood(getRandomPosition());
    setDirection(directions.ArrowRight);
    setGameOver(false);
  }

  
  const moveSnake = () => {
    const snakeHead = snake[0];

    if(!Array.isArray(snakeHead) || snakeHead.length<2){
      console.log("Invalid snake head", snakeHead);
      setGameOver(true);
      return;
    }

    const newHead = [
      (snakeHead[0] + direction[0] + boardSize) % boardSize,
      (snakeHead[1] + direction[1] + boardSize) % boardSize
    ];
    if (snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];
    if(newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(getRandomPosition());
    } else {
      newSnake.pop();
    }
    
    setSnake(newSnake);
  };

  const handleKeyDown = (event) => {
    if(directions[event.key]){
      setDirection(directions[event.key]);
    }
  };

  useEffect(()=>{
    const interval=setInterval(()=>{
      if(!gameOver){
        moveSnake();
      }
    }, 200);

    return ()=>clearInterval(interval);
  },[snake, direction, gameOver]);

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    return ()=>window.removeEventListener('keydown', handleKeyDown);
  },[]);
  

  return (
    <div>
      <h1>Snake Game</h1>
      {gameOver ? <h1>Game Over</h1> : <GameBoard board={board} food={food} snake={snake}/>}
      <div className='but'>
      <button onClick={handlenewGame}>New Game</button>
      </div>
    </div>
  );
}

export default SnakeGame;
