import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import React, { useEffect } from 'react'
import {
    blockUser,
    checkIfUserIsBlocked,
    checkIfUserIsFollowing,
    checkIfUserIsMuted,
    followUser,
    getUserByUsername,
    muteUser
} from '../../reducers/userReducer'
import { Avatar, Button, CircularProgress, Grid } from '@material-ui/core'
import Posts from '../Posts/Posts'
import './UserProfileFeed.css'
import { useAuth0 } from '@auth0/auth0-react'

const UserProfileFeed = () => {
    const { user } = useAuth0()
    const dispatch = useDispatch()
    const shownUser = useSelector(state => state.users.shown)
    const following = useSelector(state => state.users.following)
    const muted = useSelector(state => state.users.muted)
    const blocked = useSelector(state => state.users.blocked)

    const token = useSelector(state => state.authentication.token)

    const idMatch = useRouteMatch('/users/:username')

    useEffect(() => {
        if (!shownUser || shownUser.username !== idMatch) {
            idMatch && dispatch(getUserByUsername(idMatch.params.username))
        }
        if (user && shownUser) {
            dispatch(checkIfUserIsFollowing(shownUser.email, user.email))
            dispatch(checkIfUserIsMuted(shownUser.email, user.email))
            dispatch(checkIfUserIsBlocked(shownUser.email, user.email))
        }
    }, [])

    const follow = () => {
        dispatch(followUser(shownUser.email, user.email, token))
    }

    const mute = () => {
        dispatch(muteUser(shownUser.email, user.email, token))
    }

    const block = () => {
        dispatch(blockUser(shownUser.email, user.email, token))
    }

    if (!shownUser) {
        return (
            <CircularProgress/>
        )
    }

    return (
        <>{!user || (user && !blocked) ? <>
                <Grid container id="grid" spacing={4}>
                    <Grid item xs={6}>
                        <Avatar id="avatar"><strong id="first">{shownUser.username.substr(0, 1)}</strong></Avatar>
                    </Grid>
                    <Grid item xs={4}>
                        <strong id="usrnm">{shownUser.username}</strong>
                        <p>{shownUser.first_name} {shownUser.last_name}</p>
                        <i>{shownUser.biography}</i>
                    </Grid>
                    {user && !following && user.email && shownUser.email !== user.email ?
                        <Grid item xs={2}>
                            <Button id="followButton" variant="contained" color="primary" onClick={follow}>Follow</Button>
                        </Grid> : null}
                    {user && following && !muted && user.email && shownUser.email !== user.email ?
                        <Grid item xs={2}>
                            <Button id="muteButton" variant="contained" color="primary" onClick={mute}>Mute</Button>
                        </Grid> : null}
                    {user && !blocked && user.email && shownUser.email !== user.email ?
                        <Grid item xs={2}>
                            <Button id="blockButton" variant="contained" color="primary" onClick={block}>Block</Button>
                        </Grid> : null}
                </Grid>
                <Posts shownUser={shownUser} loggedInUser={user ? user.email : ''}/></> : null}
            {blocked ? <div><strong id="block">This profile is blocked.</strong>
            </div> : null}
        </>
    )
}

export default UserProfileFeed