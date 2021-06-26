import React, { useEffect } from 'react'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../reducers/postReducer'

const Posts = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const posts = useSelector(state => state.posts.list)

    return (
        <div>
            <div className="Posts">
                {posts
                    .slice(0)
                    .reverse()
                    .map(post => (
                        <Post
                            username={post.user.username}
                            image={post.image}
                            caption={post.description}
                            key={post.id}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Posts
