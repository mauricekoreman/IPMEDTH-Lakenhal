import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import FeedbackBlock from "../feedbackBlock/feedbackBlock";

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

  const [show, setShow] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [serverText, setServerText] = useState("");

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (forgotPasswordData) => {
    console.log(forgotPasswordData);

    axios
      .post(TEST_URL + "auth/forgot-password", forgotPasswordData, {
        headers: { Accept: "applicatoin/json" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setMailSent(true);
          setServerText(res.data.message);
        } else {
          setMailSent(false);
          setServerText(res.data.message);
        }

        setShow(true);
      })
      .catch((error) => {
        console.log(error.response);
        setMailSent(false);
        setShow(true);
        setServerText("Er is een netwerk error");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        {show && <FeedbackBlock success={mailSent} text={serverText} />}
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
          Mail reset link
        </Button>
      </Grid>
    </form>
  );
};

export default PasswordForgetForm;
