import React, {useEffect, useState } from "react";
import AanmeldingenCard from "./aanmeldingenCard";
import axios from "axios";

import { 
    List, 
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

const AanmeldingenList = ({activiteit_ID}) => {   
    console.log(activiteit_ID);
    const classes = useStyles(); 

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const [aangemeldeUsers, setAangemeldeUsers] = useState();

    const fetchAangemeldeUsers = () =>{
        axios.get(TEST_URL+'inschrijvingen/activiteitUser/' + activiteit_ID)
        .then(response => {
            console.log(response.data)
            setAangemeldeUsers(response.data)
        })
        .catch(error => {
            console.log(error.response)
        })
    }
    
    useEffect(() => {
        console.log(aangemeldeUsers);
        fetchAangemeldeUsers()
    }, []);

    return (
        <List>
            {aangemeldeUsers && aangemeldeUsers.map((user =>
                <AanmeldingenCard
                    aangemeldeUser={user}
                />
            ))}
        </List>
    );
}

export default AanmeldingenList;