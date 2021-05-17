import React from "react";

import axios from "axios";
import { useAuth } from '../../contexts/authContext'
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
  
const Logout = () => {

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const history = useHistory();
    const { setCurrentUser } = useAuth();

    const signOut = async () => {
        const token = JSON.parse(localStorage.getItem("token"));

        axios.get(TEST_URL+"auth/logout", {
            headers: { Authorization: `Bearer ${token}` },
        }).then(res => {
            console.log(res.data);
            //useContext user
            setCurrentUser(null);
            //localstorgae user
            localStorage.setItem('user', null);
            //ga naar loginpagina
            history.push('/login');
        })
        .catch(error => {
            console.log(error.response);
        });
    };

    return (
        <Button onClick={() => signOut()}>
            Logout
        </Button>
    );
};
  
export default Logout;