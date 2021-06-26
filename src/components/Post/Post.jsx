import React, { useState } from 'react'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

import './Post.css'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import { likePost } from '../../reducers/postReducer'
import { useDispatch } from 'react-redux'

const Post = ({ username, image, description }) => {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)

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
            <FormControlLabel id="like" onClick={() => dispatch(likePost(1, 1, liked))}
                              control={<Checkbox icon={<ThumbUpAltOutlined/>}
                                                 checkedIcon={<ThumbUpAlt/>}
                                                 name="like"
                                                 onChange={() => setLiked(!liked)}/>}
                              label=""/>
        </article>
    )
}

export default Post
