import React, { useState } from "react";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import axios from "axios";
import FeedbackBlock from "../feedbackBlock/feedbackBlock";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(6),
  },
}));

const InschrijvenActiviteit = ({ user, activiteit }) => {
  const TEST_URL = "http://127.0.0.1:8000/api/";
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
        <Box display="flex" justifyContent="center" className={classes.button}>
          {show === false ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShow((prev) => !prev)}
              data-testid="buttonTestInput"
            >
              Doe Mee!
            </Button>
          ) : (
            <form title="formTest">
              <TextField
                label="bericht"
                name="bericht"
                value={inschrijving.inschrijving}
                onChange={handleInput}
                helperText="optioneel* Vertel waarom je mee wilt doen."
                inputProps={{ "data-testid": "testMotivatieInput" }}
              />
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Verstuur
              </Button>
              <Button onClick={() => setShow((prev) => !prev)}>Annuleer</Button>
            </form>
          )}
        </Box>
      )}
    </div>
  );
};

export default InschrijvenActiviteit;
