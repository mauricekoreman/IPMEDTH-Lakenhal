import React from "react";
import AuthenticationLayout from "../../components/authentication/authenticationLayout";
import PasswordForgetForm from "../../components/authentication/passwordForgetForm";

const PasswordForgetpage = () => (
  <AuthenticationLayout
    bigHeaderText="Wachtwoord resetten"
    inBlueArr={["resetten"]}
  >
    <PasswordForgetForm />
  </AuthenticationLayout>
);

export default PasswordForgetpage;
