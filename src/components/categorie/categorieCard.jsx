import React, { useState } from "react";

import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from "axios";

const CategorieCard = ({categorie, categorie_ID}) => {

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const [state, setState] = useState({
    checked: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    onSubmit();
  };
  console.log(state, categorie_ID, categorie);

  const onSubmit = () => {
    axios.put(TEST_URL+"categorie/delete/"+categorie_ID, {
        headers: { Accept: "application/json" },
    })
    .then(res => {
        console.log(res.data);
        window.location.reload()
    })
    .catch(error => {
        console.log(error.response);
    });
  };

  return (
    <FormGroup>
        <FormControlLabel
            control={<Checkbox icon={<DeleteOutlineIcon />} checkedIcon={<DeleteIcon />} checked={state.checked} onChange={handleChange} name="checked" />}
            label={categorie}
            labelPlacement="start"
         />
    </FormGroup>

  );
}

export default CategorieCard;



