import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import SEVERITY from '../../severity'
import { Button, Checkbox, CircularProgress, FormControlLabel, Grid, TextField } from '@material-ui/core'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../../reducers/userReducer'

const validationSchema = yup.object({
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
    const roles = useSelector(state => state.authentication.roles)
    const activeUser = useSelector(state => state.users.user)

    useEffect(() => {
        if(activeUser === null) {
            dispatch(getUser(user.email, roles[0]))
        }
    }, [])

    if(!activeUser) {
        return (
            <CircularProgress/>
        )
    }

    const formik = useFormik({
        initialValues: {
            name: activeUser.name,
            surname: activeUser.surname,
            phone: activeUser.phone,
            website: activeUser.website,
            biography: activeUser.biography,
            public: activeUser.public,
            taggable: activeUser.taggable,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            alert(values)
            dispatch(setNotification('Skeet skeet', SEVERITY.SUCCESS))
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
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

export default Profile