import React from 'react'
import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import DetailsIcon from '@material-ui/icons/Details'
import { useHistory } from 'react-router-dom'
import './ContentReportPreview.css'

const ContentReportPreview = ({ post_id, author, image, description }) => {
    const history = useHistory()

    return (
        <GridListTile>
            <img className='preview-image' src={image} alt={`${author}:${description}`}/>
            <GridListTileBar
                title={description}
                subtitle={<span>by: {author}</span>}
                actionIcon={
                    <IconButton onClick={() => history.push(`/content-reports/${post_id}`)}>
                        <DetailsIcon/>
                    </IconButton>
                }
            />
        </GridListTile>
    )
}

export default ContentReportPreview