import React, {forwardRef, useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ProfileTab from "../../pages/profileTab/profileTab";

import { 
    makeStyles, 
    Typography, 
    FormControl,
    Dialog,
    Toolbar,
    AppBar,
    IconButton,
    Slide,
    Box
} from "@material-ui/core";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3)
    }
}))


const DetailProfileTab = ({open, closeScreen, user}) => {
    const classes = useStyles()
    return (
        <Dialog
        fullScreen
        open={open}
        onClose={() => closeScreen()}
        TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
            <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=> closeScreen()} aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Profiel inzien
                </Typography>
            </Toolbar>
            </AppBar>
            <Box className={classes.container}>
                <ProfileTab user={user} editProfile={false}/>
            </Box>
        </Dialog>
    )
}

export default DetailProfileTab
