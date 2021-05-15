import React, { useEffect, useState } from "react";
import "./App.css";

import { Switch, Route, useLocation } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import Chatpage from "./pages/chatpage/chatpage";
import Profilepage from "./pages/profilepage/profilepage";
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
    <>
      <Header title={headerTitle} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/chat" component={Chatpage} />
        <Route exact path="/profiel" component={Profilepage} />
        <Route exact path="/moderator" component={Moderator} />
      </Switch>
      <BottomTabBar />
    </>
  );
}

export default App;
