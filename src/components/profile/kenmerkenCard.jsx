import React, { useState } from "react";

import { FormGroup, FormControlLabel, Checkbox, Chip } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";

const KenmerkenCard = ({kenmerk, kenmerkValue, onReload, key}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const [chipData, setChipData] = useState();

  const handleDelete = (kenmerkValue) => () => {
    onSubmit({[kenmerk]: kenmerkValue});
  };


  const onSubmit = (deleteKenmerk) => {
    axios.put(TEST_URL+"users/deleteKenmerk/"+user.user_ID, deleteKenmerk, {
        headers: { Accept: "application/json" },
    })
    .then(res => {
        console.log(res.data);
        onReload();
    })
    .catch(error => {
        console.log(error.response);
    });
  };

  return (   
    <Chip
      key={key}
      name="checked"
      icon={HighlightOffIcon}
      label={kenmerkValue}
      onDelete={handleDelete(kenmerkValue)}
    />
  );
}

export default KenmerkenCard;



