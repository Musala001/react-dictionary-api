import { useState } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!word.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) throw new Error('Word not found');
      const data = await response.json();
      setResult(data[0]); // take the first result
    } catch (err) {
      setError(err.message || 'Failed to fetch definition');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Dictionary Lookup</h1>

      <div className="input-box">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          <h2>{result.word}</h2>
          {result.meanings.map((meaning, i) => (
            <div key={i}>
              <h4>{meaning.partOfSpeech}</h4>
              <ul>
                {meaning.definitions.map((def, j) => (
                  <li key={j}>{def.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
