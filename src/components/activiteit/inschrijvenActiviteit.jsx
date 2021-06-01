import React, {useState} from "react";
import { TextField, Button, Input } from '@material-ui/core';
import axios from "axios";

const InschrijvenActiviteit = ({user, activiteit_ID}) => {
    console.log(activiteit_ID);
    const TEST_URL = "http://127.0.0.1:8000/api/";

    const initialValues ={
        user_ID: user.user_ID, 
        activiteit_ID: activiteit_ID,
        bericht: ''
    }

    const[inschrijving, setInschrijving] = useState(initialValues);

    const handleInput = e => {
        const{ name, value} = e.target
        setInschrijving({
            ...inschrijving,
            [name]:value
        })
    }

    const onSubmit = () => {
        console.log(inschrijving);
        axios.post(TEST_URL+"inschrijvingen", inschrijving, {
            headers: { Accept: "application/json" },
        }).then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    return (
        <form>
            <TextField
                label='bericht'
                name='bericht'
                value={inschrijving.inschrijving}
                onChange={handleInput}
            />
            <Button onClick={onSubmit}> 
                Verstuur
            </Button>
        </form>
    );
};

export default InschrijvenActiviteit;
