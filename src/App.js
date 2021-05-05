import React, { useEffect, useState } from "react";
import "./App.css";

import { Switch, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import Chat from "./pages/chatpage/chatpage";
import Profile from "./pages/profilepage/profilepage";
import Moderator from "./pages/moderatorpage/moderatorpage";
import BottomTabBar from "./components/bottomTabBar/bottomTabBar";
import Header from "./components/header/header";

function App() {
  let location = useLocation();
  const [headerTitle, setHeaderTitle] = useState("");
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setHeaderTitle("Lakenhal Matcht");
        break;
      case "/chat":
        setHeaderTitle("Chat");
        break;
      case "/profiel":
        setHeaderTitle("Profiel");
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div>
      <Header title={headerTitle} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/profiel" component={Profile} />
        <Route exact path="/moderator" component={Moderator} />
      </Switch>
      <BottomTabBar />
    </div>
  );
}

export default App;
