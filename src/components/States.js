import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_KEY } from '../api';

const States = () => {
  const [states, setStates] = useState([]);

  const fetchStates = async () => {
    const response = await fetch(
      `${API_BASE_URL}/states?country=Canada&key=${API_KEY}`,
    );
    const data = await response.json();
    setStates(data.data);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <ul className="items">
      {states.map((state) => (
        <li key={state.state}>
          <Link to={`/${state.state}`} className="item-link">
            {state.state}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default States;
