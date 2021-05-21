import React, { useEffect, useState } from "react";
import "./App.css";

import { Switch, Route, useLocation } from "react-router-dom";

import HomePage from "./pages/homepage/homepage";
import Chat from "./pages/chatpage/chatpage";
import Profile from "./pages/profilepage/profilepage";
import Moderator from "./pages/moderatorpage/moderatorpage";
import Login from "./pages/authpage/loginpage";
import Register from "./pages/authpage/registerpage";

import BottomTabBar from "./components/bottomTabBar/bottomTabBar";
import Header from "./components/header/header";

import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./contexts/protectedRoute";

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

  const user = localStorage.getItem('user');

  return (
    <div>
      <AuthProvider user={user}>
        <Header title={headerTitle} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/chat" ><Chat /></ProtectedRoute>
            <ProtectedRoute exact path="/profiel" ><Profile /></ProtectedRoute>
            <Route exact path="/moderator" component={Moderator} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        <BottomTabBar />
      </AuthProvider>
    </div>
  );
}

export default App;
