import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { useAuth } from "../../contexts/authContext";
import EditProfileForm from "../../components/profile/editProfileForm";
import axios from "axios";
import { TEST_URL } from "../../assets/globalVariables";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));

const ProfileEditTab = ({ user, closeDialog }) => {
  const classes = useStyles();
   

  const { currentUser, setCurrentUser } = useAuth();

  const updateUser = () => {
    axios
      .get(TEST_URL + "users/" + user.user_ID, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(currentUser);

  return (
    <Box className={classes.pageContainer}>
      <EditProfileForm
        user={user}
        closeDialog={closeDialog}
        onReload={updateUser}
      />
    </Box>
  );
};

export default ProfileEditTab;
