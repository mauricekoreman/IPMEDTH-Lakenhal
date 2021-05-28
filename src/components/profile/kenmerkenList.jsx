import React from "react";

import KenmerkenCard from "./kenmerkenCard";
import isJson from '../../contexts/isJson';

import { Grid, Box} from "@material-ui/core";

const KenmerkenList = ({user, kenmerk, onReload}) => {
    let objectKenmerken = Object.assign({kenmerk}, [user[kenmerk]]);
    if(isJson([user.interesses])){
        objectKenmerken = Object.assign({kenmerk}, JSON.parse([user[kenmerk]]));
    }

    return (
        <Box>
            <Grid>
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