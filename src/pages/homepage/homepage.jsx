import React from "react";

import Typography from "@material-ui/core/Typography";

import Fab from "../../components/fab/fab";
import { Box, makeStyles, useTheme } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    display: "flex",
  },
  fabPosition: {
    margin: 0,
    top: "auto",
    right: theme.spacing(2),
    bottom: theme.spacing(2) + 56, // 56 == root height of bottom bar
    left: "auto",
    position: "fixed",
  },
}));

const Homepage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography>Homepage</Typography>
      <Fab
        position={classes.fabPosition}
        color={"primary"}
        ariaLabel="schrijf post"
        size="medium"
      />
    </Box>
  );
};

export default Homepage;
