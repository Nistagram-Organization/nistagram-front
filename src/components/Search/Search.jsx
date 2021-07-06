import * as yup from 'yup'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Avatar, Button, Card, CardActions, CardContent, Grid, TextField } from '@material-ui/core'
import './Search.css'
import { getUserByUsername } from '../../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { searchTags } from '../../reducers/postReducer'
import { useAuth0 } from '@auth0/auth0-react'
import Posts from '../Posts/Posts'

const searchProfilesSchema = yup.object().shape({
    profile: yup.string().required('Profile is required')
})

const searchTagsSchema = yup.object().shape({
    tag: yup.string().required('Tag is required')
})

const Search = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useAuth0()
    const [searchedProfile, setSearchedProfile] = useState(false)
    const [searchedTag, setSearchedTag] = useState(false)

    const shownUser = useSelector(state => state.users.shown)

    const searchProfilesFormik = useFormik({
        initialValues: {
            profile: ''
        },
        validationSchema: searchProfilesSchema,
        onSubmit: async (values) => {
            dispatch(getUserByUsername(values.profile))
            setSearchedProfile(true)
            setSearchedTag(false)
        }
    })

    const searchTagsFormik = useFormik({
        initialValues: {
            tag: ''
        },
        validationSchema: searchTagsSchema,
        onSubmit: async (values) => {
            dispatch(searchTags(values.tag, user ? user.email : ''))
            setSearchedProfile(false)
            setSearchedTag(true)
        }
    })

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <form onSubmit={searchProfilesFormik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="profile"
                            name="profile"
                            label="Search profiles"
                            value={searchProfilesFormik.values.username}
                            onChange={searchProfilesFormik.handleChange}
                            error={searchProfilesFormik.touched.profile && Boolean(searchProfilesFormik.errors.profile)}
                            helperText={searchProfilesFormik.touched.profile && searchProfilesFormik.errors.profile}
                        /><br/><br/>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Search profiles
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <form onSubmit={searchTagsFormik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="tag"
                            name="tag"
                            label="Search tags"
                            value={searchTagsFormik.values.tag}
                            onChange={searchTagsFormik.handleChange}
                            error={searchTagsFormik.touched.tag && Boolean(searchTagsFormik.errors.tag)}
                            helperText={searchTagsFormik.touched.tag && searchTagsFormik.errors.tag}
                        /><br/><br/>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Search tags
                        </Button>
                    </form>
                </Grid>
            </Grid>
            <br/><br/>
            {shownUser && searchedProfile ? <Card>
                <CardContent>
                    <Grid container id="grid" spacing={4}>
                        <Grid item xs={6}>
                            <Avatar id="avatar"><strong id="first">{shownUser.username.substr(0, 1)}</strong></Avatar>
                        </Grid>
                        <Grid item xs={4}>
                            <strong id="username">{shownUser.username}</strong>
                            <p>{shownUser.first_name} {shownUser.last_name}</p>
                            <i>{shownUser.biography}</i>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" fullWidth onClick={() => history.push('/users/' + shownUser.username)}>
                        Go to profile
                    </Button>
                </CardActions>
            </Card> : null}

            {searchedTag ? <Posts loggedInUser={user ? user.email : ''} search={true} /> : null}
        </>
    )
}

export default Search