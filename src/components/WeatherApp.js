import styles from "./WeatherApp.module.css";
import { UilSearch, UilWind, UilWater } from "@iconscout/react-unicons";
import { useEffect, useRef, useState } from "react";

const WeatherApp = (props) => {
  const [dataObj, setDataObj] = useState({});
  const [isMobile, setIsMobile]  = useState(false);
  const cityInputRef = useRef("");

  const API_KEY = "40dafa1c73c75d6feec1caa4fe606538";

  useEffect(() => {

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 450) {
        setIsMobile(true);
      }
    });

    const getInfo = async () => {
      const fetchedInfo = await fetchInformation("Baku");
      setDataObj(fetchedInfo);
    };

    getInfo();

    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth <= 450) {
          setIsMobile(true);
        }
      });
    }
  }, [cityInputRef]);

  const fetchInformation = async (city) => {
    try {

    } catch {
      alert("An error occured while fetching data!");
    }

    const repsonse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${API_KEY}&units=metric`
    );
    const data = await repsonse.json();
    return data;
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const searchedCity = cityInputRef.current.value;
    cityInputRef.current.value = "";

    const fetchedData = await fetchInformation(searchedCity);

    setDataObj(fetchedData);
  };

  const { weather, main, wind, name, dt, timezone } = dataObj;
  const weatherIcon = weather?.[0]?.icon || "";
  const weatherDesc = weather?.[0].main || "";
  const temp = Math.round(main?.temp) || "";
  const humidity = main?.humidity;
  const speed = Math.round(wind?.speed);



  return (
    <div className={styles.container}>
      <form className={styles["top-bar"]} onSubmit={searchHandler}>
        <input
          type="text"
          className={styles["city-input"]}
          placeholder="Search city..."
          ref={cityInputRef}
        />
        <button className={styles["search-icon"]}>
          <UilSearch />
        </button>
      </form>

 

      <div className={styles["weather-image"]}>
        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
        <p>{weatherDesc}</p>
      </div>

      <div className={styles["weather-temp"]}>{temp}°c</div>

      <div className={styles["weather-location"]}>{name}</div>

      <div className={styles["data-container"]}>
        <div className={styles.element}>
          {isMobile && <UilWater className={styles.icon} size={40} />}
          {!isMobile && <UilWater className={styles.icon} size={50} />}
          <div className={styles.data}>
            <div className={styles["humidity-percent"]}>{humidity}%</div>
            <div className={styles.text}>Humidity</div>
          </div>
        </div>
        <div className={styles.element}>
          {isMobile && <UilWind className={styles.icon} size={40} />}
          {!isMobile && <UilWind className={styles.icon} size={50} />}
          
          <div className={styles.data}>
            <div className={styles["humidity-percent"]}>{speed} km/h</div>
            <div className={styles.text}>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
