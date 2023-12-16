/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './styles/DartsBord.css';
import Border from './Border';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const DartsBord = () => {
  const [dartboard, setDartboard] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState('');
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
        return 301;
    }
  };

  useEffect(() => {
    // Stel de initiële score in bij het wijzigen van het geselecteerde spel
    setInitialScore(getInitialScore(selectedGame));
  }, [selectedGame]);

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

      console.log(`Selected Game: ${selectedGame}`);
      console.log(`Initial Score: ${initialScore}`);
      console.log(`Total Throw: ${totalThrow}`);
      console.log(`Remaining Score Before Throw: ${remainingScore}`);

      if (totalThrow > remainingScore) {
        alert(`Beurt voorbij. Te hoge worp.`);
        setSnackbarOpen(true);
      } else {
        let newScore = remainingScore - totalThrow;
        setPlayerScore(newScore);
        console.log(`Remaining Score After Throw: ${newScore}`);
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
    if (selectedGame === '' || selectedPlayers === '') {
      alert('Please select game type and players before starting the game.');
      return;
    }

    // Reset de initiële score bij het starten van het spel
    setInitialScore(getInitialScore(selectedGame));
    setPlayer1Score(getInitialScore(selectedGame));
    setPlayer2Score(getInitialScore(selectedGame));
  };

  return (
    <div className='dartsGame '>
      <div className='spel'>
        <div>
          <label className='gameLabel'>Select Game:</label>
          <select onChange={(e) => setSelectedGame(e.target.value)}>
            <option value="">Select</option>
            <option value="301">301</option>
            <option value="501">501</option>
            <option value="701">701</option>
          </select>
        </div>
        <div>
          <label className='gameLabel'>Select Players:</label>
          <select onChange={(e) => setSelectedPlayers(e.target.value)}>
            <option value="">Select</option>
            <option value="single">Single Player</option>
            <option value="two">Two Players</option>
            <option value="robot">Against Robot</option>
          </select>
        </div>
        <button className='start-game' onClick={handleGameStart}>Start Game</button>
      </div>
      <div className="darts-board">
        <div className="thrown-darts">
          <div className="dart-throw">{throw1 !== null ? throw1 : '-'}</div>
          <div className="dart-throw">{throw2 !== null ? throw2 : '-'}</div>
          <div className="dart-throw">{throw3 !== null ? throw3 : '-'}</div>
        </div>
        <div className='bordLineUp'>
          <div className='spelerNaam'>
            <h1>Player 1</h1>
            <p>{player1Score}</p>
          </div>
          <div className='bord'>
          <Border  handleFieldClick={handleFieldClick} />
          </div>
          {selectedPlayers !== 'single' && selectedPlayers !== '' && (
            <div className='spelerNaam'>
              <h1>{selectedPlayers === 'two' ? 'speler 2' : 'Robot'}</h1>
              <p>{selectedPlayers === 'two' || selectedPlayers === 'robot' ? player2Score : ' '}</p>
            </div>
          )}
        </div>
      </div>
      <div className='score'>
        <h2>Huidige beurt:</h2>
        <p>Speler {currentPlayer} is aan de beurt.</p>
        {clicksRemaining > 0 && <p>Klikken over: {clicksRemaining}</p>}
        {clicksRemaining === 0 && (
          <p>{selectedPlayers !== 'single' ? 'Volgende speler is aan de beurt.' : 'Einde beurt.'}</p>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <MuiAlert elevation={10} variant="filled" severity="info">
          {selectedPlayers === 'single' ? 'Volgende beurt.' : `Volgende speler is aan de beurt.`}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default DartsBord;
