import React from "react";

import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const Logout = () => {
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const history = useHistory();
  const { setCurrentUser } = useAuth();

  const signOut = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .get(TEST_URL + "auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        //ga naar loginpagina
        history.push("/login");
        //useContext user
        setCurrentUser(null);
        //localstorage user en token
        localStorage.clear();
      })
      .catch((error) => {
        history.push("/login");
        localStorage.clear();
        setCurrentUser(null);
        console.log(error.response);
      });
  };

  return (
    <Button
      variant="outlined"
      style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}
      onClick={() => signOut()}
    >
      Uitloggen
    </Button>
  );
};

export default Logout;
