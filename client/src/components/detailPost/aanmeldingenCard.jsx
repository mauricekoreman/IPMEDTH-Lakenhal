import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useForm } from "react-hook-form";
import axios from "axios";
import DetailProfileTab from "../profile/detailProfileTab";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  aanmelding: {
    display: "block",
    padding: theme.spacing(1),
  },
}));

const AanmeldingenCard = ({ aangemeldeUser }) => {
  console.log(aangemeldeUser);
  const classes = useStyles();
  const [aanmeldingCheck, setAanmelding] = useState();
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const TEST_URL = "http://127.0.0.1:8000/api/";
  const [detailProfileOpen, setDetailProfileOpen] = useState(false);
  
  const detailProfileClick = (rapporteer = false) => {
    setDetailProfileOpen(!detailProfileOpen);
    if(rapporteer){
      handleSubmit(onSubmit)
      openSnackBar()
    }
  };

  const { handleSubmit } = useForm();

  const openSnackBar = (succesVolRapportage) => {
    setSnackBarOpen(true);
    console.log("werkt dit?");
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  const onSubmit = async () => {
    axios
      .put(
        TEST_URL +
          "inschrijvingen/activiteit/" +
          aangemeldeUser.activiteit_ID +
          "/" +
          aangemeldeUser.user_ID,
        {
          headers: { Accept: "application/json" },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAanmelding(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className={classes.aanmelding}>
      {!aanmeldingCheck && (
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography data-testid="testNaam">
                {aangemeldeUser.naam}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography data-testid="testBericht">
                {aangemeldeUser.bericht != null
                  ? aangemeldeUser.bericht
                  : "De aangemelde persoon heeft geen tekst ingestuurd"}
              </Typography>
            </AccordionDetails>
            <AccordionActions>
              <Button
                color="primary"
                onClick={detailProfileClick}
                data-testid="testButton"
              >
                Profiel Bekijken
              </Button>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  onClick={() => openSnackBar()}
                  type="submit"
                  color="primary"
                >
                  Accepteer
                </Button>
              </form>
            </AccordionActions>
          </Accordion>
          <DetailProfileTab
            user={aangemeldeUser}
            closeScreen={detailProfileClick}
            open={detailProfileOpen}
          />
        </div>
      )}
      <Snackbar
        className={classes.snackBar}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={closeSnackBar}
      >
        <Alert onClose={closeSnackBar} severity="success">
          aan melding succesvol!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AanmeldingenCard;
