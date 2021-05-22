import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Button, Container } from '@material-ui/core';
import { useAuth } from '../../contexts/authContext'

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(5),
    },
}));

const ProfileEditTab = ({selectedTab}) => {
    const classes = useStyles();

    const { currentUser } = useAuth();
    let user = JSON.parse(currentUser)
    console.log(user.naam);

    const { control, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    

    return (
        <Box className={classes.pageContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="profiel_foto"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <Button component="label">Verander Profielfoto<input {...field} type="file" hidden/></Button>}
                />
                <Controller
                    name="naam"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="Naam:" value={user.naam}/>}
                />
                <Controller
                    name="biografie"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} multiline rows={4} variant="outlined" label="Over jouw:" value={user.biografie}/>}
                />
                <Controller
                    name="interesses"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="Interesses:"/>}
                />
                <Controller
                    name="eigenschappen"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label="Kenmerkende eigenschappen:"/>}
                />
                <Button type="submit"x> 
                    <CheckIcon />
                </Button>
            </form>
            <Button onClick={selectedTab}><CloseIcon /></Button>
        </Box>
    );
};

export default ProfileEditTab;
