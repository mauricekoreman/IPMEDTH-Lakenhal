import React, {useState} from "react";
import { TextField, Button, Box } from '@material-ui/core';
import axios from "axios";

const InschrijvenActiviteit = ({user, activiteit_ID}) => {
    const TEST_URL = "http://127.0.0.1:8000/api/";

    const [show, setShow] = useState(false);

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
        <Box>
            {show === false ?
                <Button variant="contained" color="primary" onClick={() => setShow(prev => !prev)}> 
                    Doe Mee!
                </Button>
            :
                <form>
                    <TextField
                        label='bericht'
                        name='bericht'
                        value={inschrijving.inschrijving}
                        onChange={handleInput}
                        helperText="optioneel* Vertel waarom je mee wilt doen."
                    />
                    <Button variant="contained" color="primary" onClick={onSubmit}> 
                        Verstuur
                    </Button>
                    <Button onClick={() => setShow(prev => !prev)}> 
                        Annuleer
                    </Button>
                </form>
            }


        </Box>
    );
};

export default InschrijvenActiviteit;
