import React, { useEffect, useState } from "react";
import "./App.css";

import { Switch, Route, useLocation } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import Chatpage from "./pages/chatpage/chatpage";
import Login from "./pages/authpage/loginpage";
import Register from "./pages/authpage/registerpage";
import ForgotPassword from "./pages/authpage/passwordForgetpage";

import BottomTabBar from "./components/bottomTabBar/bottomTabBar";
import Header from "./components/header/header";

import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./contexts/protectedRoute";
import PasswordResetPage from "./pages/authpage/passwordResetPage";

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

  const user = localStorage.getItem("user");

  return (
    <div>
      <AuthProvider user={user}>
        <Header title={headerTitle} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <ProtectedRoute exact path="/chat">
            <Chatpage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profiel"></ProtectedRoute>
          <ProtectedRoute exact path="/moderator"></ProtectedRoute>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword/:token" component={PasswordResetPage} />
        </Switch>
        <BottomTabBar />
      </AuthProvider>
    </div>
  );
}

export default App;
