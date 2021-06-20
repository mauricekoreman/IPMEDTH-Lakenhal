import React, { useEffect, useState } from "react";
import AanmeldingenCard from "./aanmeldingenCard";
import axios from "axios";

import { List } from "@material-ui/core";

const AanmeldingenList = ({ activiteit_ID }) => {
  console.log(activiteit_ID);

  const TEST_URL = "http://127.0.0.1:8000/api/";

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
    <List>
      {aangemeldeUsers &&
        Object.entries(aangemeldeUsers).map(([key, value]) => {
          return <AanmeldingenCard aangemeldeUser={value} />;
        })}
    </List>
  );
};

export default AanmeldingenList;
