import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts'
import { Switch, Redirect, Route } from 'react-router-dom'
import Register from './components/Register/Register'
import Toaster from './components/Toaster/Toaster'
import { useAuth0 } from '@auth0/auth0-react'
import { GuardedRoute, GuardProvider } from 'react-router-guards'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from './reducers/authReducer'
import ROLE from './roles'
import Profile from './components/Profile/Profile'
import CreatePost from './components/CreatePost/CreatePost'
import ContentReports from './components/ContentReports/ContentReports'
import AgentRequests from './components/AgentRequests/AgentRequests'
import ContentReport from './components/ContentReport/ContentReport'
import UserProfileFeed from './components/UserProfileFeed/UserProfileFeed'

const App = () => {
    const dispatch = useDispatch()
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
    const roles = useSelector(state => state.authentication.roles)
    const role = isAuthenticated && roles ? roles[0] : null

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            dispatch(setAuth(getAccessTokenSilently))
        }
    }, [isAuthenticated])

    const requireAuthentication = (to, from, next) => {
        if (to.meta.roles) {
            if (isAuthenticated && roles.some(r => to.meta.roles.indexOf(r) >= 0)) {
                next()
            }
            next.redirect(from)
        }
        next()
    }

    switch (role) {
        case null: {
            return (
                <div className="App">
                    <Header/>
                    <section className="App-main">
                        <Switch>
                            <Route path='/register'>
                                <Register/>
                            </Route>
                            <Route path='/public'>
                                <div>Public posts</div>
                            </Route>
                            <Route exact path='/users/:username'>
                                <UserProfileFeed/>
                            </Route>
                            <Route exact path='/'>
                                <Redirect to='/public'/>
                            </Route>
                        </Switch>
                    </section>
                    <Toaster/>
                </div>
            )
        }
        case ROLE.ADMIN: {
            return (
                <div className="App">
                    <Header/>
                    <section className="App-main">
                        <Switch>
                            <GuardProvider guards={[requireAuthentication]}>
                                <GuardedRoute path='/content-reports/:id' meta={{ roles: [ROLE.ADMIN] }}>
                                    <ContentReport/>
                                </GuardedRoute>
                                <GuardedRoute exact path='/content-reports' meta={{ roles: [ROLE.ADMIN] }}>
                                    <ContentReports/>
                                </GuardedRoute>
                                <GuardedRoute path='/agent-requests' meta={{ roles: [ROLE.ADMIN] }}>
                                    <AgentRequests/>
                                </GuardedRoute>
                                <Route exact path='/'>
                                    <Redirect to='/content-reports'/>
                                </Route>
                            </GuardProvider>
                        </Switch>
                    </section>
                    <Toaster/>
                </div>
            )
        }
        default: {
            return (
                <div className="App">
                    <Header/>
                    <section className="App-main">
                        <Switch>
                            <GuardProvider guards={[requireAuthentication]}>
                                <GuardedRoute path='/profile' meta={{ roles: [ROLE.USER, ROLE.AGENT] }}>
                                    <Profile/>
                                </GuardedRoute>
                                <GuardedRoute path='/posts' meta={{ roles: [ROLE.USER, ROLE.AGENT] }}>
                                    <Posts loggedInUser={user.email}/>
                                </GuardedRoute>
                                <GuardedRoute path='/create-post' meta={{ roles: [ROLE.USER, ROLE.AGENT] }}>
                                    <CreatePost/>
                                </GuardedRoute>
                                <Route exact path='/users/:username'>
                                    <UserProfileFeed/>
                                </Route>
                                <Route exact path='/'>
                                    <Redirect to='/posts'/>
                                </Route>
                            </GuardProvider>
                        </Switch>
                    </section>
                    <Toaster/>
                </div>
            )
        }
    }
}

export default App
