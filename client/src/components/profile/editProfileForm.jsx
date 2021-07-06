import React, { useState, forwardRef, useEffect } from "react";
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
  Dialog,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Slide,
} from "@material-ui/core";
import axios from "axios";

import KiesKunstwerken from "../kiesKunstwerken/kiesKunstwerken";
import { kunstwerken } from "../../assets/kunstwerken";

import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

import KenmerkenForm from "./kenmerkenForm";
import KenmerkenList from "./kenmerkenList";
import ProfielFotoForm from "./profielFotoForm";
import isJson from "../../contexts/isJson";
import { TEST_URL } from "../../assets/globalVariables";

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
  cardContainer: {
    marginTop: theme.spacing(7),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  cardMedia: {
    height: 140,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditProfileForm = ({ user, onReload, closeDialog }) => {
  const classes = useStyles();
  const [kunstKeuzes, setKunstKeuzes] = useState([{ id: 0 }, { id: 1 }]);
  const [kiesFotoDialogOpen, setKiesFotoDialogOpen] = useState(false);
  const [id, setId] = useState();
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    if (user.favoriete_kunst != undefined || user.favoriete_kunst !== null) {
      let Favoriete_kunst = user && Object.assign({}, [user.Favoriete_kunst]);
      if (user && isJson([user.favoriete_kunst])) {
        Favoriete_kunst = Object.assign({}, JSON.parse([user.favoriete_kunst]));
        console.log(Favoriete_kunst);
      }
      setKunstKeuzes(Favoriete_kunst);
    }
  }, [user]);

  const TEST_URL = "http://127.0.0.1:8000/api/";

  function closeFotoDialog() {
    setKiesFotoDialogOpen(false);
  }

  const settingKunstObj = (e, i) => {
    let newObj = { ...kunstKeuzes };
    newObj[i] = { id: e };
    setKunstKeuzes(newObj);
  };

  const onSubmit = (updateUserData) => {
    let newUserData = { ...updateUserData, favoriete_kunst: kunstKeuzes };
    console.log(newUserData);
    axios
      .put(TEST_URL + "users/update/" + user.user_ID, newUserData, {
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

      <Box className={classes.cardContainer}>
        {[0, 1].map((item) => (
          <Card
            className={classes.card}
            key={item}
            onClick={() => {
              setKiesFotoDialogOpen(true);
              setId(item);
            }}
          >
            <CardActionArea>
              <CardMedia
                className={classes.cardMedia}
                image={kunstwerken[kunstKeuzes[item].id].image}
                title={kunstwerken[kunstKeuzes[item].id].titel}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {kunstwerken[kunstKeuzes[item].id].titel}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Dialog
        fullScreen
        open={kiesFotoDialogOpen}
        onClose={closeFotoDialog}
        TransitionComponent={Transition}
      >
        <KiesKunstwerken
          closeScreen={closeFotoDialog}
          setKunstwerk={settingKunstObj}
          index={id}
        />
      </Dialog>
    </Container>
  );
};

export default EditProfileForm;
