import {React,useEffect,useState} from 'react'
import moment from 'moment'
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaPlus} from "react-icons/fa"
import '../Scss/calendar.scss';
import Board from './Board'
import axios from 'axios';


function Calendar() {


  const [show, setshow] = useState(false)           // 모달창을 위한 토글
  const onclose = () => {setshow(false)}            // 모달창 끄기
  const onopen = () => {                            // 모달창 열기
    setshow(true)
  }

    const [getMoment, setgetMoment] = useState(moment());
    const [title, settitle] = useState("")
    const [todoList, settodolist] = useState([]);

    const today = getMoment;
    const [cal, setcal] = useState(today.format('YYYY-MM-DD'))                    //캘린더 버튼을 클릭한 시점에 날짜값을 저장할 state
    const prev = () => {setgetMoment(getMoment.clone().subtract(1, 'month'))};  // ※그냥 moment를 수정하면 값이 수정되므로 clone으로 복사
    const next = () => {setgetMoment(getMoment.clone().add(1, 'month'))};
    const firstWeek = today.clone().startOf('month').week();                    //그 달의 시작하는 주
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();          //그 달의 끝나는 주 (moment는 다음년 첫주를 1로 표시하기 때문)

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_URL}/get/${cal}`)
      .then((response) => {
        settodolist(response.data)
      })
    }, [])

    
    const getData = (param) => {                                          //날짜에 따른 데이터를 받아옴
      setcal(param);
        axios.get(`${process.env.REACT_APP_URL}/get/${param}`)
        .then((response) => {
          settodolist(response.data);
          console.log(response)
        })
      }

      const deleteTodolist = (ID) => {                                    //데이터 삭제
        axios.post(`${process.env.REACT_APP_URL}/api/delete`,{
          id : ID
        });
        alert("삭제가 완료되었습니다.")
      }
  
      const [toggle, settoggle] = useState(false)

      const onUpdate = (ID) => {                                      //toggle을 해서 값이 참이면 데이터를 수정
        if(!toggle) {
          settoggle(true)
      } else {
        axios.post(`${process.env.REACT_APP_URL}/api/update`, {
          id : ID,
          title : title
      });
      settoggle(false)
      }
    }



    const list = () => {                                                                                            //데이터 출력 창
      if (todoList.length === 0) {
        return <span>값이 없습니다.</span>
      } else {
        return todoList.map(
      item => (
        <div key = {item.id}>
          <li>{toggle ? <input type = "text" onChange = {(e) => settitle(e.target.value)}/> : item.title}
          <button onClick = {() => {deleteTodolist(item.id)}}>삭제</button>
          <button onClick = {() =>onUpdate(item.id)}>{toggle ? "확인" : "수정"}</button>
          </li>

        </div>
      ))
    }
    }

     const calendarArr=()=>{
      

        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) {
          result = result.concat(
            <tr key={week}>
                {
                    Array(7).fill(0).map((data, index) => {                                                           //week수 만큼 7일 기준으로로 해서 반복하여 출력
                        let days = today.clone().startOf('year').week(week).startOf('week').add(index,'day');         //53번째주가 생길 수도 있으므로 연도를 지정
                        if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                            return(
                                <td key={index} style={{
                                   borderColor : days.format('YYYY-MM-DD') === cal ? "#2E9AFE" : 'gray',
                                  }} onClick = {() => getData(days.format('YYYY-MM-DD'))}>
                                  <span>{days.format('D')}</span>
                                </td> 
                            );
                          }else if(days.format('MM') !== today.format('MM')){
                            return(
                                <td key={index} style={{backgroundColor:'gray'}} onClick = {() => {console.log(days.format('YYYY-MM-DD'))}}>
                                  <span>{days.format('D')}</span>
                                </td>
                            );
                          }else{
                            return(
                                <td key={index} style = {{borderColor : days.format('YYYY-MM-DD') === cal ? "#2E9AFE" : 'gray'}}  onClick = {() => getData(days.format('YYYY-MM-DD'))}>
                                  <span>{days.format('D')}</span>
                                </td>
                            );
                          }
                    })
                }
            </tr>);
        }
        return result;
       }

    return (
        <div className = "Calendar">
                      {show ? <div onClick ={onopen} className = "back-drop"/> : null}
            <div className = "control">
                <FaAngleDoubleLeft className ="arrow" onClick = {prev}>이전달</FaAngleDoubleLeft>
                <span className = "month">{today.format('YYYY년 MM월')}</span>
                <FaAngleDoubleRight className = "arrow" onClick = {next}>다음달</FaAngleDoubleRight>
                <FaPlus className = "btn" onClick = {onopen}>추가</FaPlus>
            </div>
            <table>
                <tbody>
                   {calendarArr()}
                </tbody>
            </table>
      <Board show = {show} onclose = {onclose} date = {cal}/>
            <div className = "cal-list">
              {list()}
            </div>
        </div>
    )
}

export default Calendar
