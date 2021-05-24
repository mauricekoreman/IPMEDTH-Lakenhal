import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Grid } from '@material-ui/core';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from '../../contexts/authContext'

import CheckIcon from '@material-ui/icons/Check';

import KenmerkenForm from './kenmerkenForm'
import KenmerkenList from "./kenmerkenList";

const useStyles = makeStyles((theme) => ({

}));

const EditProfileForm = ({user, onReload, selectedTab}) => {
    const classes = useStyles();

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const { control, handleSubmit } = useForm();

    const onSubmit = (updateUserData) => {
        console.log(updateUserData);
        axios.put(TEST_URL+"users/update/"+user.user_ID, updateUserData, {
            headers: { Accept: "application/json" },
        }).then(res => {
            console.log(res);
            onReload();
            //ga naar profielpage
            selectedTab(2);
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
            <KenmerkenList user={user} kenmerk="interesses" onReload={onReload}/>
            <KenmerkenForm user={user} kenmerk="interesses" onReload={onReload}/>

            <KenmerkenList user={user} kenmerk="eigenschappen" onReload={onReload}/>
            <KenmerkenForm user={user} kenmerk="eigenschappen" onReload={onReload}/>
        </Container>
    );
};

export default EditProfileForm;
