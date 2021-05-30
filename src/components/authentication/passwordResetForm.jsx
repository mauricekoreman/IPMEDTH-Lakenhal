import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import FeedbackBlock from "../feedbackBlock/feedbackBlock";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 25,
  },
  resetButton: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
}));

const PasswordResetForm = () => {
  const classes = useStyles();
  const { token } = useParams();

  const [passwordResetted, setPasswordResetted] = useState(false);

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (resetData) => {
    let resetDataWithToken = { ...resetData, token: token };

    axios
      .post(TEST_URL + "auth/reset-password", resetDataWithToken, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log("resetted password", res);
        setPasswordResetted(true);
      })
      .catch((error) => {
        console.log("error shit", error.response);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        {passwordResetted && (
          <FeedbackBlock
            success={passwordResetted}
            text={"Uw wachtwoord is gereset!"}
          />
        )}
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
                helperText={errors.password ? errors.password.message : ""}
                error={!!errors.password}
              />
            )}
            rules={{
              required: "Verplicht",
              validate: (value) =>
                value === password.current ||
                "De wachtwoorden komen niet overeen",
            }}
          />
        </FormControl>
        <Button
          className={classes.resetButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Reset wachtwoord
        </Button>
      </Grid>
    </form>
  );
};

export default PasswordResetForm;
