import React from "react";
import AuthenticationLayout from "../../components/authentication/authenticationLayout";
import PasswordResetForm from "../../components/authentication/passwordResetForm";

const PasswordResetPage = () => {
  return (
    <AuthenticationLayout
      bigHeaderText="Wachtwoord resetten"
      inBlueArr={["resetten"]}
    >
      <PasswordResetForm />
    </AuthenticationLayout>
  );
};

export default PasswordResetPage;
