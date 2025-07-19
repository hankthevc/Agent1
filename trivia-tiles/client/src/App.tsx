import React, { useState, useEffect } from 'react';
import TileWheel from './components/TileWheel';
import WordInput from './components/WordInput';
import TriviaClue from './components/TriviaClue';
import FinalTrivia from './components/FinalTrivia';
import puzzleData from './data/samplePuzzle.json';
import './App.css';

function App() {
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [foundWords, setFoundWords] = useState([]);
  const [triviaProgress, setTriviaProgress] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLetterClick = (letter) => {
    setCurrentWord((prevWord) => prevWord + letter);
  };

  const handleWordSubmit = async (word) => {
    const uppercaseWord = word.toUpperCase();
    if (foundWords.includes(uppercaseWord)) {
      setErrorMessage('Word already found.');
      return;
    }

    const isValid = uppercaseWord.length >= 4 &&
      uppercaseWord.includes(puzzleData.center) &&
      uppercaseWord.split('').every(l => [puzzleData.center, ...puzzleData.outer].includes(l));

    if (!isValid) {
      setErrorMessage('Invalid word. Must be 4+ letters and include center letter.');
      return;
    }

    let wordScore = 1;
    if (uppercaseWord.length === 4) wordScore = 1;
    else wordScore = 1 + 2 * (uppercaseWord.length - 4);

    const isJackpot = [...new Set(uppercaseWord)].length === 8;
    if (isJackpot) wordScore += 20;

    setScore((prev) => prev + wordScore);
    setFoundWords((prev) => [...prev, uppercaseWord]);

    const triviaIndex = puzzleData.triviaWords.indexOf(uppercaseWord);
    if (triviaIndex !== -1 && !triviaProgress.includes(triviaIndex)) {
      setTriviaProgress((prev) => [...prev, triviaIndex]);
    }

    setCurrentWord('');
    setErrorMessage('');
  };

 return (
  <div className="main">
    <h1>Trivia Tiles: {puzzleData.category}</h1>

    <TileWheel
      center={puzzleData.center}
      outer={puzzleData.outer}
      onLetterClick={handleLetterClick}
    />

    <WordInput
      currentWord={currentWord}
      setCurrentWord={setCurrentWord}
      handleWordSubmit={handleWordSubmit}
      centerLetter={puzzleData.center}
    />

    {errorMessage && <div className="error-message">{errorMessage}</div>}

    <div className="score">
      Score: <b>{score}</b>
    </div>

    <div className="found-words">
      <h3>Found Words ({foundWords.length})</h3>
      <div>{foundWords.join(', ')}</div>
    </div>

    <TriviaClue
      triviaClues={puzzleData.triviaClues}
      triviaProgress={triviaProgress}
    />

    {triviaProgress.length === puzzleData.triviaClues.length && (
      <FinalTrivia
        question={puzzleData.finalTriviaQuestion.question}
        correctAnswer={puzzleData.finalTriviaQuestion.answer}
        onCorrect={() => setScore((prev) => prev + 25)}
      />
    )}
  </div>
);
}
export default App;
