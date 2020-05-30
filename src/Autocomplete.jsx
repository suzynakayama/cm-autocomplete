import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  &, * { box-sizing: border-box;}
  ul {
    position: absolute;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 2px solid #eee;
    margin-top: -20px;
    padding-top: 20px;
    border-radius: 5px;
  }
  input {
    position: relative;
    z-index: 2;
  }
`;  

const Input = styled.input`
  height: 40px;
  width: 100%;
  border-radius: 20px;
  border: 2px solid #eee;
  outline: none;
  padding: 0 20px;
  font-size: 1.1rem;
  transition: all 0.1s;

  &:hover {
    border-color: #ddd;
  }

  &:focus {
    border-color: #0055ff;
    background: #fafafa;
  }
`;

const ResultItem = styled.li`
  display: flex;
  background: ${props => props.focus ? "#f0f0f0" : "white"};
  list-style: none;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  cursor: pointer;
  align-items: center;

  img {
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const Autocomplete = ({ onChange }) => {
  const [results, setResults] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const [query, setQuery] = useState('');
  const [value, setValue] = useState();
  const [focused, setFocused] = useState(false);

  const search = async query => {
    if (!query) return;
    const res = await axios(`http://localhost:3000/search?q=${query}`);
    setResults(res.data);
  };

  const handleKey = evt => {
    switch (evt.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        evt.stopPropagation();
        evt.preventDefault();

        let newIdx = hoveredIdx + (evt.key === "ArrowDown" ? 1 : -1);
        if (newIdx < 0) newIdx = results.length - 1;
        if (newIdx >= results.length) newIdx = 0;
        setHoveredIdx(newIdx);
        break;
      
      case 'Enter':
        if (results[hoveredIdx]) {
          select(results[hoveredIdx]);
          setFocused(false);
        }
        break;
      
      default:
        search(query);
        return;
    }
  }

  const select = result => {
    setValue(result);
  }

  const hide = () => {
    setTimeout(() => setFocused(false), 100);
  };
  
  useEffect(() => {
    if (!results) return;
    const current = results[hoveredIdx];
    setQuery(`${current.name.first} ${current.name.last}`);
  }, [hoveredIdx])

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  return (
    <Wrapper>
      <Input
        type="text"
        onChange={(evt) => setQuery(evt.target.value)}
        onKeyDown={handleKey}
        value={ query }
        onFocus={() => setFocused(true)}
        onBlur={hide}
      />
      {results && focused && (
        <ul className="results">
          {results.map((result, idx) => (
            <ResultItem
              key={idx}
              focus={idx === hoveredIdx}
              onMouseEnter={ () => setHoveredIdx(idx) }
              onClick={() => select(result)}
            >
              <img src={result.picture.thumbnail} />
              {result.name.first} {result.name.last}
            </ResultItem>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default Autocomplete;
