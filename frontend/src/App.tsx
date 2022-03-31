import React from 'react';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  const getData = () => {
    fetch('http://localhost:8080/api')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div>
      <button onClick={getData} data-testid="refreshButton">
        Refresh
      </button>
      {error && 'Error: ' + error}
      {data && (
        <pre data-testid="dataBlock">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
