import React, { useState } from "react";

import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";

const KenmerkenCard = ({kenmerk, kenmerkValue, onReload}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const [state, setState] = useState({
    checked: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log({[kenmerk]: kenmerkValue});
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
    <FormGroup>
        <FormControlLabel
            control={<Checkbox icon={<HighlightOffIcon />} checkedIcon={<DeleteIcon />} checked={state.checked} onChange={handleChange} name="checked"/>}
            label={kenmerkValue}
            labelPlacement="start"
         />
    </FormGroup>

  );
}

export default KenmerkenCard;



