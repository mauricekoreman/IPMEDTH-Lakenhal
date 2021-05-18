import React, { useState, useRef } from "react";
import { TextField, Button, FormControl, Grid, Container, makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    formContainer: {
      padding: theme.spacing(3),
    },
}));
  
const RegistreerForm = () => {
    const classes = useStyles();

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const [generalLoginError, setGeneralLoginError] = useState();

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (registerData) => {
        console.log(registerData);
        axios.post(TEST_URL+"auth/register", registerData, {
            headers: { Accept: "application/json" },
        }).then(res => {
            if(res.status === 200){
                console.log(res.data);
            }else{
                reset({formState: true});
            }
            
        })
        .catch(error => {
            setGeneralLoginError(true);
            console.log(error.response);
        });
    };

    return (
        <Container className={classes.formContainer} maxWidth="xs">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column">
                    <FormControl>
                        <Controller
                            name="naam"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} helperText={errors.naam ? errors.naam.message : "Naam" } error={!!errors.email} />}
                            rules={{
                                required: 'Verplicht',
                            }}
                            />
                    </FormControl>
                    <FormControl>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} helperText={errors.email ? errors.email.message : "E-mail" } error={!!errors.email} />}
                            rules={{
                                required: 'Verplicht',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'ongeldig e-mailadres'
                                }
                            }}
                            />
                    </FormControl>
                    <FormControl>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} type="password" helperText={errors.password ? errors.password.message : "Wachtwoord"} error={!!errors.password} />}
                            rules={{
                                required: 'Verplicht',
                                minLength: {value: 5, message: 'wachtwoord is moet minimaal 5 karakters bevatten'}
                            }}
                            />
                    </FormControl>
                    <FormControl>
                        <Controller
                            name="password_confirmation"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField {...field} type="password" helperText={errors.password ? errors.password.message : "Wachtwoord bevestigen"} error={!!errors.password} />}
                            rules={{
                                required: 'Verplicht',
                                validate: value => value === password.current || "De wachtwoorden komen niet overeen"
                            }}
                            />
                    </FormControl>
                    {generalLoginError && <box>E-mailadres is al in gebruik</box>}
                    <Button type="submit"> 
                        Registreer
                    </Button>
                </Grid>
            </form>
        </Container>
    );
};
  
  export default RegistreerForm;