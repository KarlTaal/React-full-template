import React from 'react';
import './App.css';
import AdminToolsContainer from "./containers/AdminToolsContainer/AdminToolsContainer";
import {BrowserRouter, Route} from 'react-router-dom';
import HomePageContainer from "./containers/HomePageContainer/HomePageContainer";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer/RegisterContainer";


const App = () => {
    return (
        <BrowserRouter className="App">
            <Route path="/" exact render={() => <HomePageContainer/>}/>

            <Route path="/login" exact render={() =>
                <LoginContainer/>}
            />

            <Route path="/register" exact render={() => <RegisterContainer/>}/>

            <Route path="/admin" exact render={() => <AdminToolsContainer/>}/>
        </BrowserRouter>
    );
}

export default App;
