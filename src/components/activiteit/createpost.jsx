import React, {useState, useEffect} from "react";
import { makeStyles, Typography, FormControl} from "@material-ui/core/";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from '../../contexts/authContext'
import { TextField, Button, Container, Grid, FormControlLabel, Checkbox, Select, MenuItem   } from '@material-ui/core';
import axios from "axios";
import isJson from '../../contexts/isJson'

import CheckIcon from '@material-ui/icons/Check';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: "80px",
        paddingTop: "50px",
        
        // overflow: "auto",
    },
}));

const initialValues ={
    titel :'',
    beschrijving :'',
    afbeelding :' ',
    max_aantal_deelnemers : 4,
    lakenhal_activiteit : false,
    zichtbaar :true,
    aantalGerapporteerd : 0,
    categorie :' ',
    user_ID :0, 
}

const CreatePost = () => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const TEST_URL = "http://127.0.0.1:8000/api/";
    
    let user = currentUser;
    if(isJson(currentUser)){
        user = JSON.parse(currentUser);
    }
    
    const[values, setValues] = useState(initialValues);
    const [lakenhal_activiteit, setLakenhalActiviteit] = useState(false);
    const [max_aantal_deelnemers, setMax_aantal_deelnemers] = useState(0);

    const handleInput = e => {
        const{ name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleChangeControl = (e) => {
        setLakenhalActiviteit(e.target.checked)
      }

      const handleChangeSelect = (event) => {
        setMax_aantal_deelnemers(event.target.value);
      };
    

    const onSubmit = () =>{
        values.user_ID = user.user_ID;
        values.lakenhal_activiteit = lakenhal_activiteit;
        values.max_aantal_deelnemers = max_aantal_deelnemers;
        axios.post(TEST_URL+'activiteit', values)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    return (
        <div className={classes.container}>
            <form>
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
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={lakenhal_activiteit}
                            onChange={handleChangeControl}
                            name="checkedB"
                            color="primary"
                            />
                        }
                        label="Lakenhal activiteit?"
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={max_aantal_deelnemers}
                        onChange={handleChangeSelect}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>

                </Grid>
                <Button onClick={onSubmit} variant="contained" color="primary"> 
                    Maak Post 
                </Button>
            </form>
        </div>
    );
};

export default CreatePost;
