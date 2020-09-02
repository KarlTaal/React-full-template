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
                <div id={"home-page-links"}>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/register"}>Register</Link>
                    <Link to={"/admin"}>Admin</Link>
                </div>
                <div id={"home-page-information"}>
                    <p>&ordm; If You have an account, then You can login in th login page.</p>
                    <p>&ordm; If You don't have an account, then you can register an account in the register page.</p>
                    <p>&ordm; In admin page you can view the content of database and add values to the database. Logging in is required.</p>
                </div>
            </div>

        </>
    )
};

export default HomePageContainer;

