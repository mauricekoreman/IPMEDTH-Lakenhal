import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from '@material-ui/core';
import { useAuth } from '../../contexts/authContext';
import EditProfileForm from '../../components/profile/editProfileForm';
import axios from "axios";

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
    const TEST_URL = "http://127.0.0.1:8000/api/";

    const { currentUser, setCurrentUser } = useAuth();
    let user = currentUser;

    useEffect(() => {
        updateUser();
    }, []);
    
    const updateUser = () => {
        axios.get(TEST_URL+"users/"+user.user_ID, {
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            console.log(res.data);
            setCurrentUser(res.data);
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    return (
        <Box className={classes.pageContainer}>
            <EditProfileForm user={user} onReload={updateUser} selectedTab={selectedTab}/> 
            <Button onClick={selectedTab}><CloseIcon /></Button>
        </Box>
    );
};

export default ProfileEditTab;
