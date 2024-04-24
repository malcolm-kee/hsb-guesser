import { useState, useMemo } from 'react';
import './App.css';
import { randomIntFromInterval, hsbToRgb } from './helpers';

const getRandomHsb = () => ({
  h: randomIntFromInterval(0, 360),
  s: randomIntFromInterval(0, 100),
  b: randomIntFromInterval(0, 100),
});

function App() {
  const [hsb, setHsb] = useState(getRandomHsb);

  const { r, g, b } = useMemo(() => hsbToRgb(hsb.h, hsb.s, hsb.b), [hsb]);

  const [hue, setHue] = useState('');

  return (
    <>
      <h1 className="text-6xl font-extrabold">HSB Guesser</h1>
      <p>
        h: {hsb.h}deg, s: {hsb.s}%, b: {hsb.b}%
      </p>
      <div
        className="w-1/3 aspect-square rounded-full mx-auto"
        style={{
          backgroundColor: `rgb(${r} ${g} ${b})`,
        }}
      />
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <div>
          <label htmlFor="h">Hue</label>
          <input
            type="number"
            id="hue"
            value={hue}
            onChange={(ev) => setHue(ev.target.value)}
          />
        </div>
        <div className="py-3">
          <button
            onClick={() => setHsb(getRandomHsb)}
            className="shadow px-3 py-1 bg-teal-700 text-white rounded"
            type="button"
          >
            Regenerate
          </button>
        </div>
      </form>
    </>
  );
}

export default App;
