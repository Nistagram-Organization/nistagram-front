import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Snackbar } from '@material-ui/core'
import { setNotification } from '../../reducers/notificationReducer'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '../Alert/Alert'

const Toaster = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.notification.message)
    const severity = useSelector(state => state.notification.severity)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setNotification(null, null))
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={message !== null}
            autoHideDuration={3000}
            onClose={handleClose}
            action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        >
            {
                message &&
                <Alert
                    onClose={handleClose}
                    severity={severity}
                >
                    {message}
                </Alert>
            }
        </Snackbar>
    )
}

export default Toaster