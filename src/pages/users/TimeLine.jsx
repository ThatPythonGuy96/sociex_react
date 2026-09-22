import React, {useEffect, useState} from 'react'
import '../components/css/TimeLine.css'
import PostItem from '../posts/PostItem'
import RePost from '../posts/RePost'

const TimeLine = ({ posts, loading, error }) => {

    return (
        <div className="">
            {posts && posts.length > 0 ? posts.map(post => (
                post.reposted_post ? (
                    <RePost key={post.id} post={post} loading={loading} error={error} />
                ) : (
                    <PostItem key={post.id} post={post} loading={loading} error={error} />
                )
            )) :
                <div className="feed shad py-1">
                    <p align="center">No Posts to see here!</p>
                </div>
            }
        </div>
    )
}

export default TimeLine