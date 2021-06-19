import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  heading: {
    marginRight: 8,
  },
  blue: {
    color: theme.palette.primary.main,
  },
  normal: {
    color: "#000",
  },
}));

function checkOverlappingValues(arr1, arr2) {
  return arr1.filter(function (n) {
    return arr2.indexOf(n) !== -1;
  });
}

const BigHeader = ({ text, inBlue }) => {
  const classes = useStyles();

  let textSplit = text.split(" ");

  var wordsInBlue = checkOverlappingValues(textSplit, inBlue ?? "");

  return (
    <Box className={classes.container}>
      {textSplit.map((woord, index) => {
        if (wordsInBlue.includes(woord)) {
          return (
            <Typography
              key={index}
              className={`${classes.heading} ${classes.blue}`}
              component="h1"
              variant="h3"
            >
              {woord}
            </Typography>
          );
        } else {
          return (
            <Typography
              key={index}
              className={`${classes.heading} ${classes.normal}`}
              component="h1"
              variant="h3"
            >
              {woord}
            </Typography>
          );
        }
      })}
    </Box>
  );
};

BigHeader.propTypes = {
  inBlue: PropTypes.array,
};

export default BigHeader;
