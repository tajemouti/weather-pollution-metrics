import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaAngleLeft, FaArrowRight } from 'react-icons/fa6';
import { API_BASE_URL, API_KEY } from '../api';
import { setCities } from '../redux/cities/citiesSlice';
import Search from './Search';

const Cities = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const { state: selectedState } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCities, setFilteredCities] = useState([]);

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
      setFilteredCities(data.data);
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

  const handleSearch = (query) => {
    const filtered = cities.filter((city) => city.city.toLowerCase().includes(query.toLowerCase()));
    setFilteredCities(filtered);
  };

  const renderContent = () => {
    if (loading) {
      return <p className="loading">Loading...</p>;
    }
    if (error) {
      return (
        <div className="error">
          <p>Error fetching data. Please try again.</p>
          <button type="button" onClick={retryFetch}>
            Retry
          </button>
        </div>
      );
    }
    return (
      <ul className="items">
        {filteredCities.map((city) => (
          <li key={city.city} className="flex">
            <Link to={`/${selectedState}/${city.city}`} className="item-link flex">
              <span>{city.city}</span>
              <FaArrowRight className="arrow-right" />
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <nav className="navbar flex">
        <Link to="/" className="back">
          <FaAngleLeft className="arrow-left" />
        </Link>
        <h2>{`${selectedState} cities`}</h2>
        <Search onSearch={handleSearch} />
      </nav>
      {renderContent()}
    </>
  );
};

export default Cities;
