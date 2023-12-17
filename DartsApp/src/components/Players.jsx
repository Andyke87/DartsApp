import React from 'react';

const Players = ({ selectedPlayers, handlePlayerSelection }) => {

  return (
    <div className="players-options">
      <div>
        <h1>Players:</h1>
      </div>
      <div>
        <input
          type="radio"
          id="singlePlayer"
          name="players"
          value="single"
          checked={selectedPlayers === 'single'}
          onChange={() => handlePlayerSelection('single')}
        />
        <label htmlFor="singlePlayer">Single Player</label>
      </div>
      <div>
        <input
          type="radio"
          id="twoPlayers"
          name="players"
          value="two"
          checked={selectedPlayers === 'two'}
          onChange={() => handlePlayerSelection('two')}
        />
        <label htmlFor="twoPlayers">Two Players</label>
      </div>
      <div>
        <input
          type="radio"
          id="robotPlayer"
          name="players"
          value="robot"
          checked={selectedPlayers === 'robot'}
          onChange={() => handlePlayerSelection('robot')}
        />
        <label htmlFor="robotPlayer">Against Robot</label>
      </div>
    </div>
  );
};

export default Players;

