import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.2s all;

  &:hover {
    background: palevioletred;
    color: white;
  }

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;

      &:hover {
        background: white;
        color: palevioletred;
      }
    `
  }
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => alert('heyo!')}>
          Press Me!
        </Button>
        <Button primary onClick={() => alert('heyo!')}>
          No, press Me!
        </Button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
