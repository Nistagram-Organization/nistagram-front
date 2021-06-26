import React from 'react'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

import './Post.css'

const Post = ({ username, image, description }) => {
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
        </article>
    )
}

export default Post
