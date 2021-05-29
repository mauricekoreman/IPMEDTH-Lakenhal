import React from "react";
import AuthenticationLayout from "../../components/authentication/authenticationLayout";
import ResetPasswordForm from "../../components/authentication/resetPasswordForm";

const PasswordResetPage = () => {
  return (
    <AuthenticationLayout
      bigHeaderText="Wachtwoord resetten"
      inBlueArr={["resetten"]}
    >
      <ResetPasswordForm />
    </AuthenticationLayout>
  );
};

export default PasswordResetPage;
