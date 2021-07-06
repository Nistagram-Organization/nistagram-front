import React, { useEffect } from 'react'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsFeed, getUsersPosts } from '../../reducers/postReducer'
import './Posts.css'

const Posts = ({ shownUser, loggedInUser, search }) => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.list)
    const following = useSelector(state => state.users.following)

    useEffect(() => {
        if (shownUser !== undefined) {
            dispatch(getUsersPosts(shownUser.email, loggedInUser))
        } else {
            if (!search)
                dispatch(getPostsFeed(loggedInUser))
        }
    }, [])

    return (
        <div>
            {search || (!shownUser && loggedInUser) || (shownUser.public || following || shownUser.email === loggedInUser) ?
                <div className="Posts">
                    {posts !== null ? posts
                        .map(post => (
                            <Post
                                id={post.id}
                                description={post.description}
                                date={post.date}
                                image={post.image}
                                username={post.username}
                                liked={post.liked}
                                disliked={post.disliked}
                                inFavorites={post.in_favorites}
                                likes={post.likes}
                                dislikes={post.dislikes}
                                comments={post.Comments}
                                shownUser={shownUser}
                                key={post.id}
                            />
                        )) : null}
                </div> : <div id="privateDiv">
                    <strong id="private">This profile is private. Follow profile to se its posts.</strong>
                </div>
            }
        </div>
    )
}

export default Posts
