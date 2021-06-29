import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts'
import { Switch, Redirect } from 'react-router-dom'
import Register from './components/Register/Register'
import Toaster from './components/Toaster/Toaster'
import { useAuth0 } from '@auth0/auth0-react'
import { GuardedRoute, GuardProvider } from 'react-router-guards'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from './reducers/authReducer'
import ROLE from './roles'

const App = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const roles = useSelector(state => state.authentication.roles)

    useEffect(() => {
        if(isAuthenticated && roles === null) {
            dispatch(setAuth(getAccessTokenSilently))
        }
    }, [isAuthenticated])

    const requireAuthentication = (to, from, next) => {
        if(to.meta.roles) {
            if(isAuthenticated && roles.some(r => to.meta.roles.indexOf(r) >= 0)) {
                next()
            }
            next.redirect(from)
        }
        next()
    }

    return (
        <div className="App">
            <Header/>
            <section className="App-main">
                <Switch>
                    <GuardProvider guards={[requireAuthentication]}>
                        <GuardedRoute path='/register'>
                            <Register/>
                        </GuardedRoute>
                        {/* set required roles in this manner */}
                        <GuardedRoute path='/posts' meta={{ roles: [ROLE.USER, ROLE.AGENT] }}>
                            <Posts/>
                        </GuardedRoute>
                        <GuardedRoute exact path='*'>
                            <Redirect to='/register'/>
                        </GuardedRoute>
                    </GuardProvider>
                </Switch>
            </section>
            <Toaster/>
        </div>
    )
}

export default App
