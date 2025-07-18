import React, { useState } from 'react';

function FinalTrivia({ question, correctAnswer, onCorrect }) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      onCorrect();
    }
  };

  return (
    <div className="final-trivia">
      <h3>Final Trivia Question:</h3>
      <p>{question}</p>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder "Your answer"
          />
          <button type="submit">Submit Answer</button>
        </form>
      ) : isCorrect ? (
        <p>🎉 Correct! You've earned bonus points!</p>
      ) : (
        <p>😅 Incorrect. The correct answer was: <strong>{correctAnswer}</strong></p>
      )}
    </div>
  );
}

export default FinalTrivia;
