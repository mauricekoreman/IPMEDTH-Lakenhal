import React, { useEffect, useState } from "react";
import AanmeldingenCard from "./aanmeldingenCard";
import axios from "axios";

import { 
  List, 
  Typography,
  makeStyles
} from "@material-ui/core";
import { TEST_URL } from "../../assets/globalVariables";

const useStyles = makeStyles((theme) => ({
  titleAanmelding: {
    textAlign: 'center',
    marginTop: theme.spacing(2)
  },
  listAanmelding: {
    marginTop: theme.spacing(2),
    width: '80%',
    margin: '0 auto',
  }
}))

const AanmeldingenList = ({ activiteit_ID }) => {
  console.log(activiteit_ID);
  const classes = useStyles()
   

  const [aangemeldeUsers, setAangemeldeUsers] = useState([]);

  const fetchAangemeldeUsers = () => {
    axios
      .get(TEST_URL + "inschrijvingen/activiteitUser/" + activiteit_ID)
      .then((response) => {
        console.log(response.data);
        setAangemeldeUsers(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    console.log(aangemeldeUsers);
    fetchAangemeldeUsers();
  }, []);
  console.log(aangemeldeUsers);

  return (
    <div>
    <Typography className={classes.titleAanmelding} variant="h5">Bekijk aanmeldingen hieronder</Typography>
    <List className={classes.listAanmelding}>
      {aangemeldeUsers &&
        Object.entries(aangemeldeUsers).map(([key, value]) => {
          if (value.geaccepteerd === 0) {
            return <AanmeldingenCard aangemeldeUser={value} />
          }
        })}
    </List>
    </div>
  );
};

export default AanmeldingenList;
