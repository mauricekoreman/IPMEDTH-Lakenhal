import React from "react";
import PropTypes from "prop-types";
import { Container, makeStyles } from "@material-ui/core";
import BigHeader from "../bigHeader/bigHeader";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  link: {
    textDecoration: "underline 1px",
    textUnderlineOffset: "3px",
    marginLeft: 4,
  },
}));

const AuthenticationLayout = ({ children, bigHeaderText, inBlueArr }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="xs">
      <BigHeader text={bigHeaderText} inBlue={inBlueArr} />
      {children}
    </Container>
  );
};

AuthenticationLayout.propTypes = {
  bigHeaderText: PropTypes.string,
  inBlueArr: PropTypes.array,
};

export default AuthenticationLayout;
