import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  sentBox: {
    display: "flex",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    marginTop: theme.spacing(2),
  },
}));

const FeedbackBlock = ({ success, text }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.sentBox}
      style={{ backgroundColor: success ? "#DAF9DA" : "#EE9090" }}
      data-testid="feedbackTest"
    >
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default FeedbackBlock;
