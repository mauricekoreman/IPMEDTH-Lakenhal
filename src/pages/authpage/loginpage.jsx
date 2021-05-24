import React from "react";

import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginForm from "../../components/authentication/loginForm";
import BigHeader from "../../components/bigHeader/bigHeader";

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
    <Container className={classes.container} maxWidth="xs">
      <BigHeader text={"Login bij MuseumMatch!"} inBlue={["MuseumMatch!"]} />
      <LoginForm />
      <Box style={{ textAlign: "center" }}>
        <Typography>
          Geen accound?
          <Link className={classes.link} to="/register">
            Registreer nu!
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
