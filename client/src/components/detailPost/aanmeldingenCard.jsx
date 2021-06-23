import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useForm } from "react-hook-form";
import axios from "axios";
import ProfileTab from "../../pages/profileTab/profileTab";

const AanmeldingenCard = ({ aangemeldeUser }) => {
  console.log(aangemeldeUser);

  const [show, setShow] = useState(false);

  const TEST_URL = "http://127.0.0.1:8000/api/";

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
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography data-testid="testNaam">{aangemeldeUser.naam}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography data-testid="testBericht">
            {aangemeldeUser.bericht != null
              ? aangemeldeUser.bericht
              : "De aangemelde persoon heeft geen tekst ingestuurd"}
          </Typography>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button
            onClick={() => {
              setShow((prev) => !prev);
            }}
            color="primary"
            data-testid="testButton"
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

      {show && <ProfileTab user={aangemeldeUser} />}
    </div>
  );
};

export default AanmeldingenCard;
