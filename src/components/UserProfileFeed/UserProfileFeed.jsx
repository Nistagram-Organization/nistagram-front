import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import React, { useEffect } from 'react'
import { getUserByUsername } from '../../reducers/userReducer'
import { Avatar, CircularProgress, Grid } from '@material-ui/core'
import Posts from '../Posts/Posts'
import './UserProfileFeed.css'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfileFeed = () => {
    const { user } = useAuth0()
    const dispatch = useDispatch()
    const shownUser = useSelector(state => state.users.shown)

    const idMatch = useRouteMatch('/users/:username')

    useEffect(() => {
        if (!shownUser || shownUser.username !== idMatch) {
            idMatch && dispatch(getUserByUsername(idMatch.params.username))
        }
    }, [])

    if (!shownUser) {
        return (
            <CircularProgress/>
        )
    }

    return (
        <>
            <Grid container id="grid" spacing={4}>
                <Grid item xs={6}>
                    <Avatar id="avatar"><strong id="first">{shownUser.username.substr(0, 1)}</strong></Avatar>
                </Grid>
                <Grid item xs={6}>
                    <strong id="username">{shownUser.username}</strong>
                    <p>{shownUser.first_name} {shownUser.last_name}</p>
                    <i>{shownUser.biography}</i>
                </Grid>
            </Grid>
            <Posts shownUser={shownUser} loggedInUser={user.email}/>
        </>
    )
}

export default UserProfileFeed