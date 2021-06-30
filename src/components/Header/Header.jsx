import React from 'react'
import './Header.css'
import { Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import LoginButton from '../LoginButton/LoginButton'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '../LogoutButton/LogoutButton'

const Header = () => {
    const { isAuthenticated } = useAuth0()

    return (
        <nav className="Nav">
            <div className="Nav-menus">
                <div>
                    <RouterLink className="Nav-brand-logo" to='/posts'>
                        Nistagram
                    </RouterLink>
                </div>
                {
                    isAuthenticated &&
                    <div>
                        <LogoutButton/>
                    </div>
                }
                {
                    !isAuthenticated &&
                    <div>
                        <LoginButton/>
                    </div>
                }
                {
                    !isAuthenticated &&
                    <div>
                        <Button component={RouterLink} to='/register'>Register</Button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Header
