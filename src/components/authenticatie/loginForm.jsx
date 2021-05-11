import React, { useState } from "react";
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from "axios";
  
const LoginForm = () => {

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const { register, handleSubmit } = useForm();

    const onSubmit = async (loginData) => {
        console.log(loginData);
        axios.post(TEST_URL+"auth/login", loginData, {
            headers: { Accept: "application/json" },
        }).then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.log(error.response);
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