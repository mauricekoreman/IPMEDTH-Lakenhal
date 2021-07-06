import React from "react";

import { Chip } from "@material-ui/core";

import axios from "axios";
import { TEST_URL } from "../../assets/globalVariables";

const KenmerkenCard = ({ kenmerk, kenmerkValue, onReload }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const handleDelete = (kenmerkValue) => () => {
    onSubmit({ [kenmerk]: kenmerkValue });
  };

  const onSubmit = (deleteKenmerk) => {
    axios
      .put(TEST_URL + "users/deleteKenmerk/" + user.user_ID, deleteKenmerk, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        onReload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  if (kenmerk === kenmerkValue) {
    kenmerkValue = null;
  }
  return (
    <div>
      {kenmerkValue != null && (
        <Chip
          name="checked"
          label={kenmerkValue}
          onDelete={handleDelete(kenmerkValue)}
        />
      )}
    </div>
  );
};

export default KenmerkenCard;
