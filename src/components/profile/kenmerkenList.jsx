import React from "react";

import KenmerkenCard from "./kenmerkenCard";

import { Grid, Box} from "@material-ui/core";

const KenmerkenList = ({user, kenmerk, onReload}) => {
    const isJson = (currentUser) => {
        try {
            JSON.parse(currentUser);
        } catch (e) {
            return false;
        }
        return true;
    }  
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