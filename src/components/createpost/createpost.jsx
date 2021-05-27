import React, {useState, useEffect} from "react";
import { makeStyles, Typography, FormControl} from "@material-ui/core/";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Grid } from '@material-ui/core';
import axios from "axios";

import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme) => ({

}));

const initialValues ={
    titel :'',
    beschrijving :'',
    afbeelding :'',
    aantalDeelnemers : 4,
    lakenhalActiviteit : false,
    zichtbaar :true,
    aantalGerapporteerd : 0,
    datumAangemaakt: new Date(),
    datumUpdate: new Date(),
    categorie :'',
    userID :0, 
}

const CreatePost = ({user, onReload, selectedTab}) => {
    const classes = useStyles();

    const TEST_URL = "http://127.0.0.1:8000/api/";
    
    const[values, setValues] = useState(initialValues);

    const handleInput = e => {
        const{ name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }
    const onSubmit = () =>{
        console.log(values)
        axios.post(TEST_URL+'catagorie')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
    

    return (
        <form >
            <Grid container direction="column">
                <TextField
                label='Titel'
                name='titel'
                value={values.titel}
                onChange={handleInput}
                />
                <TextField
                label='beschrijving'
                name='beschrijving'
                multiline
                rowsMax={8}
                value={values.beschrijving}
                onChange={handleInput}
                />
            </Grid>
            <Button onClick={onSubmit} variant="contained" color="primary"> 
                Maak Post 
            </Button>
        </form>
    );
};

export default CreatePost;
