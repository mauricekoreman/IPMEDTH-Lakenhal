import React, { forwardRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ProfileTab from "../../pages/profileTab/profileTab";

import {
  makeStyles,
  Typography,
  Dialog,
  Toolbar,
  AppBar,
  IconButton,
  Slide,
  Box,
  Button
} from "@material-ui/core";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  editButton: {
    display: "block",
    position: "fixed",
    left: "0",
    right: "0",
    margin: "0 auto",
    bottom: "1px",
    width: "99%",
  },
}));

const DetailProfileTab = ({ open, closeScreen, user, onSubmit }) => {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => closeScreen()}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => closeScreen()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Profiel inzien
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.container}>
        <ProfileTab user={user} editProfile={false} />
      </Box>
      <Button
            className={classes.editButton}
            variant="contained"
            color="primary"
            onClick={() =>  closeScreen(true)}
          >
            Accepteer aanmelding
      </Button>
    </Dialog>
  );
};

export default DetailProfileTab;
