import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import RegistreerForm from "../../components/authentication/registerForm";
import { Box, makeStyles } from "@material-ui/core";
import AuthenticationLayout from "../../components/authentication/authenticationLayout";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  link: {
    textDecoration: "underline 1px",
    textUnderlineOffset: "3px",
    marginLeft: 4,
  },
}));

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <AuthenticationLayout
      bigHeaderText="Registreer bij MuseumMatch!"
      inBlueArr={["MuseumMatch!"]}
    >
      <RegistreerForm />
      <Box style={{ textAlign: "center" }}>
        <Typography>
          Al een account?
          <Link className={classes.link} to="/login">
            Login!
          </Link>
        </Typography>
      </Box>
    </AuthenticationLayout>
  );
};

export default RegisterPage;
