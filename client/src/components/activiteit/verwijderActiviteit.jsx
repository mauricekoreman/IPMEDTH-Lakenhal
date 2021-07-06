import React, { useState } from "react";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import FeedbackBlock from "../feedbackBlock/feedbackBlock";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TEST_URL } from "../../assets/globalVariables";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
    margin: theme.spacing(6),
    },
   button: {
    backgroundColor: 'red',
    width: '80%',
    margin: '0 auto',
    marginTop: '5%',
    fontSize: 18,
    display: 'block',
    marginBottom: '10%',
    '&:focus' : {
      backgroundColor: 'red'
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 22,
      width: '35%'
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: '2%'
    },
   dialogTitle: {
    // [theme.breakpoints.up("lg")]: {
    //   '& h6': '50px'
    // },
    '& h2': {
      fontSize: 52
    }
   },
  },
}));

const VerwijderActiviteit = ({ user, activiteit}) => {
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const classes = useStyles();
  const [verstuur, setVerstuur] = useState(false);
  const [open, setOpen] = React.useState(false);

  const verwijderPost = async (activiteit) =>{
    await fetch(TEST_URL + 'activiteit/' + activiteit, {
        method: 'DELETE'
    })
        window.location.reload(true)
}

  const onSubmit = () => {
    verwijderPost(activiteit)
    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div title="containerTest">
      {verstuur ? (
        <FeedbackBlock success={true} text={"Post is verwijderd!"} />
      ) : (
        <Box display="flex" justifyContent="center" className={classes.buttonContainer}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              //onClick={() => onSubmit((prev) => !prev)}
              onClick={handleClickOpen}
              data-testid="buttonTestInput"
              
            >
              Verwijder post
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                classes={{
                  root: classes.dialogTitle
                }}
                id="responsive-dialog-title">
                  {"Verwijder post?"} 
                </DialogTitle>
                <DialogContent>
                <DialogContentText className={classes.dialogContentTekst} id="alert-dialog-description">
                    Weet je zeker dat je de post wilt verwijderen?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Nee
                </Button>
                <Button onClick={onSubmit} color="primary" autoFocus>
                    Ja
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
      )}
    </div>
  );
};

export default VerwijderActiviteit;
