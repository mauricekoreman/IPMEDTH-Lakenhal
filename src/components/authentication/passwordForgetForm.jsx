import React from "react";
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 25,
  },
  submitButton: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
}));

const PasswordForgetForm = () => {
  const classes = useStyles();

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (forgotPasswordData) => {
    console.log(forgotPasswordData);

    axios
      .post(TEST_URL + "auth/forgot-password", forgotPasswordData, {
        headers: { Accept: "applicatoin/json" },
      })
      .then((res) => {
        console.log("SUCCESS", res);
      })
      .catch((error) => {
        console.log("a wild error occured!", error.response);
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
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Verstuur reset mail
        </Button>
      </Grid>
    </form>
  );
};

export default PasswordForgetForm;
