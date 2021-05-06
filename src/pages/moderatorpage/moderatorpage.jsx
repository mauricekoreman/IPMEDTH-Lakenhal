import React from "react";

import Typography from "@material-ui/core/Typography";
import CategorieForm from "../../components/categorie/categorieForm";
import CategorieList from "../../components/categorie/categorieList";

const ModeratorPage = () => (
  <>
    <Typography>Moderator page</Typography>
    <CategorieForm />
    <CategorieList />
  </>
);

const styles = {};

export default ModeratorPage;
