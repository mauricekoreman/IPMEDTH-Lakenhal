import React from "react";

import Typography from "@material-ui/core/Typography";
import CategorieForm from "./categorie/categorieForm";
import CategorieList from "./categorie/categorieList";

const ModeratorPage = () => (
  <>
    <Typography>Moderator page</Typography>
    <CategorieForm />
    <CategorieList />
  </>
);

const styles = {};

export default ModeratorPage;
