import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import axios from "axios";

const InteresseEigenschapForm = ({user, input}) => {

    const TEST_URL = "http://127.0.0.1:8000/api/";

    const { control, handleSubmit } = useForm();

    const onSubmit = async (updateUserData) => {
        console.log(updateUserData);
        axios.put(TEST_URL+"users/updateJSON/"+user.user_ID, updateUserData, {
            headers: { Accept: "application/json" },
        }).then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.log(error.response);
        });
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name={input}
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField {...field} label={input}/>}
                />
            <Button type="submit"> 
                <ArrowRightRoundedIcon />
            </Button>
        </form>
    );
};

export default InteresseEigenschapForm;
