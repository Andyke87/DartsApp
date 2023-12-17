import React from 'react';
import dartPijl from '../../public/dartpijl.png';

const Score = ({ player, score, isCurrentPlayer }) => {
  return (
    <div className={`score ${isCurrentPlayer ? 'current-player' : ''}`}>
      <h1 className="player-info">
        Player {player} 
        {isCurrentPlayer && <img src={dartPijl} alt="Dart Pijl" className="dart-pijl" />}
      </h1>
      {score !== '' && (
        <p>
          Score: {score}
        </p>
      )}
    </div>
  );
};

export default Score;


