import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import Chat from "./pages/chat/chat";
import Profile from "./pages/profile/profile";
import BottomTabBar from "./components/bottomTabBar/bottomTabBar";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <BottomTabBar />
    </div>
  );
}

export default App;
