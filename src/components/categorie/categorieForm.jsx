import React, { useRef } from "react";

import { Button, TextField, Typography } from "@material-ui/core";

import axios from "axios";

const CategorieForm = (props) => {

  const TEST_URL = "http://127.0.0.1:8000/api/";

  const formEl = useRef(null);

  const onSubmit = (e) => {
    const formData = new FormData(formEl.current);
    const categorie = formData.get("categorie");
    const JSONcategorie = {categorie: categorie}
    console.log(JSONcategorie);
    axios.post(TEST_URL+"categorie/create", JSONcategorie, {
        headers: { Accept: "application/json" },
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(error => {
        console.log(error.response);
    });
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} ref={formEl}>
        <TextField id="categorie" name="categorie" label="Categorie" />
        <Button type="submit"> 
            Maak categorie 
        </Button>
    </form>
  );
}

export default CategorieForm;



