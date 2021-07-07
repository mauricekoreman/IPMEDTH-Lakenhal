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
    [theme.breakpoints.up("lg")]: {
      width: '60%',
      fontSize: 28
    },
  },
  categorieForm: {
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    alignItems: 'center'
    },
  categorieFormTextField: {
    [theme.breakpoints.up("lg")]: {
      width: '60%',
      fontSize: 28
    },
    width: "100%",
  },
  formControl: {
    margin: '0 auto'
  }
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
      <FormControlLabel className={classes.formControl}
        control={
          <Checkbox
            checked={lakenhal_activiteit}
            onChange={handleChange}
            name="checkedB"
            color="primary"
            inputProps={{ "data-testid": "testCheckbox" }}
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
        inputProps={{ "data-testid": "testCategorieInput" }}
        FormHelperTextProps={{ "data-testid": "testHelperText"}}
      />
      <Button
        onClick={onSubmit}
        className={classes.maakCategorieButton}
        variant="contained"
        color="primary"
        data-testid="buttonTestSubmit"
      >
        Maak Categorie
      </Button>
    </form>
  );
};

export default CategorieForm;
