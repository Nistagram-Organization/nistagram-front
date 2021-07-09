import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core'
import adminService from '../../services/adminService'
import { getInappropriateContent } from '../../reducers/adminReducer'
import { setNotification } from '../../reducers/notificationReducer'
import SEVERITY from '../../severity'

const ContentReport = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const idMatch = useRouteMatch('/content-reports/:id')
    const reports = useSelector(state => state.admin.reports)
    const report = reports.find(element => element.post_id === Number(idMatch.params.id))
    const decision = {
        post_id: null,
        author_email: null,
        delete: false,
        terminate: false
    }

    const token = useSelector(state => state.authentication.token)

    useEffect(() => {
        decision.author_email = report.author_email
        decision.post_id = report.post_id
    }, [])

    const sendRequest = async (d) => {
        try {
            await adminService.decideOnPost(d, token)
            dispatch(getInappropriateContent(token))
            dispatch(setNotification('Successfully decided on post', SEVERITY.SUCCESS))
        } catch (e) {
            dispatch(setNotification('Failed to decide on post', SEVERITY.ERROR))
        }
    }

    const decideOk = () => {
        sendRequest().then(() => history.push('/content-reports'))
    }

    const decideDelete = () => {
        const d = {
            ...decision
        }
        d.delete = true
        sendRequest(d).then(() => history.push('/content-reports'))
    }

    const decideDeleteAndTerminate = async () => {
        const d = {
            ...decision
        }
        d.delete = true
        d.terminate = true
        sendRequest(d).then(() => history.push('/content-reports'))
    }

    return (
        <div>
            <article style={{ width: 400, height: 400 }}>
                <div className="Post">
                    <div className="Post-image">
                        <div className="Post-image-bg">
                            <img alt={report.description} src={report.image}/>
                        </div>
                    </div>
                    <div className="Post-caption">
                        <strong>{report.author_email}</strong> {report.description}
                    </div>
                </div>
            </article>
            <ButtonGroup>
                <Button onClick={() => decideOk()} color='primary' variant='contained'>OK</Button>
                <Button onClick={() => decideDelete()} variant='contained'>Delete</Button>
                <Button onClick={() => decideDeleteAndTerminate()} color='secondary' variant='contained'>Delete&Terminate user account</Button>
            </ButtonGroup>
        </div>
    )
}

export default ContentReport