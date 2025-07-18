import React from 'react';

function TriviaClue({ triviaClues, triviaProgress }) {
  return (
    <div className="trivia-clues">
      <h3>Trivia Clues</h3>
      <ol>
        {triviaClues.map((clue, index) => (
          <li key={index}>
            {triviaProgress.includes(index) ? clue : "—"}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TriviaClue;
