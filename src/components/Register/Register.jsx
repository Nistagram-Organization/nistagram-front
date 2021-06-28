import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'
import authService from '../../services/authService'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import SEVERITY from '../../severity'

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    username: yup
        .string('Enter your username')
        .min(4, 'Username should be of minimum 4 characters length')
        .required('Username is required'),
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    surname: yup
        .string('Enter your surname')
        .required('Surname is required'),
    phone: yup
        .string('Enter your phone')
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
        .required('Phone is required'),
    birth_date: yup
        .string('Enter your birth date')
        .required('Birth date is required'),
    gender: yup
        .number('Select your gender')
        .required('Gender is required'),
    public: yup
        .bool('Choose your profile visibility'),
    taggable: yup
        .bool('Choose if your profile is taggable'),
    role: yup
        .string('Choose your role')
        .matches(/(user|agent)/)
        .required('Role is required'),
})

const Register = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            name: '',
            surname: '',
            phone: '',
            birth_date: new Date(),
            gender: 0,
            public: false,
            taggable: false,
            role: 'user'
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const registrationRequest = {
                ...values,
                birth_date: values.birth_date.getTime() / 1000
            }
            try {
                await authService.register(registrationRequest)
                dispatch(setNotification('Registration successful', SEVERITY.SUCCESS))
                // TODO: redirect to login when it is done
            } catch (e) {
                dispatch(setNotification(e.message, SEVERITY.ERROR))
            }
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="surname"
                        name="surname"
                        label="Surname"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                        helperText={formik.touched.surname && formik.errors.surname}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant='inline'
                            format='dd/MM/yyyy'
                            margin='normal'
                            id='birth_date'
                            name='birth_date'
                            label='Birth date'
                            value={formik.values.birth_date}
                            onChange={(date) => formik.setFieldValue('birth_date', new Date(date))}
                            error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
                            helperText={formik.touched.birth_date && formik.errors.birth_date}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Gender</FormLabel>
                        <RadioGroup
                            id='gender'
                            name='gender'
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                        >
                            <FormControlLabel value={0} control={<Radio/>} label='Male'/>
                            <FormControlLabel value={1} control={<Radio/>} label='Female'/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>Role</FormLabel>
                        <RadioGroup
                            id='role'
                            name='role'
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                        >
                            <FormControlLabel value='user' control={<Radio/>} label='User'/>
                            <FormControlLabel value='agent' control={<Radio/>} label='Agent'/>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id='public'
                                name='public'
                                value={formik.values.public}
                                onChange={formik.handleChange}
                                error={formik.touched.public && Boolean(formik.errors.public)}
                            />
                        }
                        label='Make profile public?'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id='taggable'
                                name='taggable'
                                value={formik.values.taggable}
                                onChange={formik.handleChange}
                                error={formik.touched.taggable && Boolean(formik.errors.taggable)}
                            />
                        }
                        label='Make profile taggable?'
                    />
                </Grid>
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </Grid>
        </form>
    )
}


export default Register