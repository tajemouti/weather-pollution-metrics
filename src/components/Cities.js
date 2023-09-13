import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL, API_KEY } from '../api';
import { setCities } from '../redux/cities/citiesSlice';

const Cities = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const { state: selectedState } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/cities?state=${selectedState}&country=Canada&key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      dispatch(setCities(data.data));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [dispatch, selectedState]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedState]);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchData();
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return (
        <>
          <p>Error fetching data. Please try again.</p>
          <button type="button" onClick={retryFetch}>
            Retry
          </button>
        </>
      );
    }
    return (
      <ul className="items">
        {cities.map((city) => (
          <li key={city.city}>
            <Link to={`/${selectedState}/${city.city}`} className="item-link">
              {city.city}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Link to="/">Back</Link>
      {renderContent()}
    </>
  );
};

export default Cities;
