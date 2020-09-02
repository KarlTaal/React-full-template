import React from 'react';
import './HomePageContainer.css';
import {Link} from 'react-router-dom';
import {useHistory} from "react-router-dom";
import axios from "axios";


const HomePageContainer = (props) => {
    const history = useHistory();

    const logoutHandler = () => {
        history.push('/');
        props.setIsAuthorized(false);
        localStorage.removeItem('identity');
        axios.get('http://127.0.0.1:5000/logout',
            {
                headers: {"Authorization": `Bearer ${localStorage.getItem('usertoken')}`}
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            {
                props.isAuthorized ?
                    <div style={{position: "absolute", display: "flex", width: "100%",height:"20%", alignItems:"center", justifyContent: "center"}}>
                        <div>Logged in</div>
                        <button onClick={logoutHandler}>Logout</button>
                    </div>
                    :
                    <div style={{position: "absolute", display: "flex", width: "100%",height:"20%", alignItems:"center", justifyContent: "center"}}
                    >
                        <div>Logged out</div></div>
            }
            <div id={"home-page-container"}>
                <Link to={"/login"}>Login</Link>
                <Link to={"/register"}>Register</Link>
                <Link to={"/admin"}>Admin</Link>
            </div>
        </>
    )
};

export default HomePageContainer;

