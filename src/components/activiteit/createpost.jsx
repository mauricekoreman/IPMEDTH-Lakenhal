import React, {forwardRef, useState, useEffect} from "react";

import { useForm, Controller } from "react-hook-form";
import { useAuth } from '../../contexts/authContext'
import { InputLabel, FormHelperText, TextField, Button, Container, Grid, FormControlLabel, Checkbox, Select, MenuItem} from '@material-ui/core';
import axios from "axios";
import isJson from '../../contexts/isJson';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { 
    makeStyles, 
    Typography, 
    FormControl,
    Dialog,
    Toolbar,
    AppBar,
    IconButton,
    Slide
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
        width: '80%',
        margin: '0 auto'
        // overflow: "auto",
    },
    titelVeld: {
        paddingBottom: "10px",
        
        
        // overflow: "auto",
    },
    formControl: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        minWidth: 120,
      },
    lakenhalActiviteit: {
        margin: '0 auto',
        marginBottom: theme.spacing(2)
    },
    maakPostButton: {
        width: '80%',
        margin: '0 auto',
        display: 'block'
    }
    // selectEmpty: {
    //     marginTop: theme.spacing(2),
    //   },  
}));

const CreatePost = ({open, closeScreen}) => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const TEST_URL = "http://127.0.0.1:8000/api/";
    const { control, handleSubmit, register } = useForm();
    
    let user = currentUser;
    if(isJson(currentUser)){
        user = JSON.parse(currentUser);
    }

    const initialValues ={
        titel :'yoo',
        beschrijving :'',
        afbeelding :' ',
        aantalDeelnemers : 4,
        lakenhalActiviteit : false,
        zichtbaar :true,
        aantalGerapporteerd : 0,
        categorie :' ',
        user_ID : user.user_ID, 
    }
    
    const[categorien, setCategorien] = useState();
    useEffect(() => {
        axios.get(TEST_URL+'categorie')
                .then(response => {
                    console.log(response.data)
                    setCategorien(response.data)         
                })
                .catch(error => {
                    console.log(error.response)
                })
      }, []);

    const onSubmit = data =>{
        data.user_ID = user.user_ID
        data.lakenhal_activiteit = 1
        data.categorie = 'Het thuis atelier'
        console.log(data.max_aantal_deelnemers)
        axios.post(TEST_URL+'activiteit', data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    // const onSubmit = data => {
    //     data.user_ID = user.user_ID
    //     data.lakenhal_activiteit = 1
    //     data.categorie = 'Het thuis atelier'
    //     console.log(data);
    //     console.log(data.titel);
    // }

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    console.log(categorien)

    return (
        <div>
            {open &&
            <Dialog fullScreen open={open} onClose={()=> closeScreen()} TransitionComponent={Transition}> 
            <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={()=> closeScreen()} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Begin een activiteit
                </Typography>
            </Toolbar>
            </AppBar>
            <div className={classes.container} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="column">
                    <Controller
                            name="titel"
                            control={control}
                            defaultValue=''
                            render={({ field }) => 
                            <TextField {...field} variant="outlined" label="Titel" fullWidth={true}/>}
                        />
                    <Controller
                            name="beschrijving"
                            control={control}
                            defaultValue=''
                            render={({ field }) => 
                            <TextField {...field} multiline rows={8} variant="outlined" label="Beschrijving" fullWidth={true}/>}
                        />
                    <Controller
                            name="max_aantal_deelnemers"
                            control={control}
                            defaultValue=''
                            render={({ field }) => 
                            <FormControl  variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-helper-label">Aantal mensen?</InputLabel>
                                <Select {...field}
                                    name="aantalDeelnemersLabel"
                                    id="aantalDeelnemers"
                                    label="AantalDeelnemer"
                                    className={classes.selectEmpty}   
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                            }/>

                    <Controller
                            name="categorie"
                            control={control}
                            defaultValue='yo'
                            render={({ field }) => 
                            <Autocomplete 
                                className={classes.formControl}
                                id="combo-box-demo"
                                options={categorien}
                                getOptionLabel={(option) => option.categorie}
                                style={{ width: 300 }}
                                renderInput={(params) =>
                                     <TextField {...params} {...field} label="Categorie" variant="outlined" />}
                                />}
                        />

                </Grid>
                <Button type="submit" className={classes.maakPostButton} variant="contained" color="primary"> 
                    Maak Post 
                </Button>
            </form>
            </div>
        </Dialog>
        }
    </div>
            
    );
};

export default CreatePost;

