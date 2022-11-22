import { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  // Board inicial
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);

  return (
    <main>
      <h1 className='title'>Jogo da Velha</h1>

      <div className='board'>
        {board.map((item, index) => (
          <div 
            key={index}
            className={`cell ${item}`}
          >
            {item}
          </div>
        ))}
      </div>
    </main>
  );
}

export default TicTacToe;
