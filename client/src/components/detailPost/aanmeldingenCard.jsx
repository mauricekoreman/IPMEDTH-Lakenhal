import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  makeStyles
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useForm } from "react-hook-form";
import axios from "axios";
import ProfileTab from "../../pages/profileTab/profileTab";
import DetailProfileTab from "../profile/detailProfileTab";


const useStyles = makeStyles((theme) => ({
  aanmelding: {
    display: 'block',
    padding: theme.spacing(1)
  }
}))

const AanmeldingenCard = ({ aangemeldeUser }) => {
  console.log(aangemeldeUser);
  const classes = useStyles()
  const [show, setShow] = useState(false);

  const TEST_URL = "http://127.0.0.1:8000/api/";
  const [detailProfileOpen, setDetailProfileOpen] = useState(false);
  const detailProfileClick = () => {
    setDetailProfileOpen(!detailProfileOpen);
  };

  const { handleSubmit } = useForm();
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
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className={classes.aanmelding}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{aangemeldeUser.naam}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {aangemeldeUser.bericht != null
              ? aangemeldeUser.bericht
              : "De aangemelde persoon heeft geen tekst ingestuurd"}
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button
            color="primary"
            onClick={detailProfileClick}
          >
            Profiel Bekijken
          </Button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit" color="primary">
              Accepteer
            </Button>
          </form>
        </AccordionActions>
      </Accordion>

      <DetailProfileTab user={aangemeldeUser} closeScreen={detailProfileClick} open={detailProfileOpen}/>
    </div>
  );
};

export default AanmeldingenCard;
