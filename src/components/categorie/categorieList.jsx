import React, {useEffect, useState } from "react";

import CategorieCard from "./categorieCard";
import CategorieForm from "./categorieForm";

import { Typography, Grid, Box} from "@material-ui/core";

import axios from "axios";

const CategorieList = () => {

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const [categorieMap, setCategorie] = useState([]);

    const fetchCategorie = () => {
        axios.get(TEST_URL+"categorie", {
            headers: { "Content-Type": "application/json" },
          })
          .then(res => {
            console.log(res.data);
            setCategorie(res.data);
          })
          .catch(error => {
            console.log(error);
            return error.response;
          });
    }

    useEffect(() => {
        fetchCategorie();
    }, []);

    return (
        <Box>
            <Typography>Categorieën</Typography>
            <CategorieForm onReload={fetchCategorie}/>
            <Grid>
                {categorieMap.map((categorie => 
                    <CategorieCard
                        key={categorie.categorie_ID}
                        categorie_ID={categorie.categorie_ID}
                        categorie={categorie.categorie}
                        onReload={fetchCategorie}
                    />
                ))}
            </Grid>
        </Box>
    );
}

export default CategorieList;