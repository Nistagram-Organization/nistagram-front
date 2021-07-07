import React, { useState } from 'react'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

import './Post.css'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import {
    Favorite,
    FavoriteBorder,
    Report,
    ReportOutlined,
    ThumbDown,
    ThumbDownAltOutlined,
    ThumbUpAlt,
    ThumbUpAltOutlined
} from '@material-ui/icons'
import { useAuth0 } from '@auth0/auth0-react'
import { dislikePost, getUsersPosts, likePost, reportPost, sendComment } from '../../reducers/postReducer'
import { useDispatch } from 'react-redux'
import { addPostToFavorites } from '../../reducers/userReducer'

const Post = ({ id, description, date, image, username, liked, disliked, inFavorites, likes, dislikes, comments, shownUser }) => {
    const { user } = useAuth0()
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState(liked)
    const [isDisliked, setIsDisliked] = useState(disliked)
    const [reported, setReported] = useState(false)
    const [comment, setComment] = useState('')
    const [favorite, setFavorite] = useState(inFavorites)
    const token = useState(state => state.authentication.token)

    const like = () => {
        if (!isDisliked) {
            dispatch(likePost(user.email, id, isLiked, token))
            loadChanges()
        }
    }

    const dislike = () => {
        if (!isLiked) {
            dispatch(dislikePost(user.email, id, isDisliked, token))
            loadChanges()
        }
    }

    const addToFavorites = () => {
        dispatch(addPostToFavorites(user.email, id, favorite, token))
        loadChanges()
    }

    const report = () => {
        if (reported)
            return
        setReported(true)
        dispatch(reportPost(id, token))
        loadChanges()
    }

    const postComment = (event) => {
        event.preventDefault()

        dispatch(sendComment(user.email, id, comment, token))
        setComment('')
        loadChanges()
    }

    const loadChanges = () => {
        dispatch(getUsersPosts(shownUser.email, user.email))
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
                <strong>{username}</strong> <span dangerouslySetInnerHTML={{ __html: description }}/>
            </div>
            <div className="Post-caption">
                <i>{date}</i>
            </div>
            <div className="Post-caption">
                <strong>{likes}</strong> likes <strong>{dislikes}</strong> dislikes
            </div>
            <FormControlLabel id="like" onClick={like}
                              control={<Checkbox icon={<ThumbUpAltOutlined/>}
                                                 checkedIcon={<ThumbUpAlt/>}
                                                 name="like"
                                                 checked={isLiked}
                                                 onChange={() => {
                                                     if (!isDisliked)
                                                         setIsLiked(!isLiked)
                                                 }}/>}
                              label=""/>
            <FormControlLabel id="dislike" onClick={dislike}
                              control={<Checkbox icon={<ThumbDownAltOutlined/>}
                                                 checkedIcon={<ThumbDown/>}
                                                 name="dislike"
                                                 checked={isDisliked}
                                                 onChange={() => {
                                                     if (!isLiked)
                                                         setIsDisliked(!isDisliked)
                                                 }}/>}
                              label=""/>
            <FormControlLabel id="report" onClick={report}
                              control={<Checkbox icon={<ReportOutlined/>}
                                                 checkedIcon={<Report/>}
                                                 name="report"
                                                 checked={reported}/>}
                              label=""/>
            <FormControlLabel id="favorites" onClick={addToFavorites}
                              control={<Checkbox icon={<FavoriteBorder/>}
                                                 checkedIcon={<Favorite/>}
                                                 name="favorites"
                                                 checked={favorite}
                                                 onChange={() => {
                                                     setFavorite(!favorite)
                                                 }}/>}
                              label=""/>
            {comments.length !== 0 ? <div className="Post-comments">
                {
                    comments.map((comment, index) => (
                        <div key={index}>
                            <p>
                                <strong>{comment.username}</strong> <span dangerouslySetInnerHTML={{ __html: comment.text }}/><br/>
                                <small>{comment.date}</small>
                            </p>
                        </div>
                    ))
                }
            </div> : null}
            <form className="Post-comment-box">
                <input
                    className="Post-input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}/>
                <button
                    className="Post-button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}>
                    Post
                </button>
            </form>
        </article>
    )
}

export default Post
