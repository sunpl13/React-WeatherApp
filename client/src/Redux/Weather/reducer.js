import axios from "axios"
import * as types from './actionType'
import {handleActions} from 'redux-actions'

const city = "Seoul";
const initialState = {
    pending : false,
    error : false,
    data : {
        temp:'',
        desc:'',
        img :'',
        minTemp:'',
        maxTemp:''
    }
}


function getApi() {
    return axios.get(`${process.env.REACT_APP_WEATHER}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);                 //api 값 받아오는 함수
}
//Action
export const weatherGet = () => async (dispatch) => {

    dispatch({type : types.GET_WEATHER_PENDING});                       //로딩 중일 때 보낼 액션

try{
    const response = await getApi();                                    //api에서 값을 받아왔을 때 보낼 액션
        console.log(response)
        dispatch({
            type : types.GET_WEATHER_SUCCESS,
            payload : response.data
        })
    } catch(error) {                                                    //값 받아오기에 했을 때의 액션
        console.log(error)
        dispatch({
            type : types.GET_WEATHER_FAIL,
            payload : error
        });
        throw error;
    }
}

//reducer
export default handleActions({                                          
    [types.GET_WEATHER_PENDING] : (state, action) => {                  //로딩 중일 때 pending 값을 true로 바꿈             하나의 요청에는 3가지의 액션 타입이 필요
        console.log("pending data");
        return{
            ...state,
            pending : true,
            error : false
        };
    },
    [types.GET_WEATHER_SUCCESS] : (state, action) => {                  //데이터를 받으면 값을 데이터에 저장
        const temp = action.payload.main.temp.toFixed();
        const desc = action.payload.weather[0].description;
        const img = action.payload.weather[0].icon;
        const minTemp = action.payload.main.temp_min.toFixed();
        const maxTemp = action.payload.main.temp_max.toFixed();
        return {
            ...state,
            pending : false,
            data : {
                temp : temp,
                desc : desc,
                img : img,
                minTemp :minTemp,
                maxTemp : maxTemp,
            }
        };
    },
    [types.GET_WEATHER_FAIL] : (state, action) => {                         //실패 시에 리턴값
        return {
            ...state,
            pending: false,
            error: true,
        };
    },
    
}, initialState);
