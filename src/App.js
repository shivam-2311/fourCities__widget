import './App.css';
import sun from './images/frost.png'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from "./env";


function App() {
  const [ctime, setCtime] = useState();
  const [icon, setIcon] = useState('')
  const [temprarture, setTemprature] = useState('')
  const [aqi, setAirQuality] = useState('')
  // const [aqi, setAirQuality] = useState('')
  // const [aqi, setAirQuality] = useState('')
  // const [aqi, setAirQuality] = useState('')



  const updateTime = () => {
    var time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCtime(time);
  };
  setInterval(updateTime, 1000);

  const id = window.location.href.split("/")[5];

  useEffect(() => {
    const url = serverUrl + "/v1/widget/read/" + id;
    const fetchData = async (url) => {
      await axios.get(url).then((rsp) => {

        setIcon(rsp.data.payload.weather.weather[0].icon);
        setTemprature(rsp.data.payload.weather.main.temp);
        setAirQuality(rsp.data.payload.aqi.list[0].main.aqi);
      });
    };
    fetchData(url);
  }, [id]);


  return (
    <div className="container-fluid">
      <div className="row1">
        <h1>{ctime}</h1>
        <img src={sun} alt="sun" />
        <h1>20.02°C</h1>
      </div>
      <div className="row2">
        <h1>Air Quality Index</h1>
      </div>
      <div className="row3">
        <div className="box1">
          <h2 className='airQuality'>500</h2>
          <h2 className='airQuality__value'>Poor</h2>
          <h2 className='places'>Sector 92</h2>
          <h2 className='city'>Manesar</h2>

        </div>
        <div className="box2">
          <h2 className='airQuality'>350</h2>
          <h2 className='airQuality__value'>Moderate</h2>
          <h2 className='places'>Okhla</h2>
          <h2 className='city'>Delhi</h2>
        </div>
      </div>
      <div className="row4">
        <div className="box3">
          <h2 className='airQuality'>180</h2>
          <h2 className='airQuality__value'>Good</h2>
          <h2 className='places'>Indrapuram</h2>
          <h2 className='city'>Delhi</h2>
        </div>
        <div className="box4">
          <h2 className='airQuality'>270</h2>
          <h2 className='airQuality__value'>Very Poor</h2>
          <h2 className='places'>Anand Vihar</h2>
          <h2 className='city'>Delhi</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
