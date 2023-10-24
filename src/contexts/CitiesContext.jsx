import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await axios(`${BASE_URL}/cities`);
        const data = await res.data;
        setCities(data);
        console.log("fetchCities() data:", data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(cityId) {
    try {
      setIsLoading(true);
      const res = await axios(`${BASE_URL}/cities/${cityId}`);
      const data = await res.data;
      setCurrentCity(data);
      console.log("getCity(id) data:", data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/cities`, newCity);
      const data = await res.data;
      // setCurrentCity(data);
      console.log("createCity(newCity) data:", data);
      // fetchCities();
      //the long way would be this:
      setCities((currCities) => [...currCities, data]);
    } catch {
      alert("There was an error creating city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(cityId) {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${BASE_URL}/cities/${cityId}`);

      setCities((currCities) => {
        return currCities.filter((city) => {
          return city.id !== cityId;
        });
      });
    } catch {
      alert("There was an error deleting city...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
