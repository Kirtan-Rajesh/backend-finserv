import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Validate and parse JSON input
      let parsedData;
      try {
        parsedData = JSON.parse(jsonInput);
      } catch (e) {
        throw new Error('Invalid JSON format. Please use standard double quotes.');
      }

      const response = await fetch('https://21brs1148jsoneditor.netlify.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData.data }), // Ensure `data` field is properly passed
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      setResponseData(null);
      setError(error.message);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      e.target.checked
        ? [...selectedOptions, value]
        : selectedOptions.filter((option) => option !== value)
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>JSON Data Processor</h1>
      </header>
      <form onSubmit={handleSubmit} className="form-container">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter your JSON data here"
          className="json-input"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {responseData && (
        <div className="response-container">
          <div className="dropdown">
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_lowercase_alphabet"
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>
          <div className="response-output">
            {selectedOptions.includes('numbers') && (
              <div>
                <strong>Numbers:</strong> {JSON.stringify(responseData.numbers)}
              </div>
            )}
            {selectedOptions.includes('alphabets') && (
              <div>
                <strong>Alphabets:</strong> {JSON.stringify(responseData.alphabets)}
              </div>
            )}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <div>
                <strong>Highest Lowercase Alphabet:</strong>{' '}
                {JSON.stringify(responseData.highest_lowercase_alphabet)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
