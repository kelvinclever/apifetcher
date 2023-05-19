import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [searchParam, setSearchParam] = useState('');
  const [universities, setUniversities] = useState([]);
  const [validCountry, setValidCountry] = useState(true);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${searchParam}`
      );
      const data = await response.json();
      if (data.length === 0) {
        setValidCountry(false);
      } else {
        setUniversities(data);
        setValidCountry(true);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const clearPage = () => {
    setSearchParam('');
    setUniversities([]);
    setValidCountry(true);
  };

  return (
    <div>
      <div className='navbar'>
        <input
          type='text'
          placeholder='Enter a country name'
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={clearPage}>Clear</button>
      </div>

      {validCountry ? (
        <div className='grid-container'>
          {universities.map((university) => (
            <div key={university.name} className='country'>
              <h3>{university.name}</h3>
              <p>Domain: {university.domains.join(', ')}</p>
              <p>
                Website:{' '}
                <a href={university.web_pages[0]} target='_blank' rel='noreferrer'>
                  {university.web_pages[0]}
                </a>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Invalid country name. No universities found.</p>
          <h1>Opps!!!!</h1>
        </div>
      )}
    </div>
  );
};

export default App;
