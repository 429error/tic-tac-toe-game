import React, { useState } from 'react';
import '/App.css';

function App(){

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const chechWinner = (squares) => {
    const Lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of Lines) {
      const [a, b, c] = line;
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = chechWinner(board);
  const isTie = !winner && board.every(square => square !== null);

  const handleClick = (index) => {
    if(board[index] || winner) return;
    const newBoard = [...board];
    newboard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  let status;
  if (winner) {
    status = `Congratulations you won : ${winner}`;
  } else if (isTie) {
    status = " Ohh No it's a tie!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return(
    <div className="App">
    <h1>Tic Tac Toe</h1>
    <p className="status">{status}</p>
    
    <div className="board">
      {board.map((square, index) => (
        <button 
          key={index} 
          className="square"
          onClick={() => handleClick(index)}
        >
          {square}
        </button>
      ))}
    </div>
    
    <button onClick={resetGame} className="reset-button">
      New Game
    </button>
  </div>
);
}

export default App;