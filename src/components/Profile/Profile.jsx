import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import SEVERITY from '../../severity'
import { Button, Checkbox, CircularProgress, FormControlLabel, Grid, TextField } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import { editUser, getUser } from '../../reducers/userReducer'

const validationSchema = yup.object({
    first_name: yup
        .string('Enter your first name')
        .required('First name is required'),
    last_name: yup
        .string('Enter your last name')
        .required('Last name is required'),
    phone: yup
        .string('Enter your phone')
        .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/)
        .required('Phone is required'),
    public: yup
        .bool('Choose your profile visibility'),
    taggable: yup
        .bool('Choose if your profile is taggable'),
    website: yup
        .string('Enter your website'),
    biography: yup
        .string('Enter your biography')
})

const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useAuth0()
    const activeUser = useSelector(state => state.users.user)
    const defaultFormValues = {
        first_name: '',
        last_name: '',
        biography: '',
        website: '',
        taggable: false,
        public: false,
        phone: ''
    }

    const stateToFormik = (user) => {
        if(!user) {
            return null
        }
        return Object.assign(
            {},
            ...['first_name', 'last_name', 'biography', 'website', 'taggable', 'public', 'phone'].map(key => ({
                [key]: user[key]
            })
            )
        )
    }

    const formik = useFormik({
        initialValues: stateToFormik(activeUser) || defaultFormValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                values.email = user.email
                await dispatch(editUser(values))
                dispatch(setNotification('Successfully edited profile information', SEVERITY.SUCCESS))
            } catch (e) {
                dispatch(setNotification('Failed to edit profile information', SEVERITY.ERROR))
            }
        },
        enableReinitialize: true
    })

    useEffect(() => {
        if(!activeUser) {
            user && dispatch(getUser(user.email))
        }
    }, [])

    if(!activeUser) {
        return (
            <CircularProgress/>
        )
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="first_name"
                        name="first_name"
                        label="First name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="last_name"
                        name="last_name"
                        label="Last name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
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
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="website"
                        name="website"
                        label="Website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="biography"
                        name="biography"
                        label="Biography"
                        multiline
                        value={formik.values.biography}
                        onChange={formik.handleChange}
                        error={formik.touched.biography && Boolean(formik.errors.biography)}
                        helperText={formik.touched.biography && formik.errors.biography}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.public}
                                id='public'
                                name='public'
                                value={formik.values.public}
                                onChange={formik.handleChange}
                            />
                        }
                        label='Make profile public?'
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.taggable}
                                id='taggable'
                                name='taggable'
                                value={formik.values.taggable}
                                onChange={formik.handleChange}
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

export default Profile