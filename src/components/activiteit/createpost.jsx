import React, {useState, useEffect} from "react";
import { makeStyles, Typography, FormControl} from "@material-ui/core/";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from '../../contexts/authContext'
import { TextField, Button, Container, Grid, Box } from '@material-ui/core';
import axios from "axios";
import isJson from '../../contexts/isJson'

import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme) => ({

}));

const CreatePost = () => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const TEST_URL = "http://127.0.0.1:8000/api/";
    
    let user = currentUser;
    if(isJson(currentUser)){
        user = JSON.parse(currentUser);
    }

    const initialValues ={
        titel :'',
        beschrijving :'',
        afbeelding :' ',
        aantalDeelnemers : 4,
        lakenhalActiviteit : false,
        zichtbaar :true,
        aantalGerapporteerd : 0,
        categorie :' ',
        user_ID : user.user_ID, 
    }
    
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
        console.log(user.user_ID)
        axios.post(TEST_URL+'activiteit', values)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
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
