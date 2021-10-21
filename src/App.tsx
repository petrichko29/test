// React
import { FC, useEffect, useState } from "react";

// Libraries
import  axios from "utils/axios-instance"
import { Slider } from "@mui/material";

// Constants
import { ROUTES } from "api/routes-api";

// Styles
import "./App.css";

const POSITION_STEP = 0.4;
const MIN_TEMP = -10;
const MAX_TEMP = 30;

const App: FC = () => {
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const [temperature, setTemperature] = useState<number | Array<number>>(10);
  const [position, setPosition] = useState<number>(10);

  const handlePermission = () => {
    navigator.geolocation.getCurrentPosition((data: GeolocationPosition) => {
      setCoords(data.coords);
    });
  }

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setTemperature(newValue);
  };

  useEffect(() => {
    const value = (temperature as number) + Math.abs(MIN_TEMP);

    setPosition(value / POSITION_STEP);
  }, [temperature]);

  useEffect(() => {
    handlePermission()
  }, [])

  useEffect(() => {
    const getWeatherByCoords = async () => {
      const { data }: any = await axios.get(ROUTES.weatherByCoords(coords));
      setTemperature(data.main.temp as number);
    }

    if (coords) getWeatherByCoords();
  }, [coords])


  return (
    <div className="App" style={{ backgroundPosition: `${position}%, 0%`}}>
      <div className="App__Slider">
        <Slider
          aria-label="Temperature"
          min={MIN_TEMP}
          max={MAX_TEMP}
          defaultValue={10}
          color="secondary"
          onChange={handleSliderChange}
        />
      </div>

      <div className="App__Container">
        <div className="title">
          Location service
        </div>

        <div className="content">
          Now temperature is {temperature}°C
        </div>
      </div>


    </div>
  );
};

export default App;
