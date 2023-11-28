import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button, { buttonClasses } from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import QuestionAnswer from './QuestionAndAnswer';
// import Alert from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function FormComponent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        class: '',
        courses: '',
        stateOfClass: 'Neutral',
        courseContents: 'Neutral',
        audioConnectivity: 'Neutral',
        lectureStructure: 'Neutral',
        learningMaterials: 'Neutral',
        Datetime: null,
        currentCourseTopic: '',
        comments: '',
    });

    const handleChange = (value, name) => {
        console.log(name + " " + value);
        setFormData({ ...formData, [name]: value });
    };

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        PhoneNo: '',
        City: '',
        BirthDate: null,
    });
    const handleError = (e) => {
        const newErrors = {};
        if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (formData.name && !/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Invalid name format';
        }
        // if (formData.PhoneNo && !/^\d{10}$/.test(formData.PhoneNo)) {
        //     newErrors.PhoneNo = 'Invalid PhoneNo format';
        // }
        // if (formData.City && !/^[A-Za-z\s]+$/.test(formData.City)) {
        //     newErrors.City = 'Invalid City format';
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const url = 'http://localhost:8080/saveData';
            const response = await fetch(url, {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const dataResponse = await response.json(); // assuming the response is JSON
            if(response.status === 200){
                console.log(dataResponse);
                handleClick();
            }
            else{
                console.log(dataResponse);
            }
        } catch (error) {
            console.log("Error in fetch :" + error);
        }
        
        console.log(formData);
        setFormData({
            name: '',
            email: '',
            class: '',
            courses: '',
            stateOfClass: 'Neutral',
            courseContents: 'Neutral',
            audioConnectivity: 'Neutral',
            lectureStructure: 'Neutral',
            learningMaterials: 'Neutral',
            Datetime: null,
            currentCourseTopic: '',
            comments: '',
        });
        console.log("in submit");
    };

    return (
        <form onSubmit={(event) => {
            event.preventDefault(); // Prevent default form submission behavior
            if (handleError()) {
                handleSubmit(event);
            }
        }}>
            <Snackbar anchorOrigin={ {vertical:'top', horizontal:'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Data successfully inserted!
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    boxSizing: 'border-box',
                    margin: '0 auto',
                    marginTop: '20px',
                    marginBottom: '10px',
                    width: '50%',
                    borderRadius: '10px',
                    padding: '3% 5%',
                    border: '1px solid black'
                }}
            >
                <Grid container rowSpacing={2} columnSpacing={2} >
                    <Grid item xs={12} md={6} >
                        <TextField
                            required
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={(event) => handleChange(event.target.value, "name")}
                            // onBlur={handleError}
                            autoComplete="new-password"
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <TextField
                            required
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={(event) => handleChange(event.target.value, "email")}
                            autoComplete="new-password"
                            // onBlur={handleError}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">class</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-class"
                                value={formData.class}
                                label="class"
                                onChange={(event) => handleChange(event.target.value, "class")}
                            >
                                <MenuItem value={'11th'}>11th</MenuItem>
                                <MenuItem value={'12th'}>12th</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">course</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.courses}
                                label="courses"
                                onChange={(event) => handleChange(event.target.value, "courses")}
                            >
                                <MenuItem value={"Science"}>Science</MenuItem>
                                <MenuItem value={"commerce"}>commerce</MenuItem>
                                <MenuItem value={"Art"}>Art</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <QuestionAnswer handleChangeforData={handleChange} />

                    <Grid item xs={12} md={7} >
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <DatePicker
                                label="Birth Date"
                                // sx={{ width: 260 }}
                                name="BirthDate"
                                value={formData.BirthDate}
                                format="MM/DD/YYYY"
                                onChange={handleDateChange}
                                autoComplete="new-password"
                                required
                            />
                        </LocalizationProvider> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker
                                    label="Date & Time"
                                    value={formData.Datetime}
                                    onChange={(value) => {
                                        const formattedValue = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
                                        handleChange(formattedValue, 'Datetime')
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={12} >
                        {/* <FormControl> */}
                        <FormLabel>Please mention about the current course topic briefly</FormLabel>
                        <Textarea value={formData.currentCourseTopic} onChange={(e) => handleChange(e.target.value, 'currentCourseTopic')} placeholder="Type something here..." minRows={3} />
                        {/* </FormControl> */}
                    </Grid>

                    <Grid item xs={12} md={12} >
                        {/* <FormControl> */}
                        <FormLabel>We would like to here if you have any commnet/suggestions</FormLabel>
                        <Textarea
                            value={formData.comments}
                            onChange={(e) => handleChange(e.target.value, 'comments')} placeholder="Type something here..." minRows={3} />
                        {/* </FormControl> */}
                    </Grid>

                    <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" style={{ marginBottom: '10px' }} variant="contained" color="primary"  >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box >

        </form >
    );
}

export default FormComponent;
