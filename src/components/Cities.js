import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL, API_KEY } from '../api';
import { setCities } from '../redux/cities/citiesSlice';

const Cities = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const { state: selectedState } = useParams();

  const fetchData = useCallback(async () => {
    const response = await fetch(
      `${API_BASE_URL}/cities?state=${selectedState}&country=Canada&key=${API_KEY}`,
    );

    const data = await response.json();
    dispatch(setCities(data.data));
  }, [dispatch, selectedState]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedState]);

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

export default Cities;
