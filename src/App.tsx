import * as React from 'react';
import { flushSync } from 'react-dom';
import { clsx } from 'clsx';

import { Button } from './components/button';
import { Input } from './components/input';
import { Label } from './components/label';
import { RangeInput } from './components/range-input';
import {
  computeMarks,
  getRandomHsb,
  hsbToRgb,
  type HsbValues,
} from './helpers';
import { transitionView } from './lib/view-transition';
import { useIsKeyboardUser } from './lib/keyboard-user';

type AppState =
  | {
      mode: 'quiz';
    }
  | {
      mode: 'result';
      results: Array<number>;
    };

function App() {
  const [state, setState] = React.useState<AppState>({ mode: 'quiz' });
  const isKeyboardUser = useIsKeyboardUser();

  return (
    <div className="max-w-2xl px-3 mx-auto">
      <h1 className="text-6xl text-center font-extrabold text-zinc-600 py-3">
        HSB Guesser
      </h1>
      {state.mode === 'quiz' ? (
        <HsbQuiz
          totalQuestion={10}
          onComplete={(results) =>
            setState({
              mode: 'result',
              results,
            })
          }
          isKeyboardUser={isKeyboardUser}
        />
      ) : (
        <div className="my-6">
          <p className="text-center text-xl">
            Your score is{' '}
            <span className="block text-6xl">
              {Math.round(
                state.results.reduce((prev, current) => prev + current, 0) /
                  state.results.length
              )}
              %
            </span>
          </p>
          <div className="py-3">
            <Button
              onClick={() => setState({ mode: 'quiz' })}
              className="w-full"
            >
              Replay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type QuizState =
  | {
      mode: 'guess';
      hsb: HsbValues;
      questionNum: number;
      results: Array<number>;
    }
  | {
      mode: 'result';
      marks: number;
      hsb: HsbValues;
      questionNum: number;
      results: Array<number>;
    };

function HsbQuiz(props: {
  totalQuestion: number;
  onComplete: (results: Array<number>) => void;
  isKeyboardUser: boolean;
}) {
  const [state, setState] = React.useState<QuizState>(() => ({
    mode: 'guess',
    hsb: getRandomHsb(),
    questionNum: 1,
    results: [],
  }));

  const { hsb } = state;

  const { r, g, b } = React.useMemo(() => hsbToRgb(hsb.h, hsb.s, hsb.b), [hsb]);

  const [hueGuess, setHueGuess] = React.useState('');
  const [saturationGuess, setSaturationGuess] = React.useState('');
  const [brightnessGuess, setBrightnessGuess] = React.useState('');
  const hueInputRef = React.useRef<HTMLInputElement>(null);
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (props.isKeyboardUser) {
      if (state.mode === 'guess' && hueInputRef.current) {
        hueInputRef.current.focus();
      }

      if (state.mode === 'result' && submitButtonRef.current) {
        // focus next button so it's easier for keyboard user to navigate
        submitButtonRef.current.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode]);

  const isDisplayingResult = state.mode === 'result';

  return (
    <>
      <p className="text-sm text-zinc-500 text-center">
        {state.questionNum} of {props.totalQuestion}
      </p>
      <div
        className={clsx(
          'grid items-center gap-6',
          state.mode === 'result' && 'grid-cols-2'
        )}
      >
        <div
          className={clsx(
            state.mode === 'guess' && 'w-[calc((100%_-_1.5rem)_/_2)] mx-auto'
          )}
        >
          <div
            className="w-full aspect-square rounded-full mx-auto [view-transition-name:color-circle]"
            style={{
              backgroundColor: `rgb(${r} ${g} ${b})`,
            }}
          />
        </div>
        {state.mode === 'result' && (
          <div>
            <dl className={clsx('grid grid-cols-[100px_1fr] gap-3')}>
              <dt>Hue</dt>
              <dd>{state.hsb.h}&deg;</dd>
              <dt>Saturation</dt>
              <dd>{state.hsb.s}%</dd>
              <dt>Brightness</dt>
              <dd>{state.hsb.b}%</dd>
            </dl>
            <div className="py-6">
              <div className="text-sm font-medium text-zinc-500">MARKS</div>
              <div className="text-6xl">{state.marks}%</div>
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();

          transitionView(() => {
            flushSync(() => {
              if (state.mode === 'guess') {
                setState((prev) => ({
                  ...prev,
                  mode: 'result',
                  marks: computeMarks(
                    {
                      h: parseInt(hueGuess, 10),
                      s: parseInt(saturationGuess, 10),
                      b: parseInt(brightnessGuess, 10),
                    },
                    hsb
                  ),
                }));
              } else if (state.mode === 'result') {
                if (state.questionNum >= props.totalQuestion) {
                  props.onComplete(state.results.concat(state.marks));
                } else {
                  setState((prev) => ({
                    mode: 'guess',
                    hsb: getRandomHsb(),
                    questionNum: prev.questionNum + 1,
                    results: prev.results.concat(state.marks),
                  }));
                  setHueGuess('');
                  setSaturationGuess('');
                  setBrightnessGuess('');
                }
              }
            });
          });
        }}
        className="py-6"
      >
        <div className="grid gap-12 md:gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Label className="w-28 flex-shrink-0" htmlFor="hue">
              Hue (&deg;)
            </Label>
            <div className="md:w-36 flex-shrink-0">
              <Input
                type="number"
                id="hue"
                value={hueGuess}
                onValue={setHueGuess}
                min={0}
                max={359}
                step={1}
                required
                disabled={isDisplayingResult}
                ref={hueInputRef}
              />
            </div>
            <RangeInput
              min={0}
              max={359}
              value={hueGuess}
              onValue={setHueGuess}
              className="flex-1"
              tabIndex={-1}
              disabled={isDisplayingResult}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Label className="w-28 flex-shrink-0" htmlFor="saturation">
              Saturation (%)
            </Label>
            <div className="md:w-36 flex-shrink-0">
              <Input
                type="number"
                id="saturation"
                value={saturationGuess}
                onValue={setSaturationGuess}
                min={0}
                max={100}
                step={1}
                required
                disabled={isDisplayingResult}
              />
            </div>
            <RangeInput
              min={0}
              max={100}
              value={saturationGuess}
              onValue={setSaturationGuess}
              className="flex-1"
              tabIndex={-1}
              disabled={isDisplayingResult}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <Label className="w-28 flex-shrink-0" htmlFor="brightness">
              Brightness (%)
            </Label>
            <div className="md:w-36 flex-shrink-0">
              <Input
                type="number"
                id="brightness"
                value={brightnessGuess}
                onValue={setBrightnessGuess}
                min={0}
                max={100}
                step={1}
                required
                disabled={isDisplayingResult}
              />
            </div>
            <RangeInput
              min={0}
              max={100}
              value={brightnessGuess}
              onValue={setBrightnessGuess}
              className="flex-1"
              tabIndex={-1}
              disabled={isDisplayingResult}
            />
          </div>
        </div>
        <div className="py-12">
          <Button
            className="w-full [view-transition-name:submit-btn]"
            type="submit"
            ref={submitButtonRef}
          >
            {state.mode === 'guess'
              ? 'Submit'
              : state.questionNum >= props.totalQuestion
              ? 'Get Marks'
              : 'Next'}
          </Button>
        </div>
      </form>
    </>
  );
}

export default App;
