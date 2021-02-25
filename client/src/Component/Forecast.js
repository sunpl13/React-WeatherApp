import {React,useEffect, useState} from 'react'
import axios from 'axios'
import '../Scss/forecast.scss';

export default function Forecast() {

    const city = "Seoul";
    const url = `${process.env.REACT_APP_FORECAST}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    const [Forecast, setForecast] = useState([])


      const arrTime = (item) => {                                 //시간을 구하기 위한 함수 생성
        const date = new Date(item * 1000)
        const arrTime = date.getHours()
        return arrTime
      }
   
    useEffect(() => {
        axios.get(url)
        .then(resData => {
          const data = resData.data;
          const list = data.list.slice(3,15)

 
          const arr = list.map((item) => (
            <div key={item.dt} className = "forecast-component">
              <span className = "f-time">{arrTime(item.dt) > 11 ? "오후" : "오전"} {arrTime(item.dt)}시</span>
             <img src = {`${process.env.REACT_APP_WEATHER_IMG}/${item.weather[0].icon}@2x.png`} width = "60px" height = "60px"/>
             <br/>
             <span>{item.main.temp.toFixed()}</span>
             <span className = "t_mark">°C</span>
             <div></div>
            </div> 
          ))
           setForecast(arr)
        })
        .catch(error => console.log(error));
      }, [])

    return (
        <div className = "forecast-container">
          {Forecast}
        </div>
    )
}