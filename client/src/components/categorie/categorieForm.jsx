import React from "react";
import { useState } from "react";
import {
  Button,
  TextField,
  makeStyles,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  maakCategorieButton: {
    width: "100%",
    margin: "0 auto",
    marginTop: theme.spacing(2),
    fontSize: theme.spacing(2),
  },
  categorieForm: {
    textAlign: "center",
  },
  categorieFormTextField: {
    width: "100%",
    marginLeft: theme.spacing(0),
  },
}));

const CategorieForm = ({ addCategorie, categorieError }) => {
  const classes = useStyles();
  const [lakenhal_activiteit, setLakenhalActiviteit] = useState(false);
  const [categorie, setCategorie] = useState("");

  const handleChange = (e) => {
    setLakenhalActiviteit(e.target.checked);
  };

  const onSubmit = () => {
    addCategorie({ categorie, lakenhal_activiteit });
    setLakenhalActiviteit(false);
    setCategorie("");
  };

  return (
    <form className={classes.categorieForm} noValidate autoComplete="off">
      <FormControlLabel
        control={
          <Checkbox
            checked={lakenhal_activiteit}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Lakenhal activiteit?"
      />
      <TextField
        className={classes.categorieFormTextField}
        error={categorieError}
        helperText={
          categorieError ? "Categorie bestaat al of categorie is leeg!" : ""
        }
        id="categorie"
        value={categorie}
        label="Nieuwe categorie"
        variant="outlined"
        onChange={(e) => {
          setCategorie(e.target.value);
        }}
      />
      <Button
        onClick={onSubmit}
        className={classes.maakCategorieButton}
        variant="contained"
        color="primary"
      >
        Maak Categorie
      </Button>
    </form>
  );
};

export default CategorieForm;
