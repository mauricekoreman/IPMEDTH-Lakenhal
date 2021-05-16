import React from "react";

import Typography from "@material-ui/core/Typography";

import Fab from "../../components/fab/fab";
import { Box, makeStyles, useTheme } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  pageContainer: {
    position: "relative",
    display: "flex",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
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
    <Box className={classes.pageContainer}>
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
