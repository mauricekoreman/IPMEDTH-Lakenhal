import React, { useState } from "react";
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
import { TEST_URL } from "../../assets/globalVariables";

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

  const [show, setShow] = useState(false);
  const [passwordResetted, setPasswordResetted] = useState(false);
  const [serverText, setServerText] = useState("");

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (resetData) => {
    let resetDataWithToken = { ...resetData, token: token };

    axios
      .post(TEST_URL + "auth/reset-password", resetDataWithToken, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setPasswordResetted(true);
          setServerText(res.data.message);
        } else {
          setPasswordResetted(false);
          setServerText(res.data.message);
        }
        setShow(true);
      })
      .catch((error) => {
        console.log(error.response);
        setPasswordResetted(false);
        setShow(true);
        setServerText("Er is een netwerk error");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        {show && <FeedbackBlock success={passwordResetted} text={serverText} />}
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
