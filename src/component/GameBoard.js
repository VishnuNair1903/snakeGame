import React from 'react'
import { useState } from 'react'
import '../App.css'

function GameBoard({board, snake, food}) {


    

  return (
    <div className='gameboard'>
        {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
                {row.map((cell, cellIndex)=>{
                  let cellType=cell;
                  snake.forEach(segment=>{
                    if(segment[0]===rowIndex && segment[1]===cellIndex){
                      cellType='snake';
                    }
                  });

                  if(food[0]===rowIndex && food[1]===cellIndex){
                    cellType='food';
                  }

                  return(
                    <div key={cellIndex} className={`cell ${cellType}`}></div>
                  )
                })}
            </div>
        ))}
      
    </div>
  )
}

export default GameBoard
