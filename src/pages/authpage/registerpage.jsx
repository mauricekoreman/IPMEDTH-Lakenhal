import React from "react";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import RegistreerForm from "../../components/authentication/registerForm";
import BigHeader from "../../components/bigHeader/bigHeader";
import { Box, makeStyles } from "@material-ui/core";

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
      <BigHeader
        text={"Registreer bij MuseumMatcht!"}
        inBlue={["MuseumMatcht!"]}
      />
      <RegistreerForm />
      <Box>
        <Typography>
          Al een account?
          <Link to="/login">Log nu in!</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
