import './App.css'
import { useState } from 'react';

function App() {
  const [player, setPlayer] = useState('Chicken');

  function switchPlayer() {
    setPlayer(player === 'Chicken' ? 'Banana' : 'Chicken');
  }

  function generateGrid() {
    const tiles = [];
    for (let i = 0; i < 36; i++) {
      tiles.push(
        <button className='tile' key={i} onClick={switchPlayer}>
          {i + 1}
        </button>
      );
    }
    return tiles;
  }


  return (
    <>
      <div className="header">
        <div className="scoreboard">
          <h3 className='scoreboard-title'>Scoreboard</h3>
          <p className='chicken-score'>0</p>
          <p className='banana-score'>0</p>
        </div>

        <div className="game-status">
          <h3 className='scoreboard-title'>Game Status</h3>
          <p>Two players: <b>Chicken</b> and <b>Banana</b></p>
          <div className="turn">{player}'s Turn</div>
        </div>
      </div>
      
      <br />

      <div className="grid">
        {generateGrid()}
      </div>
    </>
  )
}

export default App
