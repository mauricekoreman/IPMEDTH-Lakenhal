import React from "react";
import AuthenticationLayout from "../../components/authentication/authenticationLayout";
import PasswordForgetForm from "../../components/authentication/passwordForgetForm";

const PasswordForgetpage = () => (
  <AuthenticationLayout
    bigHeaderText="Wachtwoord reset link"
    inBlueArr={["reset"]}
  >
    <PasswordForgetForm />
  </AuthenticationLayout>
);

export default PasswordForgetpage;
