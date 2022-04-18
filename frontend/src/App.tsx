import React from 'react';
import './App.css';
import CatFact from './Models/CatFact';

function App() {
  const [data, setData] = React.useState<CatFact>({ fact: '', length: 0 });
  const [error, setError] = React.useState<string>();

  const getCatFact = async () => {
    try {
      const respFromApi = await fetch('https://catfact.ninja/fact');
      const data = await respFromApi.json();
      await sendCatFactToBackend(data);
    } catch (err: any) {
      setData({ fact: err.message, length: 0 });
      setError(err.message);
    }
  };

  const sendCatFactToBackend = async (data: CatFact) => {
    const respFromBackend = await fetch('http://localhost:8080/api/facts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const dataFromBackend = await respFromBackend.json();
    if (respFromBackend.status === 200) {
      setData(dataFromBackend);
      setError('');
    } else {
      throw new Error('Something went wrong');
    }
  };
  return (
    <div>
      <button onClick={getCatFact} data-testid="factButton">
        Save Cat Fact
      </button>
      {data.fact && (
        <pre data-testid="dataBlock">{JSON.stringify(data.fact, null, 2)}</pre>
      )}
      {error && <pre data-testid="errorBlock">{error}</pre>}
    </div>
  );
}

export default App;
