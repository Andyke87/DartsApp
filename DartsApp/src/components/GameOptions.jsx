import React from 'react';

const GameOptions = ({ selectedGame, handleGameSelection }) => {
  return (
    <div className="game-options">
      <div>
        <h1>Game:</h1>
      </div>
      <div>
        <input
          type="radio"
          id="game301"
          name="game"
          value="301"
          checked={selectedGame === '301'}
          onChange={() => handleGameSelection('301')}
        />
        <label htmlFor="game301">301</label>
      </div>
      <div>
        <input
          type="radio"
          id="game501"
          name="game"
          value="501"
          checked={selectedGame === '501'}
          onChange={() => handleGameSelection('501')}
        />
        <label htmlFor="game501">501</label>
      </div>
      <div>
        <input
          type="radio"
          id="game701"
          name="game"
          value="701"
          checked={selectedGame === '701'}
          onChange={() => handleGameSelection('701')}
        />
        <label htmlFor="game701">701</label>
      </div>
    </div>
  );
};

export default GameOptions;
