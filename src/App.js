import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts'

const App = () => {
    return (
        <div className="App">
            <Header/>
            <section className="App-main">
                <Posts/>
            </section>
        </div>
    )
}

export default App
