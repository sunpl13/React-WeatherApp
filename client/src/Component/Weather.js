import {React, useState} from 'react'
import Forecast from './Forecast'
import '../Scss/weather.scss';

export default function Weather(props) {


  const city = "Seoul";
  const {data} =props;                                          //weather-container 
  console.log("웨더 데이터",data)
    const {REACT_APP_WEATHER_IMG} = process.env;                 //api 키 할당
    const [getDate, setgetDate] = useState(new Date());



    const date = () => {                                                                        //현재 시간 포맷 함수
      const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      let today = getDate;
      let month = today.getMonth() + 1;
      let date = today.getDate();
      let day = today.getDay();
      let hour = today.getHours();
      let minutes = today.getMinutes();
 
      return (<span className ="Now_time">{month}월{date}일 {week[day]} { hour > 12 ? "오후" : "오전"} {hour}:{minutes}</span>)
    }

  const imgApi = `${REACT_APP_WEATHER_IMG}/${data.img}@2x.png`

    return (
        <div className = "WeatherBox">
          <div className = "title_area">
          <em>{city}</em>
            {date()}
          </div>
            <div className = "Weather_info">
                <div className = "temp">
                    <img src = {imgApi}/>
                    <span className = "todaytemp">{data.temp}</span><span className="tempmark">°C</span>
                </div>
                <dl className = "description">
                  <dt>날씨</dt>
                  <dd className = "w_d">{data.desc}</dd>
                    <dt>최고</dt>
                    <dd className = "max_t">{data.maxTemp}°</dd>
                    <dt>최저</dt>
                      <dd className = "mix_t">{data.minTemp}°</dd>
                </dl>
            </div>

            <div className = "daily_forecast"><Forecast/></div>
        </div>
    )
}