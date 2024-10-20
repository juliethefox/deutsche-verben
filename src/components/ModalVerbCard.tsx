import React, { useState, useEffect } from 'react';

interface ModalVerbProps {
  modalVerb: {
    [tense: string]: {
      [pronoun: string]: string;
    };
  };
  verbName: string;
  onNextVerb: () => void;
}

const ModalVerbCard: React.FC<ModalVerbProps> = ({ modalVerb, verbName, onNextVerb }) => {
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
  const [inputCorrect, setInputCorrect] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setUserInputs({});
    setInputCorrect({});
  }, [modalVerb]);

  const handleInputChange = (tense: string, pronoun: string, value: string) => {
    const inputKey = `${tense}_${pronoun}`;
    setUserInputs(prev => ({ ...prev, [inputKey]: value }));
    validateInput(tense, pronoun, value);
  };

  const validateInput = (tense: string, pronoun: string, value: string) => {
    const inputKey = `${tense}_${pronoun}`;
    const correctAnswer = modalVerb[tense][pronoun];
    const isCorrect = value.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();
    setInputCorrect(prev => ({ ...prev, [inputKey]: isCorrect }));
  };

  useEffect(() => {
    const allCorrect = Object.values(inputCorrect).every(Boolean) &&
      Object.keys(inputCorrect).length === Object.entries(modalVerb).flatMap(([_, tense]) => Object.keys(tense)).length;
    if (allCorrect) {
      onNextVerb();
    }
  }, [inputCorrect, modalVerb, onNextVerb]);

  return (
    <div className="learning-card modal-verb-card">
      <h2>{verbName}</h2>
      {Object.entries(modalVerb).map(([tense, pronouns]) => (
        <div key={tense} className="tense-table">
          <h3>{tense}</h3>
          <div className="forms">
            {Object.entries(pronouns).map(([pronoun, correctAnswer]) => {
              const inputKey = `${tense}_${pronoun}`;
              return (
                <div key={pronoun} className="form-input">
                  <span className="pronoun">{pronoun}</span>
                  <input
                    type="text"
                    value={userInputs[inputKey] || ''}
                    onChange={(e) => handleInputChange(tense, pronoun, e.target.value)}
                    className={userInputs[inputKey] ? (inputCorrect[inputKey] ? 'correct' : 'incorrect') : ''}
                  />
                  {userInputs[inputKey] && (
                    <span className={inputCorrect[inputKey] ? 'correct' : 'incorrect'}>
                      {inputCorrect[inputKey] ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={onNextVerb}>Next Verb</button>
    </div>
  );
};

export default ModalVerbCard;