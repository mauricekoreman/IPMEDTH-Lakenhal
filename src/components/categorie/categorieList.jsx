import React, {useEffect, useState } from "react";

import CategorieCard from "./categorieCard";
import CategorieForm from "./categorieForm";

import { Typography, Grid, Box} from "@material-ui/core";

const CategorieList = ({categorieList, deleteCategorie}) => {
    console.log(categorieList)
    return (
        <Box>
            <Typography>Categorieën</Typography>
                {categorieList.map((categorie => 
                    <CategorieCard
                        key={categorie.categorie_ID}
                        categorie={categorie.categorie}
                        categorie_ID={categorie.categorie_ID}
                        lakenhal={categorie.lakenhal_activiteit}  
                        deleteCategorie={deleteCategorie} 
                    />
                ))}
        </Box>
    );
}

export default CategorieList;