import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, API_KEY } from '../api';

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStates = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/states?country=Canada&key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setStates(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const renderStates = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return (
        <div>
          <p>Error fetching data. Please try again.</p>
          <button type="button" onClick={fetchStates}>
            Retry
          </button>
        </div>
      );
    }
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

  return (
    <div>
      <h2>Canadian States</h2>
      {renderStates()}
    </div>
  );
};

export default States;
