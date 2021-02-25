import {React, useState} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

function Register(props) {

    const style = {
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
    }

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfrim, setPasswordConfrim] = useState("");

    const EmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    };
    const NameHandler = (e) => {
        setName(e.currentTarget.value)
    };
    const PasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    };
    const PasswordConfrimHandler = (e) => {
        setPasswordConfrim(e.currentTarget.value)
    };
    const SubmitHandler =(e) => {
        e.preventDefault();
    };

    const register = () => {                                                //회원정보를 서버에 전송
        axios.post(`${process.env.REACT_APP_URL}/register`, {
            name : Name,
            email : Email,
            password : Password,
            password_check : PasswordConfrim
        })
        .then((response) => console.log(response));
    }
 
    return (
        <div style ={style}>
            <form onSubmit ={SubmitHandler} style = {{display : "flex", flexDirection : "column"}}>
                <label>Email</label>
                <input type = "email" value = {Email} onChange = {EmailHandler}/>

                <label>Name</label>
                <input type = "text" value = {Name} onChange = {NameHandler}/>

                <label>Password</label>
                <input type = "password" value = {Password} onChange = {PasswordHandler}/>

                <label>PasswordConfrim</label>
                <input type = "Password" value = {PasswordConfrim} onChange = {PasswordConfrimHandler}/>
                <br/>
                <button type = "submit" onClick ={register}>회원가입</button>
            </form>
        </div>
    )
}

export default withRouter(Register);
