import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  useEffect(() => {
    console.log(value);
  }, []);
  return (
    <div>
      <p>
        qwe <code> asd </code>
      </p>
    </div>
  );
}

export default App;
