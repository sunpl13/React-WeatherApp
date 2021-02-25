import axios from 'axios';
import * as types from './actionType'




const getWeatherPending = () => {
    return {
        type : types.GET_WEATHER_PENDING
    }
}
const getWeatherSuccess = () => {
    return {
        type : types.GET_WEATHER_SUCCESS
    }
}
const getWeatherFail = () => {
    return {
        type : types.GET_WEATHER_FAIL
    }
}



//WEATHER_APP action
/*export const getWeather = () => dispatch => {
    dispatch({type : GET_WEATHER_PENDING});

    try {
        const response = axios.get(`${process.env.REACT_APP_WEATHER}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        dispatch({
            type: GET_WEATHER_SUCCESS,
            payload : response.data
        });
    } catch (err) {
        dispatch({
            type : GET_WEATHER_FAIL,
            payload : err,
        });
        throw err;
    }
};*/

const initialState = {
    pendig : false,
    error : false,
    data : {
        temp:'',
        desc:'',
        img :'',
        minTemp:'',
        maxTemp:''
    }
}