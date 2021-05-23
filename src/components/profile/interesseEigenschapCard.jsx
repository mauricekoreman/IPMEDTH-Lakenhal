import React, { useState } from "react";

import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";

const InteresseEigenschapCard = () => {
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const [state, setState] = useState({
    checked: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    onSubmit();
  };

  const onSubmit = () => {
    axios.put(TEST_URL+""+iets, {
        headers: { Accept: "application/json" },
    })
    .then(res => {
        console.log(res.data);
        onReload();
    })
    .catch(error => {
        console.log(error.message);
    });
  };

  return (
    <FormGroup>
        <FormControlLabel
            control={<Checkbox icon={<HighlightOffIcon />} checkedIcon={<DeleteIcon />} checked={state.checked} onChange={handleChange} name="checked"/>}
            label={}
            labelPlacement="start"
         />
    </FormGroup>

  );
}

export default InteresseEigenschapCard;



