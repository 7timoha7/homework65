import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import ContentContainer from "./containers/ContentContainer/ContentContainer";
import Admin from "./containers/Admin/Admin";

function App() {
  return (
    <div className="App">
      <header className="header">
        <NavBar/>
      </header>
      <main>
        <Routes>
          <Route path={"/pages/:pageName"} element={(
            <ContentContainer/>
          )}/>
          <Route path={"/pages/admin"} element={(
            <Admin/>
          )}/>
        </Routes>
      </main>


    </div>
  );
}

export default App;
