import React from "react";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import RegistreerForm from "../../components/authentication/registerForm";

const LoginPage = () => (
  <>
    <Typography>Registreren</Typography>
    <RegistreerForm />
    <Link to="/login">Login</Link>
  </>
);

const styles = {};

export default LoginPage;



