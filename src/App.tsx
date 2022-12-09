import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import ContentContainer from "./containers/ContentContainer/ContentContainer";
import Admin from "./containers/Admin/Admin";

function App() {

  const welcome = (
    <div className="welcome">
      <h1 style={{textAlign: "center"}}>Welcome</h1>
    </div>
  );

  return (
    <div className="App">
      <header className="header">
        <NavBar/>
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={(
            welcome
          )}/>
          <Route path={"/pages/:pageName"} element={(
            <ContentContainer/>
          )}/>
          <Route path={"/pages/admin/:editAdd"} element={(
            <Admin/>
          )}/>
        </Routes>
      </main>


    </div>
  );
}

export default App;
