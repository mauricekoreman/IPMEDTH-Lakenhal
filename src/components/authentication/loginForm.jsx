import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  makeStyles,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { useAuth } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: 0,
  },
  formControl: {
    marginTop: 25,
  },
  loginButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const [generalLoginError, setGeneralLoginError] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const history = useHistory();
  const { setCurrentUser } = useAuth();

  const onSubmit = async (loginData) => {
    console.log(loginData);
    axios
      .post(TEST_URL + "auth/login", loginData, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          //useContext user
          setCurrentUser(res.data.data);
          //localstorgae user
          localStorage.setItem("user", JSON.stringify(res.data.data));
          //localstorgae user token
          localStorage.setItem("token", JSON.stringify(res.data.token));
          //ga naar homepage
          history.push("/");
        } else {
          reset({ formState: true });
        }
      })
      .catch((error) => {
        setGeneralLoginError(true);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <FormControl className={classes.formControl}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={"Email"}
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
                label={"Password"}
                type="password"
                helperText={errors.password ? errors.password.message : ""}
                error={!!errors.password}
              />
            )}
            rules={{
              required: "Verplicht",
              minLength: { value: 5, message: "wachtwoord is te kort" },
            }}
          />
        </FormControl>
        {generalLoginError && (
          <Typography style={{ marginTop: 10 }}>
            Wachtwoord of e-mailadres is verkeerd
          </Typography>
        )}
        <Button
          className={classes.loginButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Ga verder
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
