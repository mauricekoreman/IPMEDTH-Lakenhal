import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginForm from "../../components/authentication/loginForm";
import AuthenticationLayout from "../../components/authentication/authenticationLayout";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  link: {
    textDecoration: "underline 1px",
    textUnderlineOffset: "3px",
    marginLeft: 4,
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <AuthenticationLayout
      bigHeaderText="Login bij MuseumMatch!"
      inBlueArr={["MuseumMatch!"]}
    >
      <LoginForm />
      <Box style={{ textAlign: "center" }}>
        <Typography>
          Geen accound?
          <Link className={classes.link} to="/register">
            Registreer nu!
          </Link>
        </Typography>
      </Box>
    </AuthenticationLayout>
  );
};

export default LoginPage;
