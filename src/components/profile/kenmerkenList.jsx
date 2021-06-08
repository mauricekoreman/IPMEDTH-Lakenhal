import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import KenmerkenCard from "./kenmerkenCard";
import isJson from '../../contexts/isJson';

import { Grid, Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    chips: {
      "& > *": {
        marginRight: theme.spacing(1),
      },
    },
  }));

const KenmerkenList = ({user, kenmerk, onReload}) => {
    const classes = useStyles();
    let objectKenmerken = Object.assign({kenmerk}, [user[kenmerk]]);
    if(isJson([user.interesses])){
        objectKenmerken = Object.assign({kenmerk}, JSON.parse([user[kenmerk]]));
    }

    return (
        <Box >
            <Grid direction="row" container className={classes.chips}>
                {Object.entries(objectKenmerken).map(([key, value]) => {
                    return(<KenmerkenCard
                        key={key}
                        kenmerk={objectKenmerken.kenmerk}
                        kenmerkValue={value}
                        onReload={onReload}
                    />)
                })}
            </Grid>
        </Box>
    );
}

export default KenmerkenList;