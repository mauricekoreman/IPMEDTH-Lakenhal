import React from "react";

import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import LoginForm from "../../components/authentication/loginForm";

const LoginPage = () => (
  <>
    <Typography>Login</Typography>
    <LoginForm />
    <Link to="/register">Registreer</Link>
  </>
);

const styles = {};

export default LoginPage;



