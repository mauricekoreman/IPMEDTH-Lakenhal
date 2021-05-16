import React from "react";

import Typography from "@material-ui/core/Typography";
import CategorieList from "../../components/categorie/categorieList";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
}));

const ModeratorPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.pageContainer}>
      <Typography>Moderator page</Typography>
      <CategorieList />
    </Box>
  );
};

const styles = {};

export default ModeratorPage;
