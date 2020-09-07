import React, { useReducer } from "react";
import "../../styles/App.css";
import { fetchWeather } from "../../api/fetchWeather";

const App = () => {
  const [{ query, weather }, dispatch] = useReducer(reducer, initialState);

  const setQuery = (e) => {
    dispatch({
      type: ACTIONS.SET_QUERY,
      query: e.target.value,
    });
  };

  const search = async (e) => {
    if (e.key === "Enter") {
      // checking if user pressed enter
      const data = await fetchWeather(query);

      dispatch({
        type: ACTIONS.SET_WEATHER,
        weather: data,
      });

      dispatch({ type: ACTIONS.SET_QUERY, query: "" });
    }
  };

  return (
    <div className="main-container">
      <input
        className="search"
        placeholder="Search..."
        value={query}
        onChange={setQuery}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country} </sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className='info'>
            <img className='city-icon' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
        </div>
        </div>
      )}
    </div>
  );
};

export default App;

// State
const initialState = {
  query: "",
  weather: {},
};

const ACTIONS = {
  SET_QUERY: "SET_QUERY",
  SET_WEATHER: "SET_WEATHER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case ACTIONS.SET_WEATHER:
      return {
        ...state,
        weather: action.weather,
      };
  }
};
