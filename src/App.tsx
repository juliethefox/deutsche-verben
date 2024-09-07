import { useState, useEffect } from 'react';
import './App.css';
import LearningCard from './components/LearningCard';
import wordsData from './data/words.json';

interface Word {
  forms: string[];
  translation: string;
  examples: {
    translation: string;
    example: string;
  }[];
}

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    setWords(wordsData);
  }, []);

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <div className="App">
      <h1>Deutsche Verben</h1>
      {words.length > 0 && (
        <LearningCard
          word={words[currentWordIndex]}
          onNextWord={nextWord}
        />
      )}
    </div>
  );
}

export default App;