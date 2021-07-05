import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import React, { useEffect } from 'react'
import { checkIfUserIsFollowing, followUser, getUserByUsername } from '../../reducers/userReducer'
import { Avatar, Button, CircularProgress, Grid } from '@material-ui/core'
import Posts from '../Posts/Posts'
import './UserProfileFeed.css'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfileFeed = () => {
    const { user } = useAuth0()
    const dispatch = useDispatch()
    const shownUser = useSelector(state => state.users.shown)
    const following = useSelector(state => state.users.following)

    const idMatch = useRouteMatch('/users/:username')

    useEffect(() => {
        if (!shownUser || shownUser.username !== idMatch) {
            idMatch && dispatch(getUserByUsername(idMatch.params.username))
        } else {
            if (user)
                dispatch(checkIfUserIsFollowing(shownUser.email, user.email))
        }
    }, [])

    const follow = () => {
        dispatch(followUser(shownUser.email, user.email))
    }

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
                <Grid item xs={4}>
                    <strong id="username">{shownUser.username}</strong>
                    <p>{shownUser.first_name} {shownUser.last_name}</p>
                    <i>{shownUser.biography}</i>
                </Grid>
                {user && !following && user.email && shownUser.email !== user.email ?
                    <Grid item xs={2}>
                        <Button id="followButton" variant="contained" color="primary" onClick={follow}>Follow</Button>
                    </Grid> : null}
            </Grid>
            <Posts shownUser={shownUser} loggedInUser={user ? user.email : ''}/>
        </>
    )
}

export default UserProfileFeed