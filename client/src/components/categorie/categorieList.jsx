import React from "react";
import CategorieCard from "./categorieCard";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";

import {
  Typography,
  ListItem,
  List,
  makeStyles,
  ListItemIcon,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  zieCategorie: {
    boxShadow:
      "0px 2px 5px 0px rgb(0 0 0 / 30%), 0px 2px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    marginTop: "10%",
  },
  zieCategorieItem: {
    display: "flex",
    justifyContent: "space-between",
  },
  listTitle: {
    fontSize: "14px",
  },
  animateList: {
    animation: "$dropdown .5s ease-in-out",
  },
  "@keyframes dropdown": {
    "0%": {
      transform: "scaleY(0)",
    },
    "80%": {
      transform: "scaleY(1.1)",
    },
    "100%": {
      transform: "scaleY(1)",
    },
  },
}));

const CategorieList = ({
  categorieList,
  deleteCategorie,
  showList,
  setTheShowList,
}) => {
  console.log(categorieList);
  const classes = useStyles();
  console.log(showList);
  return (
    <List className={classes.zieCategorie}>
      <ListItem className={classes.zieCategorieItem}>
        <Typography className={classes.listTitle}>
          Categorieën inzien & verwijderen
        </Typography>
        <ListItemIcon>
          <ArrowDropDownCircleIcon onClick={() => setTheShowList(!showList)} />
        </ListItemIcon>
      </ListItem>
      {showList && (
        <div className={classes.animateList}>
          {categorieList.map((categorie) => (
            <CategorieCard
              key={categorie.categorie_ID}
              categorie={categorie.categorie}
              categorie_ID={categorie.categorie_ID}
              lakenhal={categorie.lakenhal_activiteit}
              deleteCategorie={deleteCategorie}
            />
          ))}
        </div>
      )}
    </List>
  );
};

export default CategorieList;
