/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Border from '../components/Border';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Players from '../components/Players';
import GameOptions from '../components/GameOptions';
import Score from '../components/Score';
import './styles/DartsBord.css';

const DartsBord = () => {
  const [dartboard, setDartboard] = useState([]);
  const [selectedGame, setSelectedGame] = useState('301');
  const [selectedPlayers, setSelectedPlayers] = useState('single');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [clicksRemaining, setClicksRemaining] = useState(3);
  const [initialScore, setInitialScore] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [throw1, setThrow1] = useState(null);
  const [throw2, setThrow2] = useState(null);
  const [throw3, setThrow3] = useState(null);

  const getInitialScore = (selectedGame) => {
    switch (selectedGame) {
      case '301':
        return 301;
      case '501':
        return 501;
      case '701':
        return 701;
      default:
        return 0;
    }
  };

  const handlePlayerSelection = (playerType) => {
    setSelectedPlayers(playerType);
  };

  const handleGameSelection = (gameOption) => {
    setSelectedGame(gameOption);
  };

  const handleFieldClick = (field) => {
    if (clicksRemaining > 0) {
      const updatedDartboard = [...dartboard, { field, player: currentPlayer }];
      setDartboard(updatedDartboard);
      setClicksRemaining(clicksRemaining - 1);

      if (!throw1) {
        setThrow1(field);
      } else if (!throw2) {
        setThrow2(field);
      } else if (!throw3) {
        setThrow3(field);
      }
    }
  };

  useEffect(() => {
    if (clicksRemaining === 0) {
      let totalThrow = dartboard.reduce((total, dart) => total + dart.field, 0);

      const remainingScore = getRemainingScore();

      if (totalThrow > remainingScore) {
        alert(`Turn is over, throw to high.`);
        setSnackbarOpen(true);
      } else {
        let newScore = remainingScore - totalThrow;
        setPlayerScore(newScore);

        if (newScore === 0) {
          alert(`Player ${currentPlayer} has won!`);
        }
      }

      setTimeout(() => {
        setClicksRemaining(3);
        setCurrentPlayer(selectedPlayers === 'single' ? currentPlayer : (currentPlayer === 1 ? 2 : 1));
        setDartboard([]);
        setThrow1(null);
        setThrow2(null);
        setThrow3(null);
        setSnackbarOpen(false);
      }, 2000);
    }
  }, [clicksRemaining]);

  const setPlayerScore = (newScore) => {
    if (currentPlayer === 1) {
      setPlayer1Score(Math.max(newScore, 0));
    } else {
      setPlayer2Score(Math.max(newScore, 0));
    }
  };

  const getRemainingScore = () => {
    return currentPlayer === 1 ? player1Score : player2Score;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGameStart = async () => {

    setInitialScore(getInitialScore(selectedGame));
    setPlayer1Score(getInitialScore(selectedGame));
    setPlayer2Score(getInitialScore(selectedGame));
  };

  return (
    <div className='dartsGame'>
      <div className='spel'>
        <div className='selectGame'>
          <Players selectedPlayers={selectedPlayers} handlePlayerSelection={handlePlayerSelection} />
        </div>
        <div className='selectGame'>
          <GameOptions selectedGame={selectedGame} handleGameSelection={handleGameSelection} />
        </div>
        <div>
          <button className='start-game' onClick={handleGameStart}>
            Start Game
          </button>
        </div>
        <div className="thrown-darts">
          <div>
            <label htmlFor="arrow1"> Arrow 1</label>
            <div className="dart-throw">{throw1 !== null ? throw1 : '-'}</div>
          </div>
          <div>
            <label htmlFor="arrow2"> Arrow 2</label>
            <div className="dart-throw">{throw2 !== null ? throw2 : '-'}</div>
          </div>
          <div>
            <label htmlFor="arrow3"> Arrow 3</label>
            <div className="dart-throw">{throw3 !== null ? throw3 : '-'}</div>
          </div>
        </div>
      </div>

      <div className="darts-board">
        <Score className={'player1'} player={1} score={player1Score} isCurrentPlayer={currentPlayer === 1} />
        <div className='bord'>
          <Border handleFieldClick={handleFieldClick} />
        </div>
        {selectedPlayers !== 'single' && selectedPlayers !== '' && (
          <Score className={'player'} player={2} score={selectedPlayers === 'two' || selectedPlayers === 'robot' ? player2Score : ' '} isCurrentPlayer={currentPlayer === 2} />
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <MuiAlert elevation={10} variant="filled" severity="info">
          {selectedPlayers === 'single' ? 'Volgende beurt.' : `Volgende speler is aan de beurt.`}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default DartsBord;
