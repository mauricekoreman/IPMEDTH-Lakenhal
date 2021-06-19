import DeleteIcon from "@material-ui/icons/Delete";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardMediaLogo: {
    width: theme.spacing(3.5),
    height: theme.spacing(4),
    position: "absolute",
    right: "8px",
  },
}));

const CategorieCard = ({
  categorie,
  deleteCategorie,
  lakenhal,
  categorie_ID,
}) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemText primary={categorie} />
      <ListItemIcon>
        <DeleteIcon onClick={() => deleteCategorie(categorie_ID)} />
      </ListItemIcon>
      {lakenhal ? (
        <CardMedia
          className={classes.cardMediaLogo}
          component="img"
          alt="Lakenhal logo"
          src={lakenhal_sw}
          title="Lakenhal logo"
        />
      ) : (
        ""
      )}
    </ListItem>
  );
};

export default CategorieCard;
