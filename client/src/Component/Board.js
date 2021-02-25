import {React, useEffect, useState} from 'react'
import '../Scss/board.scss'
import {CKEditor} from '@ckeditor/ckeditor5-react'                                  //ck에디터
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'                       //ck에디터
import  ReactHtmlParser from 'react-html-parser'
import axios from 'axios'
import { FaTimes } from "react-icons/fa";


function Board(props) {

    const {show, onclose, date} = props;

    const {REACT_APP_URL} = process.env
    const [boardContent, setboardContent] = useState({
        title : '',
        content : "",
        day : ""
    })

    const onChange = e => {
        const{name, value} = e.target;
        setboardContent({
            ...boardContent,
            [name] : value
        })
        console.log(name, value)
    }

    const sendContent = () => {                                             //버튼 클릭시 DB에 데이터 저장
        axios.post(`${REACT_APP_URL}/todo/insert`, {
            title : boardContent.title,
            content : boardContent.content,
            day : date
        })
        .then(() => {
            alert("등록이 완료 되었습니다.")
        })
    }

    

    return (
            <div  style = {{
            opacity : show ? '1' : '0',
            transform : show ? 'translate(0vh)' : 'translate(-100vh)'
        }}
            className ="board-wrapper">
                            <FaTimes onClick = {onclose} style = {{float : 'right'}}/>
            <div className = "input_wrapper">
                <span>날짜 : {date}</span>
                <input className = "title_input" type = "text" placeholder = "제목" onChange ={onChange} name = "title"/>
                <CKEditor
                editor = {ClassicEditor}
                data = ""
                onReady = {editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange = {(event, editor) => {
                    const data = editor.getData();
                    console.log({event, editor, data});
                    setboardContent({
                        ...boardContent,
                        content : data
                    })
                }}
                onBlur = {(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus = {(event, editor) => {
                    console.log('Focus.', editor)
                }}
                />
                <div className = "btn-loaction">
                <button className = "submit" onClick = {sendContent}>입력</button>
                <button className = "cancle" onClick = {onclose}>취소</button>
                </div>
            </div>
            </div>   
    )
}

export default Board
