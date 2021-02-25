import React, {useEffect} from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { weatherGet } from '../Redux/Weather/reducer';
import Weather from './Weather'

function WeatherContainer() {


    const dispatch = useDispatch();
    const {data, pending, error} = useSelector( state => ({
        data : state.reducer.data,
        pending : state.reducer.pending,
        error : state.reducer.error
    }),
    shallowEqual
    )
    

    useEffect(() => {
        dispatch(weatherGet())
    }, [dispatch])

    console.log("이것이 데이터임",data)
    console.log(pending)

    if (pending) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

    return (
        <div style = {{width : "80%"}}>
            <Weather data = {data}/>
        </div>
    )
}

export default WeatherContainer
