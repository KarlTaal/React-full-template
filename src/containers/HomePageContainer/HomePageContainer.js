import React from 'react';
import './HomePageContainer.css';
import {Link} from 'react-router-dom';

const HomePageContainer = () =>{
    return <div id={"home-page-container"}>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
    </div>
};

export default  HomePageContainer;

