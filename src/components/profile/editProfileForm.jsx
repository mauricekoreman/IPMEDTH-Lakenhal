import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Grid, Avatar, Box } from '@material-ui/core';
import axios from "axios";

import CheckIcon from '@material-ui/icons/Check';

import KenmerkenForm from './kenmerkenForm';
import KenmerkenList from "./kenmerkenList";
import ProfielFotoForm from './profielFotoForm';

const useStyles = makeStyles((theme) => ({
    profilePicture: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: theme.spacing(1, 'auto'), 
    },
    subContainer: {
        marginBottom: theme.spacing(3),
    },
    submitButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(15),
    },
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
    console.log(user.profiel_foto);

    return (
        <Container maxWidth="xs">
            <Avatar
                src={"http://localhost:8000/storage/profiel_foto/" + user.profiel_foto} 
                className={classes.profilePicture}
                alt="profiel foto" 
            />
            <ProfielFotoForm user={user} onReload={onReload}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Button className={classes.submitButton} color="primary" type="submit"> 
                    <CheckIcon />
                </Button>
                <Grid container direction="column">
                    <Box className={classes.subContainer}>
                        <Controller
                            name="beroep"
                            control={control}
                            defaultValue={user.beroep}
                            render={({ field }) => <TextField {...field} label="Beroep:" fullWidth={true}/>}
                        />
                    </Box>
                    <Box className={classes.subContainer}>
                        <Controller
                            name="naam"
                            control={control}
                            defaultValue={user.naam}
                            render={({ field }) => <TextField {...field} label="Naam:" fullWidth={true}/>}
                        />
                    </Box>
                    <Box className={classes.subContainer}>
                        <Controller
                            name="biografie"
                            control={control}
                            defaultValue={user.biografie}
                            render={({ field }) => <TextField {...field} multiline rows={4} variant="outlined" label="Over jouw:" fullWidth={true}/>}
                        />
                    </Box>
                </Grid>
            </form>

            <KenmerkenList user={user} kenmerk="interesses" onReload={onReload}/>
            <Box className={classes.subContainer}>
                <KenmerkenForm user={user} kenmerk="interesses" onReload={onReload}/>
            </Box>

            <KenmerkenList user={user} kenmerk="eigenschappen" onReload={onReload}/>
            <Box className={classes.subContainer}>
                <KenmerkenForm user={user} kenmerk="eigenschappen" onReload={onReload}/>
            </Box>
        </Container>
    );
};

export default EditProfileForm;
