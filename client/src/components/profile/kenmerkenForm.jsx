import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  voegToe: {
    display: 'block',
    margin: '0 auto',
    width: '75%',
    marginTop: theme.spacing(2)
  }
}
));

const KenmerkenForm = ({ user, kenmerk, onReload }) => {
  const classes = useStyles();
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (updateUserData) => {
    console.log(updateUserData);
    axios
      .put(TEST_URL + "users/updateKenmerk/" + user.user_ID, updateUserData, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        reset();
        onReload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={kenmerk}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label={kenmerk + ":"} fullWidth={true} />
        )}
      />
      {kenmerk === 'interesses' && 
        <Button className={classes.voegToe} type="submit" variant="contained" color="primary"> 
        + Voeg interesse toe
        </Button>
      }
      {kenmerk === 'eigenschappen' && 
        <Button className={classes.voegToe} type="submit" variant="contained" color="primary"> 
        + Voeg eigenschappen toe
        </Button>
      }
    </form>
  );
};

export default KenmerkenForm;
