import React, {useState} from 'react';
import './RegisterContainer.css';
import axios from "axios";

const RegisterContainer = () =>{

    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");


    const registerClickHandler = ()=> {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/register',
            data: {"email":email, "password":password, "verify": verify}
        })
            .then(response => {
                //handle success
                setErrorMsg(response.data);
            })
            .catch(error => {
                //handle error
                console.log(error);
                setErrorMsg(error.response.data);
            });
    };

    const inputChangeHandler = (e) => {
        switch (e.target.id) {
            case "register-email":
                setEmail(e.target.value);
                break;
            case "register-password":
                setPassword(e.target.value);
                break;
            case "register-verify":
                setVerify(e.target.value);
                break;
            default:
        }
    };





    return <div id={"register-container"}>
        <input
            id={"register-email"}
            className={"register-container-item"}
            placeholder={"email"}
            onChange={inputChangeHandler}
        />
        <input
            id={"register-password"}
            className={"register-container-item"}
            placeholder={"password"}
            onChange={inputChangeHandler}
        />
        <input
            id={"register-verify"}
            className={"register-container-item"}
            placeholder={"verify password"}
            onChange={inputChangeHandler}
        />

        <button className={"register-container-item"} onClick={registerClickHandler}>Register</button>
        <div className={"register-container-item"}>{errorMsg}</div>

    </div>
};

export default  RegisterContainer;

