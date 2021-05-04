import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import Chat from "./pages/chatpage/chatpage";
import Profile from "./pages/profilepage/profilepage";
import BottomTabBar from "./components/bottomTabBar/bottomTabBar";
import Header from "./components/header/header";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/profiel" component={Profile} />
      </Switch>
      <BottomTabBar />
    </div>
  );
}

export default App;
