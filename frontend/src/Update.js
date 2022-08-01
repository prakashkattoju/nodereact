import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from './Header'
import { Container, Paper, Box, Grid, TextField, Typography, Button } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Update = () => {
    const obj = useParams();
    //console.log(obj.id)

    const [getData, setGetData] = useState([]);

    const fetchHandler = async () => {
        const URL = `http://localhost:3300/employee/${obj.id}`;
        const fetchjson = await fetch(URL);
        const response = await fetchjson.json();
        console.log(response)
        setGetData(response)
    }

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Full Name is required'),
        skills: yup.string()
            .required('Skills are required'),
    });
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        fetchHandler()
    }, [obj.id])

    const handleChange = e =>{
        setGetData({...getData,[e.target.name]:e.target.value })
    }

    const onSubmit = async (data) => {
        console.log(data)
        var dataAdded = await fetch(`http://localhost:3300/employee/update/${obj.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => alert('Employee data updated'))
            .catch(err => console.log(err))

    };

    return (
        <div>
            <Header />
            <Container maxWidth="xl">
                <Paper sx={{ my: 5 }}>
                    <Box px={3} py={2}>
                        <Typography variant="h6" align="center" margin="dense">
                            Update Employee Details
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    margin="dense"
                                    {...register('name')}
                                    error={errors.name ? true : false}
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={getData[0]?.name}
                                    onChange={handleChange}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.name?.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="skills"
                                    name="skills"
                                    label="Skills"
                                    fullWidth
                                    margin="dense"
                                    {...register('skills')}
                                    error={errors.skills ? true : false}
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={getData[0]?.skills}
                                    onChange={handleChange}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.skills?.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default Update