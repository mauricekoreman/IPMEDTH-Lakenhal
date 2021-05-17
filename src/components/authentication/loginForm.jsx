import React, { useState } from "react";
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from "axios";

import { useAuth } from '../../contexts/authContext'
import { useHistory } from "react-router-dom";
  
const LoginForm = () => {

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const { setCurrentUser } = useAuth();

    const onSubmit = async (loginData) => {
        console.log(loginData);
        axios.post(TEST_URL+"auth/login", loginData, {
            headers: { Accept: "application/json" },
        }).then(res => {
            console.log(res.data);
            //useContext user
            setCurrentUser(res.data.data);
            //localstorgae user
            localStorage.setItem('user', JSON.stringify(res.data.data));
            //localstorgae user token
            localStorage.setItem('token', JSON.stringify(res.data.token));
            //ga naar homepage
            history.push('/');
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register('email', { required: true })} id="email" helperText="E-mail" />
            <TextField {...register('password', { required: true })} id="password" type="password" helperText="Wachtwoord" />
            <Button type="submit"> 
                Login
            </Button>
        </form>
    );
};
  
  export default LoginForm;