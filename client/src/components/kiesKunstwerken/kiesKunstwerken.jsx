import React from "react";
import {
  GridList,
  GridListTile,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { kunstwerken } from "../../assets/kunstwerken";

const useStyles = makeStyles((theme) => ({
  appbar: {
    marginBottom: theme.spacing(10),
  },
  title: {},
  gridList: {
    paddingTop: theme.spacing(9),
    maxWidth: "600px",
  },
}));

const KiesKunstwerken = ({ closeScreen, setKunstwerk, index }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appbar}>
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
            Kies kunstwerk
          </Typography>
        </Toolbar>
      </AppBar>
      <GridList cellHeight={160} className={classes.gridList} cols={2}>
        {kunstwerken.map((tile) => (
          <GridListTile key={tile.id} cols={1}>
            <img
              src={tile.image}
              alt={tile.titel}
              loading="lazy"
              onClick={() => {
                setKunstwerk(tile.id, index);
                closeScreen();
              }}
              sizes="(max-width: 100px)"
            />
          </GridListTile>
        ))}
      </GridList>
    </>
  );
};

export default KiesKunstwerken;
