import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginForm from "../../components/authentication/loginForm";
import BigHeader from "../../components/bigHeader/bigHeader";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <BigHeader text={"Login bij MuseumMatch!"} inBlue={["MuseumMatch!"]} />
      <LoginForm />
      <Link to="/register">Registreer</Link>
    </Box>
  );
};

export default LoginPage;
