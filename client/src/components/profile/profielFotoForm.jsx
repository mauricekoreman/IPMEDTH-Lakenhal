import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import axios from "axios";

const ProefielFotoForm = ({ user, onReload }) => {
  const TEST_URL = "http://127.0.0.1:8000/api/";

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
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <input type="file" {...register("profiel_foto")} />
      <Button color="primary" type="submit">
        Verander Profielfoto
      </Button>
    </form>
  );
};

export default ProefielFotoForm;
