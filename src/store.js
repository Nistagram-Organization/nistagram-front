import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import postReducer from './reducers/postReducer'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import adminReducer from './reducers/adminReducer'

const reducer = combineReducers({
    users: userReducer,
    posts: postReducer,
    notification: notificationReducer,
    authentication: authReducer,
    admin: adminReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store