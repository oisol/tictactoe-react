import { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  // Board inicial
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  // Definir atual jogador
  const [currentPlayer, setCurrentPlayer] = useState("X");
  // Definir Ganhador
  const [winner, setWinner] = useState();
  // Verificar se houve ganhador
  useEffect(() => {
    checkWinner()
  }, [board]);

  // Função para retornar a casa do clique
  const handleCellClick = (index) => {
    // Não permitir jogar após concluído
    if (winner) return null;

    // Não permitir jogar 2 vezes na mesma casa
    if (board[index] != "") return null;

    // Retornar o board com o clique atualizado
    // O classname também muda para "cell X" ou "cell O"
    setBoard(
      board.map((item, itemIndex) => 
        itemIndex === index ? currentPlayer : item)
    );

    // Trocar atual jogador
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  // Possibilidades de ganhar o jogo e checando se foi ganho
  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O");
      if (cells.every(cell => cell === "X")) setWinner("X");
    });
  };

  return (
    <main>
      <h1 className='title'>Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
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
      
      {winner &&      
        <footer>
            <h2 className='winner-message'>
              <span className={winner}>{winner}</span> venceu!
            </h2>
        </footer>
      }
    </main>
  );
}

export default TicTacToe;
