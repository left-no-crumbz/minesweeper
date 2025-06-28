import './App.css'

function generateGrid() {
  const tiles = [];
  for (let i = 0; i < 36; i++) {
    tiles.push(
      <button className='tile' key={i}>
        {i & 0x1 ? "Chicken": "Banana"}
      </button>
    );
  }
  return tiles;
}

function App() {
  return (
    <>
      <h1>hello world</h1>
      
      <div className="grid">
        {generateGrid()}
      </div>
    </>
  )
}

export default App
