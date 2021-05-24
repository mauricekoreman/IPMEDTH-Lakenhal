import React, { useRef } from "react";
import { useState, useEffect, setState } from "react";
import { Button, TextField, Box, makeStyles, FormControlLabel, Checkbox } from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  maakCategorieButton: {
    width: '100%',
    margin: '0 auto',
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(2),
  },
  categorieForm: {
    textAlign: 'center'
  },
  categorieFormTextField: {
    width: '100%',
    marginLeft: theme.spacing(0),
  }
}));

const CategorieForm = ({onReload}) => {
  const classes = useStyles();
  const [lakenhalActiviteit, setLakenhalActiviteit] = useState(false)

  // const onSubmit = (e) => {
    
    
  //   const formData = new FormData(formEl.current);
  //   const categorie = formData.get("categorie");
  //   const JSONcategorie = {categorie: categorie}
  //   console.log(JSONcategorie);
  //   axios.post(TEST_URL+"categorie/create", JSONcategorie, {
  //       headers: { Accept: "application/json" },
  //   }).then(res => {
  //       console.log(res.data);
  //       onReload();
  //   })
  //   .catch(error => {
  //       console.log(error.response);
  //   });
  //   e.preventDefault();
  // };

  const handleChange = (e) => {
    setLakenhalActiviteit(e.target.checked)
  }

  return (
      <form className={classes.categorieForm} noValidate autoComplete="off">
        <FormControlLabel
          control={
            <Checkbox
              checked={lakenhalActiviteit}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Lakenhal activiteit?"
        />
        <TextField className={classes.categorieFormTextField}
        id="categorie"
        label="Nieuwe categorie" 
        variant="outlined" 
        />
        <Button className={classes.maakCategorieButton} variant="contained" color="primary"> 
            Maak Categorie 
        </Button>
      </form>
  );
}

export default CategorieForm;



