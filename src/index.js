import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Auth0Provider
                domain='dev-6w-2hyw1.eu.auth0.com'
                clientId='qcznJ0JYOuwLnD1B3wtbu6pT3b7tQxY0'
                audience='https://nistagram-auth/'
                redirectUri='http://localhost:3001/posts'
                useRefreshTokens={true}
            >
                <App/>
            </Auth0Provider>
        </Provider>
    </Router>,
    document.getElementById('root')
)
