import React, { forwardRef, useState, useEffect } from "react";

import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../contexts/authContext";
import {
  InputLabel,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import axios from "axios";
import isJson from "../../contexts/isJson";

import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  makeStyles,
  Typography,
  FormControl,
  Dialog,
  Toolbar,
  AppBar,
  IconButton,
  Slide,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
    padding: theme.spacing(0, 2),
    maxWidth: "500px",
  },
  bottomMargin: {
    marginBottom: theme.spacing(3),
  },
  titel: {
    // marginBottom: theme.spacing(3),
  },
  beschrijving: {
    // marginBottom: theme.spacing(3),
  },
  aantalMensen: {
    //   marginBottom: theme.spacing(3),
  },
  categorie: {
    //   marginBottom: theme.spacing(3),
  },

  formControl: {
    // margin: theme.spacing(1),
    // marginTop: theme.spacing(3),
    // minWidth: 120,
  },
  fotoButton: {},
  maakPostButton: {
    width: "200px",
    margin: "0 auto",
    display: "block",
    marginTop: theme.spacing(3),
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePost = ({ open, closeScreen, onReload }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const { control, handleSubmit, register } = useForm();
  const [categorien, setCategorien] = useState();
  const [fileName, setFileName] = useState();

  let user = currentUser;
  if (isJson(currentUser)) {
    user = JSON.parse(currentUser);
  }

  useEffect(() => {
    axios
      .get(TEST_URL + "categorie")
      .then((response) => {
        setCategorien(response.data);
        console.log(categorien);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const onSubmit = (data) => {
    let fd = new FormData();

    console.log(data);

    fd.append("user_ID", user.user_ID);
    fd.append("titel", data.titel);
    fd.append("beschrijving", data.beschrijving);
    fd.append("afbeelding", data.afbeelding[0]);
    fd.append("max_aantal_deelnemers", data.max_aantal_deelnemers);
    fd.append("lakenhal_activiteit", data.categorie.lakenhal_activiteit);
    fd.append("categorie", data.categorie.categorie);

    axios
      .post(TEST_URL + "activiteit", fd, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
    onReload();
    closeScreen();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => closeScreen()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => closeScreen()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Begin een activiteit
            </Typography>
          </Toolbar>
        </AppBar>

        <Box className={classes.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column">
              <Controller
                name="titel"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Titel"
                    className={`${classes.titel} ${classes.bottomMargin}`}
                  />
                )}
              />
              <Controller
                name="beschrijving"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={8}
                    variant="outlined"
                    label="Beschrijving"
                    className={`${classes.beschrijving} ${classes.bottomMargin}`}
                  />
                )}
              />
              <Controller
                name="max_aantal_deelnemers"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    variant="outlined"
                    className={`${classes.formControl} ${classes.bottomMargin}`}
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Aantal mensen?
                    </InputLabel>
                    <Select
                      {...field}
                      name="aantalDeelnemersLabel"
                      id="aantalDeelnemers"
                      label="AantalDeelnemer"
                      className={classes.selectEmpty}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <MenuItem value={value} key={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="categorie"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    className={classes.formControl}
                    id="combo-box-demo"
                    defaultValue="categorie"
                    options={categorien}
                    onChange={(_, data) => field.onChange(data)}
                    getOptionLabel={(option) => option.categorie}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categorie"
                        variant="outlined"
                        className={`${classes.categorie} ${classes.bottomMargin}`}
                      />
                    )}
                  />
                )}
              />
              <Button component="label" color="primary" variant="outlined">
                <input
                  hidden
                  type="file"
                  {...register("profiel_foto")}
                  onChange={(e) => setFileName(e.target.files[0].name)}
                />
                {fileName == undefined ? "+ Kies foto" : fileName}
              </Button>
            </Grid>
            <Button
              type="submit"
              className={classes.maakPostButton}
              variant="contained"
              color="primary"
            >
              Maak Post
            </Button>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreatePost;
