import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 25,
  },
  registerButton: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
}));

const RegistreerForm = () => {
  const classes = useStyles();

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const [generalLoginError, setGeneralLoginError] = useState();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({});

  const onSubmit = async (registerData) => {
    console.log(registerData);
    axios
      .post(TEST_URL + "auth/register", registerData, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          history.push("/login");
        } else {
          reset({ formState: true });
        }
      })
      .catch((error) => {
        setGeneralLoginError(true);
        console.log(error.response);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <FormControl className={classes.formControl}>
          <Controller
            name="naam"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={"Naam"}
                variant="standard"
                helperText={errors.naam ? errors.naam.message : ""}
                error={!!errors.naam}
              />
            )}
            rules={{
              required: "Verplicht",
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="standard"
                helperText={errors.email ? errors.email.message : ""}
                error={!!errors.email}
              />
            )}
            rules={{
              required: "Verplicht",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "ongeldig e-mailadres",
              },
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Wachtwoord"
                variant="standard"
                type="password"
                helperText={errors.password ? errors.password.message : ""}
                error={!!errors.password}
              />
            )}
            rules={{
              required: "Verplicht",
              minLength: {
                value: 5,
                message: "Wachtwoord moet minimaal 5 karakters bevatten",
              },
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller
            name="password_confirmation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Bevestig wachtwoord"
                variant="standard"
                type="password"
                helperText={
                  errors.password_confirmation
                    ? errors.password_confirmation.message
                    : ""
                }
                error={!!errors.password_confirmation}
              />
            )}
            rules={{
              required: "Verplicht",
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "The passwords do not match";
                }
              },
            }}
          />
        </FormControl>
        {generalLoginError && (
          <Typography style={{ marginTop: 10 }}>
            Emailadres is al in gebruik
          </Typography>
        )}
        <Button
          className={classes.registerButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Registreer
        </Button>
      </Grid>
    </form>
  );
};

export default RegistreerForm;
