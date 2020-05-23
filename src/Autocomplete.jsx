import React, { useState } from 'react';
import axios from 'axios';

const Autocomplete = () => {
  const [results, setResults] = useState(null)

  const search = async query => {
    const res = await axios(`http://localhost:3000/search?q=${query}`)
    setResults(res.data)
  }

  return (
    <div>
      <input type="text" onChange={ evt => search(evt.target.value) }/>
      { results && <ul className="results">
        { results.map(result =>
          <li key="">
          { result.name.first } { result.name.last }
        </li>) }
      </ul> }
    </div>
  )
}

export default Autocomplete;
