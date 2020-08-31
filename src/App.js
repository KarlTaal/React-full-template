import React, {useState} from 'react';
import './App.css';
import AdminToolsContainer from "./containers/AdminToolsContainer/AdminToolsContainer";
import {BrowserRouter, Route} from 'react-router-dom';
import HomePageContainer from "./containers/HomePageContainer/HomePageContainer";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer/RegisterContainer";


const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (

        <BrowserRouter className="App">
            <Route path="/" exact render={() =>
                <HomePageContainer
                    isAuthorized={isAuthorized}
                    setIsAuthorized={setIsAuthorized}
                />}
            />

            <Route path="/login" exact render={() =>
                <LoginContainer
                    isAuthorized={isAuthorized}
                    setIsAuthorized={setIsAuthorized}
                />}
            />

            <Route path="/register" exact render={() =>
                <RegisterContainer
                    isAuthorized={isAuthorized}
                    setIsAuthorized={setIsAuthorized}
                />}
            />

            <Route path="/admin" exact render={() =>
                <AdminToolsContainer
                    isAuthorized={isAuthorized}
                    setIsAuthorized={setIsAuthorized}
                />}
            />
        </BrowserRouter>
    );
};

export default App;
