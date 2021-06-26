import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <nav className="Nav">
            <div className="Nav-menus">
                <div className="Nav-brand">
                    <a className="Nav-brand-logo" href="/">
                        Nistagram
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Header
