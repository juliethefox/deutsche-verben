import React, { useState, useEffect } from 'react';

interface Word {
  forms: string[];
  translation: string;
  examples: {
    translation: string;
    example: string;
  }[];
}

interface LearningCardProps {
  word: Word;
  onNextWord: () => void;
}

const LearningCard: React.FC<LearningCardProps> = ({ word, onNextWord }) => {
  const [formInputs, setFormInputs] = useState(['', '', '']);
  const [exampleInputs, setExampleInputs] = useState(word.examples.map(() => ''));
  const [formCorrect, setFormCorrect] = useState([false, false, false]);
  const [exampleCorrect, setExampleCorrect] = useState(word.examples.map(() => false));
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    checkAllCorrect();
  }, [formCorrect, exampleCorrect]);

  const removePunctuation = (str: string) => {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().trim();
  };

  const validateInput = (input: string, correct: string) => {
    return removePunctuation(input) === removePunctuation(correct);
  };

  const handleFormChange = (index: number, value: string) => {
    const newFormInputs = [...formInputs];
    newFormInputs[index] = value;
    setFormInputs(newFormInputs);
  };

  const handleExampleChange = (index: number, value: string) => {
    const newExampleInputs = [...exampleInputs];
    newExampleInputs[index] = value;
    setExampleInputs(newExampleInputs);
  };

  const handleFormBlur = (index: number) => {
    const newFormCorrect = [...formCorrect];
    newFormCorrect[index] = validateInput(formInputs[index], word.forms[index]);
    setFormCorrect(newFormCorrect);
  };

  const handleExampleBlur = (index: number) => {
    const newExampleCorrect = [...exampleCorrect];
    newExampleCorrect[index] = validateInput(exampleInputs[index], word.examples[index].example);
    setExampleCorrect(newExampleCorrect);
  };

  const checkAllCorrect = () => {
    const allFormsCorrect = formCorrect.every(Boolean);
    const allExamplesCorrect = exampleCorrect.every(Boolean);
    setAllCorrect(allFormsCorrect && allExamplesCorrect);
  };

  const handleNext = () => {
    setFormInputs(['', '', '']);
    setExampleInputs(word.examples.map(() => ''));
    setFormCorrect([false, false, false]);
    setExampleCorrect(word.examples.map(() => false));
    setAllCorrect(false);
    onNextWord();
  };

  return (
    <div className="learning-card">
      <h2>{word.translation}</h2>
      <div className="forms">
        {word.forms.map((_, index) => (
          <div key={index} className="form-input">
            <input
              type="text"
              value={formInputs[index]}
              onChange={(e) => handleFormChange(index, e.target.value)}
              onBlur={() => handleFormBlur(index)}
              placeholder={`Form ${index + 1}`}
              className={formInputs[index] ? (formCorrect[index] ? 'correct' : 'incorrect') : ''}
            />
            {formInputs[index] && (
              <span className={formCorrect[index] ? 'correct' : 'incorrect'}>
                {formCorrect[index] ? '✓' : '✗'}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="examples">
        {word.examples.map((example, index) => (
          <div key={index} className="example">
            <label>{example.translation}</label>
            <div className="example-input">
              <input
                type="text"
                value={exampleInputs[index]}
                onChange={(e) => handleExampleChange(index, e.target.value)}
                onBlur={() => handleExampleBlur(index)}
                placeholder="Enter example"
                className={exampleInputs[index] ? (exampleCorrect[index] ? 'correct' : 'incorrect') : ''}
              />
              {exampleInputs[index] && (
                <span className={exampleCorrect[index] ? 'correct' : 'incorrect'}>
                  {exampleCorrect[index] ? '✓' : '✗'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {allCorrect && <button onClick={handleNext}>Next Word</button>}
    </div>
  );
};

export default LearningCard;