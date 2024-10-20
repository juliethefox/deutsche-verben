import React, { useState, useEffect } from 'react';

interface Sentence {
  german: string;
  english: string;
}

interface SentenceCardProps {
  sentence: Sentence;
  onNextSentence: () => void;
}

const SentenceCard: React.FC<SentenceCardProps> = ({ sentence, onNextSentence }) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setUserInput('');
    setIsCorrect(false);
  }, [sentence]);

  const removePunctuation = (str: string) => {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);
    checkAnswer(input);
  };

  const checkAnswer = (input: string) => {
    const cleanInput = removePunctuation(input);
    const cleanGerman = removePunctuation(sentence.german);
    const correct = cleanInput === cleanGerman;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(onNextSentence, 500);
    }
  };

  return (
    <div className="learning-card">
      <h2>{sentence.english}</h2>
      <div className="sentence-input">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter the German sentence"
          className={userInput ? (isCorrect ? 'correct' : 'incorrect') : ''}
        />
        {userInput && (
          <span className={isCorrect ? 'correct' : 'incorrect'}>
            {isCorrect ? '✓' : '✗'}
          </span>
        )}
      </div>
      <button onClick={onNextSentence}>Next Sentence</button>
    </div>
  );
};

export default SentenceCard;