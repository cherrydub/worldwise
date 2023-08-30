import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

import Message from "./Message";
import CountryItem from "./CountryItem";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  const uniqueCountries = new Set();

  const countries = cities.reduce((arr, city) => {
    if (!uniqueCountries.has(city.country)) {
      uniqueCountries.add(city.country);
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}