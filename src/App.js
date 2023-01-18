import "./App.css";
import ContexState from "./components/contexState";
import { Search } from "./components/weather/search";
import { Result } from "./components/weather/result";
import { useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);

  const changeSearch = (value) => {
    setSearch(value);
  };

  // const getWetherData = () => {
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3265874a2c77ae4a04bb96236a642d2f&units=metriczzz`
  //     )
  //     .then((responce) => {
  //       console.log("responce", responce);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  const searchWeatherHandler = () => {
    if (search !== "") {}
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3265874a2c77ae4a04bb96236a642d2f&units=metriczzz`
        )
        .then((responce) => {
          console.log("responce", responce);
        })
        .catch((err) => {
          console.log("err", err);
        });
    
  };

  return (
    <div>
      <ContexState>
        <Search serchData={search} eventHandler={changeSearch} />
        <Result wetherData={weather} searchWeather={searchWeatherHandler} />
      </ContexState>
    </div>
  );
}

export default App;
