import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  // Save name to localStorage
  useEffect(() => {
    if (nameSubmitted) {
      localStorage.setItem('playerName', playerName);
    }
  }, [nameSubmitted, playerName]);

  const handleNameSubmit = () => {
    if (playerName.trim() === '') {
      alert('Please enter your name to start the game!');
      return;
    }
    setNameSubmitted(true);
  };

  const startGame = (level: string) => {
    setDifficulty(level);
    // Your game logic to start based on difficulty here
  };

  if (!nameSubmitted) {
    return (
      <div className="start-screen">
        <h1>Welcome to Memory Match Game!</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={handleNameSubmit}>Start</button>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <h2>Hello, {playerName}!</h2>
      <h3>Select Difficulty:</h3>
      <button onClick={() => startGame('Easy')}>Easy</button>
      <button onClick={() => startGame('Medium')}>Medium</button>
      <button onClick={() => startGame('Hard')}>Hard</button>

      {/* Show game based on difficulty (example placeholder) */}
      {difficulty && <p>Game starts in {difficulty} mode!</p>}
    </div>
  );
};

export default App;
