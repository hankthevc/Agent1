import React from 'react';

export default function WordInput({ currentWord, setCurrentWord, handleWordSubmit, centerLetter }) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleWordSubmit(currentWord);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={currentWord}
        onChange={(e) => setCurrentWord(e.target.value)}
        placeholder={`Use the letter "${centerLetter}"`}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
