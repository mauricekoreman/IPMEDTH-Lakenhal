import React, { useState } from "react";
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from "axios";
  
const RegistreerForm = () => {

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const { register, handleSubmit } = useForm();

    const onSubmit = async (registerData) => {
        console.log(registerData);
        axios.post(TEST_URL+"auth/register", registerData, {
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
            <TextField {...register('naam', { required: true })} id="naam" helperText="Naam" />
            <TextField {...register('email', { required: true })} id="email" helperText="E-mail" />
            <TextField {...register('password', { required: true })} id="password" type="password" helperText="Wachtwoord" />
            <TextField {...register('password_confirmation', { required: true })} id="password_confirmation" type="password" helperText="Wachtwoord conformatie" />
            <Button type="submit"> 
                Registreer
            </Button>
        </form>
    );
};
  
  export default RegistreerForm;