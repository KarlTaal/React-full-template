import React from 'react';
import './HomePageContainer.css';
import {Link} from 'react-router-dom';
import {useHistory} from "react-router-dom";


const HomePageContainer = (props) => {
    const history = useHistory();

    const logoutHandler = () => {
        history.push('/');
        props.setIsAuthorized(false);
    };
    return (
        <>
            {
                props.isAuthorized ?
                    <div style={{position: "absolute", display: "flex", width: "100%", justifyContent: "center"}}>
                        <div>Logged in</div>
                        <button onClick={logoutHandler}>Logout</button>
                    </div>
                    :
                    <div style={{position: "absolute", display: "flex", width: "100%", justifyContent: "center"}}
                    >Logged out</div>
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

