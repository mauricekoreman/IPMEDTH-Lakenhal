import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginForm from "../../components/authentication/loginForm";
import AuthenticationLayout from "../../components/authentication/authenticationLayout";

const useStyles = makeStyles((theme) => ({
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
          Geen account?
          <Link className={classes.link} to="/register">
            Registreer nu!
          </Link>
        </Typography>
      </Box>
    </AuthenticationLayout>
  );
};

export default LoginPage;
