import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(6),
  },
}));

const PostsTab = () => {
  const classes = useStyles();

  return (
    <Box className={classes.pageContainer}>
      <h1>Posts tab</h1>
    </Box>
  );
};
export default PostsTab;
