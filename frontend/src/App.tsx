import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:8080/api')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {!data ? 'Loading...' : <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      </header>
    </div>
  );
}

export default App;
