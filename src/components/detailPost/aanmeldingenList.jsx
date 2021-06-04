import React, {useEffect, useState } from "react";
import AanmeldingenCard from "./aanmeldingenCard";

import { 
    List, 
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

const CategorieList = ({AangemeldeUsers}) => {   
    console.log(AangemeldeUsers)
    const classes = useStyles(); 

    return (
        <List>
            {AangemeldeUsers.map((AangemeldeUser =>
                <AanmeldingenCard
                    AangemeldeUser={AangemeldeUser}
                />
            ))}
        </List>
    );
}

export default CategorieList;