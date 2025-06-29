import './App.css'
import { useState } from 'react';

const imageUrls = [
  'public/banana.png',
  'public/chicken.png',
]

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

function App() {
  const [losingPlayer, setLosingPlayer] = useState('');
  const [player, setPlayer] = useState('Chicken');
  const [score, setScore] = useState({ Chicken: 0, Banana: 0 });
  const [images, setImages] = useState(Array(36).fill().map(getRandomImage));
  const [revealedTiles, setRevealedTiles] = useState(Array(36).fill(false));
  const [gameOver, setGameOver] = useState(false);

  function switchPlayer() {
    setPlayer(player === 'Chicken' ? 'Banana' : 'Chicken');
  }  

  function handleTileClick(index) {
    if (gameOver) return;
    setRevealedTiles(prev => prev.map((r, i) => i === index ? true : r));
    setScore(prev => {
      const currentScore = prev[player];
      if (images[index].includes('banana') && player === 'Banana') {
        return { ...prev, [player]: currentScore + 1 };
      } else if (images[index].includes('chicken') && player === 'Chicken') {
        return { ...prev, [player]: currentScore + 1 };
      } else {
        setGameOver(true);
        setLosingPlayer(player);
        return { ...prev, [player]: currentScore };
      }
      
    });
    switchPlayer();
  }

  function generateGrid() {
    const tiles = [];
    for (let i = 0; i < 36; i++) {
      tiles.push(
        <button className='tile' key={i} onClick={() => handleTileClick(i)} disabled={gameOver || revealedTiles[i]}>
          {revealedTiles[i] ? (
            <img src={images[i]} alt="tile" decoding='async' loading='lazy' height={55} />
          ) : (
            i + 1
          )}
        </button>
      );
    }
    return tiles;
  }


  return (
    <>
      <h1>Chicken-Banana Game</h1>
      <p>Minesweeper-style game inspired by Mang Inasal</p>

      <div className='header'>
        <div className='scoreboard'>
          <h3 className='scoreboard-title'>Scoreboard</h3>
          <p className='chicken-score'>{score['Chicken']} <span>Chicken</span></p>
          <p className='banana-score'>{score['Banana']} <span>Banana</span></p>
        </div>

        <div className='game-status'>
          <h3 className='scoreboard-title'>Game Status</h3>
          <p>Two players: <b>Chicken</b> and <b>Banana</b></p>
          <div className='turn'>{player}'s Turn</div>
        </div>
      </div>
      
      <br />

      <div className='grid'>
        {generateGrid()}
      </div>

      {gameOver && (
        <div className='game-over-banner'>
          <h2>Game Over!</h2>
          <p><b>{losingPlayer}</b> player clicked the wrong tile!</p>
          <button onClick={() => {
            setPlayer('Chicken');
            setScore({ Chicken: 0, Banana: 0 });
            setImages(Array(36).fill().map(getRandomImage));
            setRevealedTiles(Array(36).fill(false));
            setGameOver(false);
          }}>Reset Game</button>
        </div>
      )}

    </>
  )
}

export default App
