import React, { useState } from 'react'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

import './Post.css'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import {
    Report,
    ReportOutlined,
    ThumbDown,
    ThumbDownAltOutlined,
    ThumbUpAlt,
    ThumbUpAltOutlined
} from '@material-ui/icons'
import { dislikePost, likePost, reportPost } from '../../reducers/postReducer'
import { useDispatch } from 'react-redux'

const Post = ({ username, image, description }) => {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [reported, setReported] = useState(false)

    const like = () => {
        if (!disliked) {
            dispatch(likePost(1, 1, liked))
        }
    }

    const dislike = () => {
        if (!liked) {
            dispatch(dislikePost(1, 1, disliked))
        }
    }

    const report = () => {
        if (reported)
            return
        setReported(true)
        dispatch(reportPost(1))
    }

    return (
        <article className="Post">
            <header>
                <div className="Post-user">
                    <div className="Post-user-avatar">
                        <AccountCircleOutlinedIcon/>
                    </div>
                    <div className="Post-user-nickname">
                        <span>{username}</span>
                    </div>
                </div>
            </header>
            <div className="Post-image">
                <div className="Post-image-bg">
                    <img alt={description} src={image}/>
                </div>
            </div>
            <div className="Post-caption">
                <strong>{username}</strong> {description}
            </div>
            <FormControlLabel id="like" onClick={like}
                              control={<Checkbox icon={<ThumbUpAltOutlined/>}
                                                 checkedIcon={<ThumbUpAlt/>}
                                                 name="like"
                                                 checked={liked}
                                                 onChange={() => {
                                                     if (!disliked)
                                                         setLiked(!liked)
                                                 }}/>}
                              label=""/>
            <FormControlLabel id="dislike" onClick={dislike}
                              control={<Checkbox icon={<ThumbDownAltOutlined/>}
                                                 checkedIcon={<ThumbDown/>}
                                                 name="dislike"
                                                 checked={disliked}
                                                 onChange={() => {
                                                     if (!liked)
                                                         setDisliked(!disliked)
                                                 }}/>}
                              label=""/>
            <FormControlLabel id="report" onClick={report}
                              control={<Checkbox icon={<ReportOutlined/>}
                                                 checkedIcon={<Report/>}
                                                 name="report"
                                                 checked={reported}/>}
                              label=""/>
        </article>
    )
}

export default Post
