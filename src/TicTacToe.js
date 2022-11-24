import { useState, useEffect } from 'react';
import './TicTacToe.css';

// 
// TODO
// 1.Adicionar contador de pontos
// 2.Se referenciar a X ou O como jogador 1 e jogador 2 e anunciar a vez
//

function TicTacToe() {
  // Board inicial
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  // Definir atual jogador
  const [currentPlayer, setCurrentPlayer] = useState("X");
  // Definir Ganhador
  const [winner, setWinner] = useState(null);
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

    checkDraw();
  };

  // Verificar empate
  const checkDraw = () => {
    if (winner !== null) {
      if (board.every(item => item != "")) {
        setWinner("D");
      }
    }
  }

  // Resetar jogo
  const resetGame = () => {
    setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner(null);
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
          {winner === "D" ?
            <h2 className='winner-message'>
              <span className={winner}>Empatou!</span>
            </h2>
          :
            <h2 className='winner-message'>
              <span className={winner}>{winner}</span> venceu!
            </h2>
          }
            <button onClick={resetGame}>Resetar</button>
        </footer>
      }
    </main>
  );
}

export default TicTacToe;
