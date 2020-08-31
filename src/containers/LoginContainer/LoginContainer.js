import React, {useState} from 'react';
import './LoginContainer.css';
import axios from "axios";
import {useHistory} from "react-router-dom";

const LoginContainer = (props) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();


    const loginClickHandler = () => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/login',
            data: {"email": email, "password": password},
        })
            .then(response => {
                //handle success
                //console.log(response.data);
                setErrorMsg("Logged in");
                localStorage.setItem('usertoken', response.data['access_token']);
                props.setIsAuthorized(true);
                history.push('/admin');
            })
            .catch(error => {
                //handle error
                setErrorMsg(error.response.data);
            });
    };

    const inputChangeHandler = (e) => {
        switch (e.target.id) {
            case "login-email":
                setEmail(e.target.value);
                break;
            case "login-password":
                setPassword(e.target.value);
                break;
            default:
        }
    };


    return <div id={"login-container"}>
        <input
            id={"login-email"}
            className={"login-container-item"}
            placeholder={"email"}
            onChange={inputChangeHandler}
        />
        <input
            id={"login-password"}
            className={"login-container-item"}
            placeholder={"password"}
            onChange={inputChangeHandler}
        />

        <button onClick={loginClickHandler} className={"login-container-item"}>Login</button>
        <div className={"login-container-item"}>{errorMsg}</div>
    </div>
};

export default LoginContainer;

