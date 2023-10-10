import { useEffect, useState } from "react";
import axios from "axios";

const Countries = ({ countries, filter }) => {
  if (countries.length === 0) return null;

  const [selectedCountry, setSelectedCountry] = useState(null);

  let filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <>
      {filtered.map((item, index) => {
        return (
          <div key={index}>
            {item.name.common}
            <button
              onClick={() => {
                setSelectedCountry(item);
              }}
            >
              show
            </button>
          </div>
        );
      })}
      <CountryInfo country={selectedCountry}></CountryInfo>
    </>
  );
};

const CountryWeather = ({ countryName }) => {
  const [weather, setWeather] = useState({ temp: 0, icon: "", wind: 0 });

  function kToC(k) {
    // Convert kelvin to celcius
    return Number.parseFloat(k - 273.15).toFixed(2);
  }

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=babd2876d8bd18cc2edf5ff02fad870f`
    )
    .then((resp) => {
      setWeather({
        icon: `https://openweathermap.org/img/wn/${resp.data.weather[0].icon}@2x.png`,
        temp: kToC(resp.data.main.temp),
        wind: resp.data.wind.speed,
      });
    });

  return (
    <>
      <h1>Weather in {countryName}</h1>
      <div>temperature {weather.temp} Celcius</div>
      <img src={weather.icon}></img>
      <div>wind {weather.wind} m/s</div>
    </>
  );
};

const CountryInfo = ({ country }) => {
  if (!country) return null;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
      <img
        style={{ width: "200px", height: "200px" }}
        src={country.flags.png}
        alt={country.flags.alt}
      />
      <CountryWeather countryName={country.name.common}></CountryWeather>
    </div>
  );
};

const CountryForm = ({ country, handleChange }) => {
  return (
    <div style={{ display: "flex" }}>
      <div>find countries</div>
      <form>
        <input value={country} onChange={handleChange} />
      </form>
    </div>
  );
};
const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((resp) => {
        setCountries(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <>
      <CountryForm country={country} handleChange={handleChange}></CountryForm>
      <Countries countries={countries} filter={country}></Countries>
    </>
  );
};

export default App;
