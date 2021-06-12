import { useState } from 'react';
import styled, { css } from 'styled-components';
import allWordsRaw from './words.js';

const AppCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  background: #aaa;
`;

// const CaptureDiv = styled.div`
//   margin: 1em 1rem;

//   &:focus,
//   &:focus-within {
//     border: 1px solid blue;
//   }
// `;

const WordCtn = styled.div`
  margin: 0 0;
  line-height: 2em;
  height: 2em;
  font-size: 1.5em;

  ${(props) =>
    props.current &&
    css`
      width: auto;
      min-width: auto;
      overflow: visible;
      margin-right: 0;
      padding-right: 0;
      color: blue;
    `}

  ${(props) =>
    props.complete &&
    css`
      color: #888;
      text-align: right;
      border-right: 1px solid black;
    `}

    ${(props) =>
    props.incorrect &&
    css`
      text-decoration: line-through;
      color: red;
    `}
`;

const WordListCtn = styled.div`
  overflow: hidden;
  /* text-align: right; */
  line-height: 2em;
  height: 4em;
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: auto;
  max-width: 40%;

  ${WordCtn} {
    margin-left: 1ch;
  }

  ${(props) =>
    props.complete &&
    css`
      justify-content: right;
      color: green;
      margin-left: auto;
      margin-right: 0;

      ${WordCtn} {
        margin-right: 1ch;
        margin-left: 0;
      }
    `}
`;

const CurrentWordCtn = styled.div`
  display: flex;
  flex-grow: 0;
  /* width: 20%; */
  justify-content: center;
  border-bottom: 3px solid blue;
  padding: 0.5em 0.5rem;
`

const Ctn = styled.div`
  margin: 1em 1rem;
  padding: 5em 1rem;
  background: #fff;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus,
  &:focus-within {
    border: 1px solid blue;
  }
`;

function isAlpha(charCode) {
  const zeroCharCode = 48;
  const zCharCode = 90;
  return charCode >= zeroCharCode && charCode <= zCharCode;
}

function Word({ current, complete, incorrect }) {
  return (
    <WordCtn key={current} complete={complete} incorrect={incorrect}>
      {current}
    </WordCtn>
  );
}

function WordList({ words, complete }) {
  console.log(words);
  return (
    <WordListCtn key={Math.random()} complete={complete}>
      {words.map((word) => (
        <Word
          key={word.full}
          full={word.full}
          current={complete ? word.current : word.full}
        />
      ))}
    </WordListCtn>
  );
}

function CurrentWord({ word }) {
  const fullWord = word.full;
  const currentWordVal = word.current;
  const todoComps = fullWord.split(currentWordVal);
  if (currentWordVal) {
    todoComps.shift();
  }

  return (
    <CurrentWordCtn>
      <WordCtn
        key={`cur_${currentWordVal}`}
        incorrect={!fullWord.startsWith(currentWordVal)}
        current
        complete
      >
        {currentWordVal}
      </WordCtn>
      <WordCtn key={fullWord} current>
        {todoComps.join(currentWordVal)}
      </WordCtn>
    </CurrentWordCtn>
  );
}

function CaptureDiv({
  currentWord,
  completedWords,
  todoWords,
  handleKeypress,
}) {
  const fullWord = currentWord.full;
  const currentWordVal = currentWord.current;
  const todoComps = fullWord.split(currentWordVal);
  if (currentWordVal) {
    todoComps.shift();
  }
  console.log(fullWord.split(currentWordVal, 1).join(''));
  return (
    <>
      <Ctn key="target" tabIndex="0" onKeyDown={handleKeypress}>
        <WordList complete={true} key="completedWords" words={completedWords} />
        <CurrentWord word={currentWord} />
        <WordList
          complete={false}
          key="todoWords"
          words={todoWords.slice(0, 10)}
        />
      </Ctn>
    </>
  );
}

// function handleKeypress(e) {
//   e.preventDefault();
//   console.log(e.key);
// }

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false;
  let allWords = allWordsRaw.map((word) => ({ full: word, current: '' }));
  const firstWord = allWords.shift();
  console.log(firstWord);
  const [words, setWords] = useState({
    complete: ['test'],
    todo: allWords,
    currentWord: firstWord,
  });
  console.log('words');
  console.log(words);
  function handleKeypress(e) {
    e.preventDefault();
    console.log(e);
    const currentWord = words.currentWord;
    if (e.key === 'Backspace') {
      currentWord.current = currentWord.current.substring(
        0,
        currentWord.current.length - 1
      );
    } else if (e.key === ' ') {
      console.log('spacing');
      const newCurrent = words.todo.splice(0, 1)[0];
      console.log(newCurrent);
      setWords({
        complete: [...words.complete, currentWord],
        currentWord: newCurrent,
        todo: words.todo,
      });
      return;
    } else if (!isAlpha(e.which)) {
      return true;
    } else {
      currentWord.current = `${currentWord.current}${e.key}`;
    }
    setWords({
      currentWord,
      ...words,
    });
  }

  return (
    <AppCtn className="App">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CaptureDiv
          currentWord={words.currentWord}
          completedWords={words.complete}
          todoWords={words.todo}
          handleKeypress={handleKeypress}
        />
      )}
    </AppCtn>
  );
}

export default App;
