import React, { setState } from "react";

import { Button, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

import axios from "axios";

const CategorieCard = ({categorie}) => {

  const [state, setState] = React.useState({
    checked: false
  });

  const handleChange = (event, key) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  
  return (
    <FormGroup>
        <FormControlLabel
            control={<Checkbox checked={state.checked} onChange={handleChange} name="checked" />}
            label={categorie}
         />
    </FormGroup>

  );
}

export default CategorieCard;



