import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL, API_KEY } from '../api';
import { setCity } from '../redux/city/citySlice';

const City = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const { state: selectedState, city: selectedCity } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/city?city=${selectedCity}&state=${selectedState}&country=Canada&key=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      dispatch(setCity(data.data));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [dispatch, selectedState, selectedCity]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedState, selectedCity]);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchData();
  };

  const renderContent = () => {
    if (loading) {
      return <p className="loading">Loading...</p>;
    }
    if (error) {
      return (
        <div className="error">
          <p>Error fetching data. Please try again.</p>
          <button type="button" onClick={retryFetch}>Retry</button>
        </div>
      );
    }
    const { current } = city;
    return (
      <div className="container">
        <nav className="navbar flex">
          <Link to={`/${selectedState}`} className="back">Back</Link>
          <h2>{`${selectedCity} weather and air pollution details`}</h2>
        </nav>
        <article className="details">
          <h3>Pollution Details</h3>
          <p>
            Air Quality Index (AQI):
            {current.pollution.aqius}
          </p>
          <p>
            Main Pollutant:
            {current.pollution.mainus}
          </p>
          <h3>Weather Details</h3>
          <p>
            Temperature:
            {current.weather.tp}
            °C
          </p>
          <p>
            Pressure:
            {current.weather.pr}
            {' '}
            hPa
          </p>
          <p>
            Humidity:
            {current.weather.hu}
            %
          </p>
        </article>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default City;
