import React, { useState } from "react";
import { render } from 'react-dom';
import Autocomplete from './Autocomplete';

const App = () => {
  const [value, setValue] = useState()
  return 
    <>
      <Autocomplete onChange={(val) => setValue(val)} />
      {value && (
        <p>
          <img src={value.picture.large} />
          <br />
          You selected {value.name.first} {value.name.last}
          <br />
          Their email is: {value.email}
        </p>
      )}
    </>;
}

render(
  <App />,
  document.getElementById('app')
);