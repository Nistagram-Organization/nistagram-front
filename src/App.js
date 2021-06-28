import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts'
import { Switch, Route, Redirect } from 'react-router-dom'
import Register from './components/Register/Register'
import Toaster from './components/Toaster/Toaster'

const App = () => {
    return (
        <div className="App">
            <Header/>
            <section className="App-main">
                <Switch>
                    <Route path='/register'>
                        <Register/>
                    </Route>
                    <Route path='/posts'>
                        <Posts/>
                    </Route>
                    <Route exact path='*'>
                        <Redirect to='/posts'/>
                    </Route>
                </Switch>
            </section>
            <Toaster/>
        </div>
    )
}

export default App
