import React from 'react'
import './Header.css'
import { Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="Nav">
            <div className="Nav-menus">
                <div className="Nav-brand">
                    <RouterLink className="Nav-brand-logo" to='/posts'>
                        Nistagram
                    </RouterLink>
                </div>
                <div>
                    <Button component={RouterLink} to='/register'>
                        Register
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Header
