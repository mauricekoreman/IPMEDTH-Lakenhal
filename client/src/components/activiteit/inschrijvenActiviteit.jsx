import React, { useState } from "react";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import axios from "axios";
import FeedbackBlock from "../feedbackBlock/feedbackBlock";
import { TEST_URL } from "../../assets/globalVariables";

const useStyles = makeStyles((theme) => ({
  buttonDoeMee: {
    fontSize: 22,
    width: '60%',
    [theme.breakpoints.up("sm")]: {
      fontSize: 24,
      width: '35%'
    },
    margin: '0 auto',
    display: 'block',
    marginTop: '10%'
  },
  formContainer: {
    width: '90%',
    margin: '0 auto'
  },
  // buttonContainer: {
  //   display: 'flex',
  //   justifyContent: 'space-between'
  // },
  buttonAnnuleer: {
    backgroundColor: 'red',
    width: '80%',
    margin: '0 auto',
    marginTop: '5%',
    fontSize: 18,
    display: 'block',
    marginBottom: '10%',
    [theme.breakpoints.up("sm")]: {
      fontSize: 22,
      width: '35%'
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: '2%'
    },
  },
  buttonVerstuur: {
    width: '80%',
    marginTop: '5%',
    fontSize: 18,
    margin: '0 auto',
    display: 'block',
    [theme.breakpoints.up("sm")]: {
      fontSize: 22,
      width: '35%'
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: '2%'
    },
  },  
  inschrijvingTekst: {
    width: '80%',
    marginTop: '5%',
    fontSize: 18,
    margin: '0 auto',
    display: 'block',
    height: '100%',  
  },
  titleTekst: {
    [theme.breakpoints.up("md")]: {
      fontSize: '26px',
      lineHeight: 1.4
    },
  },
  helperTekst: {
    [theme.breakpoints.up("md")]: {
      fontSize: '26px',
      lineHeight: 1.4
    },
  },
  labelTekst: {
    [theme.breakpoints.up("md")]: {
      fontSize: '26px',
      lineHeight: 1.4
    },
  },
  labelFocused: {
    [theme.breakpoints.up("md")]: {
      fontSize: '16px',
      lineHeight: 1.4
    },
  },
  resize: {
    [theme.breakpoints.up("md")]: {
      fontSize: '30px',
      lineHeight: 1.4
    },
  }
}));

const InschrijvenActiviteit = ({ user, activiteit }) => {
   
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [verstuur, setVerstuur] = useState(false);

  const initialValues = {
    bericht: "",
  };

  const [inschrijving, setInschrijving] = useState(initialValues);
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInschrijving({
      ...inschrijving,
      [name]: value,
    });
  };

  const onSubmit = () => {
    console.log(inschrijving);
    inschrijving.user_ID = user.user_ID;
    inschrijving.activiteit_ID = activiteit;
    axios
      .post(TEST_URL + "inschrijvingen", inschrijving, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setShow((prev) => !prev);
        setVerstuur(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div title="containerTest">
      {verstuur ? (
        <FeedbackBlock success={true} text={"U bent aangemeld"} />
      ) : (
        <div>
          {show === false ? (
            <Button className={classes.buttonDoeMee}
              variant="contained"
              color="primary"
              onClick={() => setShow((prev) => !prev)}
              data-testid="buttonTestInput"
            >
              Doe Mee!
            </Button>
          ) : (
            <form title="formTest" >
              <TextField
                label="bericht"
                name="bericht"
                value={inschrijving.inschrijving}
                onChange={handleInput}
                helperText="optioneel* Vertel waarom je mee wilt doen."
                inputProps={{ "data-testid": "testMotivatieInput" }}
                variant="outlined"
                multiline
                className={classes.inschrijvingTekst}
                fullWidth={true}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelTekst,
                    focused: classes.labelFocused
                  }
                }}
                FormHelperTextProps={{
                  classes: {
                    root: classes.helperTekst
                  }
                }}
                // InputLabelProps={{
                //   classes: {
                //     input: classes.labelTekst
                //   }
                // }} 
              />
              <Box className={classes.buttonContainer}>
              <Button className={classes.buttonVerstuur} variant="contained" color="primary" onClick={onSubmit}>
                Verstuur
              </Button>
              <Button className={classes.buttonAnnuleer} color='primary' variant="contained" onClick={() => setShow((prev) => !prev)}>Annuleer</Button>
              </Box>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default InschrijvenActiviteit;
