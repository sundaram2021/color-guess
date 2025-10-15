import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hex, setHex] = useState();
  const [btn, setBtn] = useState([]);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');

  useEffect(() => {
    generateColor();
  }, [difficulty]);

  function generateRandomHex() {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  function generateSimilarColor(baseColor, difficultyLevel) {
    const base = parseInt(baseColor, 16);
    let variance;

    switch(difficultyLevel) {
      case 'easy':
        variance = 0x444444;
        break;
      case 'hard':
        variance = 0x111111;
        break;
      default:
        variance = 0x222222;
    }

    const offset = Math.floor(Math.random() * variance) - variance / 2;
    const similar = Math.max(0, Math.min(0xFFFFFF, base + offset));
    return similar.toString(16).padStart(6, '0');
  }

  function generateColor() {
    setResult('');
    const correctColor = generateRandomHex();
    const wrongColor1 = generateSimilarColor(correctColor, difficulty);
    const wrongColor2 = generateSimilarColor(correctColor, difficulty);
    setHex(correctColor);
    setBtn(shuffleArray([correctColor, wrongColor1, wrongColor2]));
  }

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function btnHandler(colorId) {
    if (colorId === hex) {
      setResult('done');
      setScore(score + 1);
      setStreak(streak + 1);
      setAttempts(attempts + 1);
      setTimeout(() => {
        generateColor();
      }, 800);
    } else {
      setResult('not');
      setStreak(0);
      setAttempts(attempts + 1);
    }
  }

  function resetGame() {
    setScore(0);
    setAttempts(0);
    setStreak(0);
    generateColor();
  }

  function changeDifficulty(level) {
    setDifficulty(level);
    resetGame();
  }

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div className="App">
      <h1 className="title">Color Guessing Game</h1>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Streak:</span>
          <span className="stat-value">{streak}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Accuracy:</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
      </div>

      <div className="difficulty-selector">
        <button
          className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
          onClick={() => changeDifficulty('easy')}
          aria-label="Easy difficulty"
        >
          Easy
        </button>
        <button
          className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
          onClick={() => changeDifficulty('medium')}
          aria-label="Medium difficulty"
        >
          Medium
        </button>
        <button
          className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
          onClick={() => changeDifficulty('hard')}
          aria-label="Hard difficulty"
        >
          Hard
        </button>
      </div>

      <section
        className="sec"
        style={{ backgroundColor: `#${hex}` }}
        role="img"
        aria-label={`Color display showing hex color ${hex}`}
      ></section>

      <p className="instruction">Which color matches the one above?</p>

      <section className="button-container">
        {btn.map((item, idx) => {
          return (
            <button
              key={idx}
              className="color-btn"
              onClick={() => btnHandler(item)}
              aria-label={`Select color option ${item}`}
            >
              #{item}
            </button>
          );
        })}
      </section>

      {result === 'done' && (
        <p className="feedback correct" role="alert">
          Correct! Well done!
        </p>
      )}
      {result === 'not' && (
        <p className="feedback wrong" role="alert">
          Wrong! Try again!
        </p>
      )}

      <button
        className="reset-btn"
        onClick={resetGame}
        aria-label="Reset game"
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
