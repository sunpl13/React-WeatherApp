import axios from 'axios';

const DOMAIN = process.env.REACT_APP_URL                    //서버 URL 가져오기
axios.defaults.withCredentials = true;                      //쿠키데이터 전송받기 위해
export const request = (method, url, data) => {
    return axios({
        method,
        url : DOMAIN + url,
        data,
    })
    .then(res => {
        res.data
    })
    .catch(err => {
        console.log(err)
    })
};