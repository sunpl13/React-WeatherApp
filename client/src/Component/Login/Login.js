import {React, useState} from 'react'
import {withRouter} from 'react-router-dom'

function Login() {

    const style = {
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
    }

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const EmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    };

    const PasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    };

    const SubmitHandler =(e) => {
        e.preventDefault();
    };
    return (
        <div style = {style}>
            <form style = {{display: "flex", flexDirection: "column"}} onSubmit = {SubmitHandler}>
                <label>Email</label>
                <input type = "email" value = {Email} onChange = {EmailHandler}/>

                <label>Password</label>
                <input type = "password" value = {Password} onChange = {PasswordHandler}/>
                <br/>
                <button type = "submit">Login</button>
            </form>
            
        </div>
    )
}

export default withRouter(Login);
