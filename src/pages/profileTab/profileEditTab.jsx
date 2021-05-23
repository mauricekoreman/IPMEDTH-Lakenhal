import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from '@material-ui/core';
import { useAuth } from '../../contexts/authContext'
import EditProfileForm from '../../components/profile/editProfileForm'

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

    return (
        <Box className={classes.pageContainer}>
            <EditProfileForm user={user}/> 
            <Button onClick={selectedTab}><CloseIcon /></Button>
        </Box>
    );
};

export default ProfileEditTab;
