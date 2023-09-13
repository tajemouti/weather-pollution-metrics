import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL, API_KEY } from '../api';
import { setCity } from '../redux/city/citySlice';

const City = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const { state: selectedState, city: selectedCity } = useParams();

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}/city?city=${selectedCity}&state=${selectedState}&country=Canada&key=${API_KEY}`);

    const data = await response.json();
    dispatch(setCity(data.data));
  }, [dispatch, selectedState, selectedCity]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedState, selectedCity]);

  const { current } = city;

  return (
    <div>
      <Link to={`/${selectedState}`}>Back</Link>
      <h2>{`${selectedCity} air pollution details`}</h2>
      <article className="details">
        <div>
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
        </div>
        <div>
          <h3>Pollution Details</h3>
          <p>
            Air Quality Index (AQI):
            {current.pollution.aqius}
          </p>
          <p>
            Main Pollutant:
            {current.pollution.mainus}
          </p>
        </div>
      </article>
    </div>
  );
};

export default City;
