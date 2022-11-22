import { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  // Board inicial
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  // Função para retornar a casa do clique
  const handleCellClick = (index) => {
    // Retornar o board com o clique atualizado
    // O classname também muda para "cell X" ou "cell O"
    setBoard(board.map((item, itemIndex) => itemIndex === index ? "X" : item));
  }

  return (
    <main>
      <h1 className='title'>Jogo da Velha</h1>

      <div className='board'>
        {board.map((item, index) => (
          <div 
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </main>
  );
}

export default TicTacToe;
