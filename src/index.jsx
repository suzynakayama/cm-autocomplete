import React, { useState } from "react";
import { render } from 'react-dom';
import Autocomplete from './Autocomplete';
import styled from "styled-components";

const Results = styled.p`
  position: relative;
  width: 50vw;
  margin: 0 auto;
  z-index: -2;
`;

const App = () => {
  const [value, setValue] = useState();
  return <>
      <Autocomplete onChange={(val) => setValue(val)} />
      {value && (
        <Results>
        <img src={ value.picture.large } style={{ borderRadius: '50%'}}/>
          <br />
          You selected {value.name.first} {value.name.last}
          <br />
          Their email is: {value.email}
        </Results>
      )}
    </>;
}

render(
  <App />,
  document.getElementById('app')
);