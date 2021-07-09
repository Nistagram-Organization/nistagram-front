import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInappropriateContent } from '../../reducers/adminReducer'
import { CircularProgress, GridList } from '@material-ui/core'
import './ContentReports.css'
import ContentReportPreview from '../ContentReportPreview/ContentReportPreview'

const ContentReports = () => {
    const reports = useSelector(state => state.admin.reports)
    const token = useSelector(state => state.authentication.token)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInappropriateContent(token))
    }, [])


    if(reports === null || reports === undefined) {
        return (
            <CircularProgress/>
        )
    }

    if(reports === []) {
        return (
            <h2>No active content reports!</h2>
        )
    }

    return (
        <div className='root'>
            <GridList className='Grid-list' cols={2.5}>
                {
                    reports.map(report => (
                            <ContentReportPreview
                                key={report.post_id}
                                post_id={report.post_id}
                                author={report.author_email}
                                description={report.description}
                                image={report.image}
                            />
                        )
                    )
                }
            </GridList>
        </div>
    )
}

export default ContentReports