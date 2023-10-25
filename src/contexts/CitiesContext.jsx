import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

// const BASE_URL = "http://localhost:8000";

const BASE_URL = "https://my-json-server.typicode.com/cherrydub/worldwiseapi";

const intitialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    intitialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await axios(`${BASE_URL}/cities`);
        const data = await res.data;
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(cityId) {
    if (Number(cityId) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await axios(`${BASE_URL}/cities/${cityId}`);
      const data = await res.data;
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.post(`${BASE_URL}/cities`, newCity);
      const data = await res.data;
      dispatch({ type: "city/created", payload: data });
      toast.success("City added!");
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.delete(`${BASE_URL}/cities/${cityId}`);
      dispatch({ type: "city/deleted", payload: cityId });
      toast.success("City deleted!");
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
