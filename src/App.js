import React from 'react';
import './App.css';
import AdminToolsContainer from "./containers/AdminToolsContainer/AdminToolsContainer";
import {BrowserRouter, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter className="App">
      <Route path="/" exact render={() => <AdminToolsContainer/>}/>
    </BrowserRouter>
  );
}

export default App;
