import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Grid } from '@material-ui/core';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../contexts/authContext'

import CheckIcon from '@material-ui/icons/Check';

import InteresseEigenschapForm from '../../components/profile/interesseEigenschapForm'

const useStyles = makeStyles((theme) => ({

}));

const EditProfileForm = ({user}) => {
    const classes = useStyles();

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const history = useHistory();
    const { setCurrentUser } = useAuth();

    const { control, handleSubmit } = useForm();

    const onSubmit = async (updateUserData) => {
        console.log(updateUserData);
        axios.put(TEST_URL+"users/update/"+user.user_ID, updateUserData, {
            headers: { Accept: "application/json" },
        }).then(res => {
            console.log(res);
            //ga naar profielpage
            history.push('/profiel');
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    
    console.log(user);
    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column">
                    <Controller
                        name="profiel_foto"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <Button component="label">Verander Profielfoto<input {...field} type="file" hidden/></Button>}
                    />
                    <Controller
                        name="beroep"
                        control={control}
                        defaultValue={user.beroep}
                        render={({ field }) => <TextField {...field} label="Beroep:" />}
                    />
                    <Controller
                        name="naam"
                        control={control}
                        defaultValue={user.naam}
                        render={({ field }) => <TextField {...field} label="Naam:" />}
                    />
                    <Controller
                        name="biografie"
                        control={control}
                        defaultValue={user.biografie}
                        render={({ field }) => <TextField {...field} multiline rows={4} variant="outlined" label="Over jouw:" />}
                    />
                </Grid>
                <Button type="submit"> 
                    <CheckIcon />
                </Button>
            </form>
            <InteresseEigenschapForm user={user} input="interesses"/>
            <InteresseEigenschapForm user={user} input="eigenschappen"/>
        </Container>
    );
};

export default EditProfileForm;
