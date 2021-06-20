import React, {} from "react";
import { useForm } from "react-hook-form";
import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  fotoForm:{
    position: "absolute",
    paddingTop: "170px",
  },
}));

const ProefielFotoForm = ({ user, onReload}) => {
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const onSubmit = (profiel_foto) => {
    let fd = new FormData();
    console.log(profiel_foto);
    fd.append("profiel_foto", profiel_foto.profiel_foto[0]);
    axios
      .post(TEST_URL + "users/profielFotoUpload/" + user.user_ID, fd, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        onReload();
      })
      .catch((error) => {
        console.log(error.response);
      });

  };

  return (
    <form className={classes.fotoForm} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Button component="label" color="primary" variant="contained">
        <input hidden type="file" {...register("profiel_foto")} />
        Kies foto
      </Button>

      <Button color="primary" type="submit">
        Verander Profielfoto
      </Button>
    </form>
  );
};

export default ProefielFotoForm;
