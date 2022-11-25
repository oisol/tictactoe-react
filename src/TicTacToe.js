import { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  // Board inicial
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  // Definir atual jogador
  const [currentPlayer, setCurrentPlayer] = useState("X");
  // Definir Ganhador
  const [winner, setWinner] = useState(null);
  // Placar de pontos
  const [scoreX, setScoreX] = useState([0]);
  const [scoreO, setScoreO] = useState([0]);

  // Verificar se houve ganhador
  useEffect(() => {
    checkWinner();
  }, [board]);

  // Verificar Score
  useEffect(() => {
    checkScore();
  }, [winner]);

  // Pontuar Scores
  const checkScore = () => {
    if(winner === 'X'){
      setScoreX([scoreX[0] +=1]);
    }else if(winner === 'O') {
      setScoreO([scoreO[0] +=1]);
    }
  };

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

      if (cells.every(cell => cell === "O")){
        return setWinner("O");
      }if (cells.every(cell => cell === "X")){
        return setWinner("X");
      }else {
        if (winner === null) {
          checkDraw();
        }
      }; 

    });

  };

  // Verificar empate
  const checkDraw = () => {
    if (board.every(item => item != "")) {
      setWinner("D")
    }
  };

  // Resetar jogo
  const resetGame = () => {
    setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner(null);
  };

  // Roda a função de checar vencedor para corrigir bug de sempre empate na última jogada
  if (winner === 'D'){
    checkWinner()
  }

  return (
    <main>
      <h1 className='title'>Jogo da Velha</h1>

      {
        !winner ? 

        currentPlayer === "X" ?
          <h2 className='current-player'>
            jogador <span className={currentPlayer}>1</span>
          </h2>
        :
          <h2 className='current-player'>
            jogador <span className={currentPlayer}>2</span>
          </h2>

        : 
        <h2></h2>
      }

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

      <div className='score'>

        {winner != 'X' ? 
          <h3>Jogador 1 <span className='score-X'>{scoreX}</span></h3>
          :
          <h3>Jogador 1 <span className='score-X animation'>{scoreX}</span></h3>
        }
        <p>X</p>
        {winner != 'O' ?
          <h3>Jogador 2 <span className='score-O'>{scoreO}</span></h3>
          :
          <h3>Jogador 2 <span className='score-O animation'>{scoreO}</span></h3>
        }

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
