import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LearningCard from './components/LearningCard';
import wordsData from './data/words.json';
import modalVerbsData from './data/modalVerbs.json';
import sentencesData from './data/sentences.json';
import ModalVerbCard from './components/ModalVerbCard';
import SentenceCard from './components/SentenceCard';

interface Word {
  forms: string[];
  translation: string;
  examples: {
    translation: string;
    example: string;
  }[];
}

interface ModalVerb {
  [verb: string]: {
    [tense: string]: {
      [pronoun: string]: string;
    };
  };
}

interface Sentence {
  german: string;
  english: string;
}

const App: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [modalVerbs, setModalVerbs] = useState<ModalVerb>({});
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentModalVerbIndex, setCurrentModalVerbIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    setWords(wordsData);
    setModalVerbs(modalVerbsData as ModalVerb);
    setSentences(sentencesData);
  }, []);

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handleNextModalVerb = () => {
    const verbKeys = Object.keys(modalVerbs);
    setCurrentModalVerbIndex((prevIndex) => (prevIndex + 1) % verbKeys.length);
  };

  const nextSentence = () => {
    setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Verben</Link></li>
            <li><Link to="/modal-verbs">Modal Verben</Link></li>
            <li><Link to="/sentences">Sätze</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1>Deutsche Verben</h1>
              {words.length > 0 && (
                <LearningCard
                  word={words[currentWordIndex]}
                  onNextWord={nextWord}
                />
              )}
            </>
          } />
          <Route path="/modal-verbs" element={
            <>
              <h1>Modal Verben</h1>
              {Object.keys(modalVerbs).length > 0 && (
                <ModalVerbCard
                  modalVerb={modalVerbs[Object.keys(modalVerbs)[currentModalVerbIndex]]}
                  verbName={Object.keys(modalVerbs)[currentModalVerbIndex]}
                  onNextVerb={handleNextModalVerb}
                />
              )}
            </>
          } />
          <Route path="/sentences" element={
            <>
              <h1>Sätze</h1>
              {sentences.length > 0 && (
                <SentenceCard
                  sentence={sentences[currentSentenceIndex]}
                  onNextSentence={nextSentence}
                />
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;