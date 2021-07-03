import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Grid,
  Avatar,
  Box,
  Typography,
} from "@material-ui/core";
import axios from "axios";

import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import KenmerkenForm from "./kenmerkenForm";
import KenmerkenList from "./kenmerkenList";
import ProfielFotoForm from "./profielFotoForm";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
  },
  topButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    display: "flex",
    alignItems: "center",
  },
  profilePicture: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1, "auto"),
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  subContainer: {
    marginTop: theme.spacing(3),
  },
  submitButton: {},
  lastContainer: {
    marginTop: theme.spacing(6),
  },
}));

const EditProfileForm = ({ user, onReload, closeDialog }) => {
  const classes = useStyles();

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const { control, handleSubmit } = useForm();

  const onSubmit = (updateUserData) => {
    console.log(updateUserData);
    axios
      .put(TEST_URL + "users/update/" + user.user_ID, updateUserData, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log(res);
        onReload();
        closeDialog();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  console.log(user.profiel_foto);

  return (
    <Container maxWidth="xs">
      <ProfielFotoForm user={user} onReload={onReload} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.topButtons}>
          <Box className={classes.cancelButton}>
            <Button
              onClick={() => {
                closeDialog();
              }}
              classes={{ root: classes.root }}
            >
              <CloseIcon />
            </Button>
            <Typography className={classes.titelText} variant="h6">
              Bewerk profiel
            </Typography>
          </Box>
          <Button
            className={classes.submitButton}
            classes={{ root: classes.root }}
            color="primary"
            type="submit"
          >
            <CheckIcon />
          </Button>
        </Box>

        <Avatar
          src={
            "http://localhost:8000/storage/profiel_foto/" + user.profiel_foto
          }
          className={classes.profilePicture}
          alt={user.naam[0]}
        />

        <Grid container direction="column">
          <Box className={classes.subContainer}>
            <Controller
              name="beroep"
              control={control}
              defaultValue={user.beroep ?? ""}
              render={({ field }) => (
                <TextField {...field} label="Beroep" fullWidth={true} />
              )}
            />
          </Box>
          <Box className={classes.subContainer}>
            <Controller
              name="naam"
              control={control}
              defaultValue={user.naam ?? ""}
              render={({ field }) => (
                <TextField {...field} label="Naam" fullWidth={true} />
              )}
            />
          </Box>
          <Box className={classes.subContainer}>
            <Controller
              name="biografie"
              control={control}
              defaultValue={user.biografie ?? ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  variant="outlined"
                  label="Over jou"
                  fullWidth={true}
                />
              )}
            />
          </Box>
        </Grid>
      </form>

      <Box className={classes.subContainer}>
        <KenmerkenList user={user} kenmerk="interesses" onReload={onReload} />
        <KenmerkenForm user={user} kenmerk="interesses" onReload={onReload} />
      </Box>

      <Box className={classes.lastContainer}>
        <KenmerkenList
          user={user}
          kenmerk="eigenschappen"
          onReload={onReload}
        />
        <KenmerkenForm
          user={user}
          kenmerk="eigenschappen"
          onReload={onReload}
        />
      </Box>
    </Container>
  );
};

export default EditProfileForm;
