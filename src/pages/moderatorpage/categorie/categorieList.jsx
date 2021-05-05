import React, { setState, useEffect, useState, Fragment } from "react";

import CategorieCard from "./categorieCard";

import { Typography} from "@material-ui/core";

import axios from "axios";

const CategorieList = () => {

    const TEST_URL = "http://127.0.0.1:8000/api/";

const [categorieMap, setCategorie] = useState([]);

    useEffect(() => {
        axios.get(TEST_URL+"categorie",  {
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
      }, []);

  
    return (
        <Fragment>
            <Typography>Categorieën</Typography>
            <section>
                {categorieMap.map((categorie => 
                    <CategorieCard
                        key={categorie.categorie_ID}
                        categorie={categorie.categorie}
                    />
                ))}
            </section>
        </Fragment>
    );
}

export default CategorieList;