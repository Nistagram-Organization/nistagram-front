import React from 'react'
import './Header.css'
import { Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import LoginButton from '../LoginButton/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '../LogoutButton/LogoutButton'
import { useSelector } from 'react-redux'
import ROLE from '../../roles'

const Header = () => {
    const { isAuthenticated } = useAuth0()
    const roles = useSelector(state => state.authentication.roles)
    const role = isAuthenticated && roles ? roles[0] : null

    switch (role) {
        case null: {
            return (
                <nav className="Nav">
                    <div className="Nav-menus">
                        <div>
                            <RouterLink className="Nav-brand-logo" to='/posts'>
                                Nistagram
                            </RouterLink>
                        </div>
                        <div>
                            <LoginButton/>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/register'>Register</Button>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/search'>Search</Button>
                        </div>
                    </div>
                </nav>
            )
        }
        case ROLE.ADMIN: {
            return (
                <nav className="Nav">
                    <div className="Nav-menus">
                        <div>
                            <RouterLink className="Nav-brand-logo" to='/posts'>
                                Nistagram
                            </RouterLink>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/content-reports'>Content reports</Button>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/agent-requests'>Create post</Button>
                        </div>
                        <div>
                            <LogoutButton/>
                        </div>
                    </div>
                </nav>
            )
        }
        default: {
            return (
                <nav className="Nav">
                    <div className="Nav-menus">
                        <div>
                            <RouterLink className="Nav-brand-logo" to='/posts'>
                                Nistagram
                            </RouterLink>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/posts'>Feed</Button>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/create-post'>Create post</Button>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/search'>Search</Button>
                        </div>
                        <div>
                            <Button component={RouterLink} to='/profile'>Profile</Button>
                        </div>
                        <div>
                            <LogoutButton/>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}

export default Header
