import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hex, setHex] = useState();
  const [btn, setBtn] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    generateColor();
  }, []);

  function generateColor() {
    // setResult(null);
    const random1 = Math.floor(100000 + Math.random() * 900000);
    const random2 = Math.floor(100000 + Math.random() * 900000);
    const random3 = Math.floor(100000 + Math.random() * 900000);
    setHex(random1);
    setBtn(shuffleArray([random1, random3, random2]));
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function btnHandler(colorId) {
    console.log(colorId);
    if (colorId === hex) {
      setResult('done');
      generateColor();
    } else {
      setResult('not');
    }
  }

  return (
    <div className="App">
      <section className="sec" style={{ backgroundColor: `#${hex}` }}></section>
      <section>
        {btn.map((item,idx) => {
          return (
            <>
              <button key={idx} onClick={() => btnHandler(item)}>
                {"#" + item}
              </button>
            </>
          );
        })}
      </section>
      {result==='done' && <p style={{ color: "green" }}>Correct</p>}
      {result==='not' && <p style={{ color: "red" }}>Wrong</p>}
    </div>
  );
}

export default App;
