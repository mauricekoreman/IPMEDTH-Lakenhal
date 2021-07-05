import React, { useState } from "react";
import { TextField, Button, Box, makeStyles } from "@material-ui/core";
import axios from "axios";
import FeedbackBlock from "../feedbackBlock/feedbackBlock";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(6),
  },
}));

const VerwijderActiviteit = ({ user, activiteit}) => {
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const classes = useStyles();
  const [verstuur, setVerstuur] = useState(false);

  const verwijderPost = async (activiteit) =>{
    await fetch(TEST_URL + 'activiteit/' + activiteit, {
        method: 'DELETE'
    })
    window.location.reload(true)
}

  const onSubmit = () => {
    verwijderPost(activiteit)
    
  };

  return (
    <div title="containerTest">
      {verstuur ? (
        <FeedbackBlock success={true} text={"Post is verwijderd!"} />
      ) : (
        <Box display="flex" justifyContent="center" className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSubmit((prev) => !prev)}
              data-testid="buttonTestInput"
            >
              Verwijder post
            </Button>
        </Box>
      )}
    </div>
  );
};

export default VerwijderActiviteit;
