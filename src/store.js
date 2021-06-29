import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import postReducer from './reducers/postReducer'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'

const reducer = combineReducers({
    posts: postReducer,
    notification: notificationReducer,
    authentication: authReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store