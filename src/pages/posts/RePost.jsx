import React, { useContext, useState } from 'react'
import Loader from '../components/Loader'
import { Dropdown, Button } from 'react-bootstrap'
import { FaComments, FaEye, FaHeart, FaRegHeart, FaEllipsisVertical, FaShare, FaRegBookmark, FaBookmark } from 'react-icons/fa6'
import api from '../../api'
import '../components/css/Post.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

const RePost = ({ post, loading, error }) => {
    const navigate = useNavigate()
    const { Authenticated, user } = useContext(AuthContext)
    const [likes, setLikes] = useState(post.likes_num || 0)
    const [comments, setComments] = useState(post.comment_num)
    const [views, setViews] = useState(post.views)
    const [liked, setLiked] = useState(post.is_liked || false)
    const postId = {post_id: post.id}

    function likePost(e){
        e.preventDefault()
        api.post('api/post/like/', postId)
        .then(res => {
            setLiked(res.data.isliked)
            setLikes(res.data.num_of_likes)
        })
        .catch(err => {
            console.log(err.message)
        })
    } 

    function deletePost(){
        api.post(`api/post/${post.id}/delete/`)
        .then(res => {
            console.log(res.data)
            navigate('/')
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    function bookmark(){
        api.post('api/bookmark/create/', postId)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    return (
        <>
            {loading && <Loader />}
            {loading || error !="" ||
                <div className='feed shad rounded py-2'>
                    <span>
                        <Link to={`/profile/${post.reposted_by}`} className="reposted-by">{post.reposted_by}</Link> reposted
                    </span>
                    <div className="repost">
                        <div className="d-flex flex-row justify-content-between py-2 align-items-center border-bottom ">
                            <div className="d-flex flex-row align-items-center feed-text px-2">
                                <Link to={`/profile/${post.user?.username}`}>
                                    <img className="rounded-circle post-user-img" src={`${post.user?.profile_pic}`} />
                                </Link>
                                <div className="d-flex flex-column flex-wrap mx-2">
                                    <div className="post-user">
                                        <Link to={`/profile/${post.user?.username}`}>
                                            <span className="post-user">{post.user?.username}</span>
                                        </Link>
                                    </div>
                                    <p className="tx-11 m-0 icon-num">{post.created}</p>
                                </div>
                            </div>
                            {post.user?.username === user.username ? 
                                <div className="px-2 dropdown">
                                    <Dropdown align="end" className='me-2 px-1'>
                                        <Dropdown.Toggle as="div" id="dropdown-custom">
                                            <Button className="dropdown-toggle" variant='light'>
                                                <FaEllipsisVertical />
                                            </Button>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={deletePost}>Delete</Dropdown.Item>
                                            <Dropdown.Item href={`#/post/${post.id}/update`}>Update</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div> :
                                null
                            }
                        </div>
                        <Link key={post.id} to={`/post/${post.id}`}>
                            <div className="p-2 px-3">
                                {post.caption && <span className='caption'>{post.caption}</span>}
                                {post && post.post_images && 
                                    <div className="post-image">
                                        {post && post.post_images && post.post_images.map((image, index) => (
                                            <img className="image-item" key={index} src={`${api.defaults.baseURL}${image.image}`} alt={image.image} />
                                        ))}
                                    </div>
                                }
                            </div>
                        </Link>
                    </div>
                    <div className="original-post">
                        <div className="d-flex flex-row justify-content-between py-2 align-items-center border-bottom ">
                            <div className="d-flex flex-row align-items-center feed-text px-2">
                                <Link to={`/profile/${post.reposted_post.user?.username}`}>
                                    <img className="rounded-circle post-user-img" src={`${api.defaults.baseURL}${post.reposted_post.user?.profile_pic}`} />
                                </Link>
                                <div className="d-flex flex-column flex-wrap mx-2">
                                    <div className="post-user">
                                        <Link to={`/profile/${post.reposted_post.user?.username}`}>
                                            <span className="post-user">{post.reposted_post.user?.username}</span>
                                        </Link>
                                    </div>
                                    <p className="tx-11 m-0 icon-num">{post.reposted_post.created}</p>
                                </div>
                            </div>
                            {post.reposted_post.user?.username === user.username ? 
                                <div className="px-2 dropdown">
                                    <Dropdown align="end" className='me-2 px-1'>
                                        <Dropdown.Toggle as="div" id="dropdown-custom">
                                            <Button className="dropdown-toggle" variant='light'>
                                                <FaEllipsisVertical />
                                            </Button>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={deletePost}>Delete</Dropdown.Item>
                                            <Dropdown.Item href={`#/post/${post.reposted_post.id}/update`}>Update</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div> :
                                null
                            }
                        </div>
                        <Link key={post.id} to={`/post/${post.reposted_post.id}`}>
                            <div className="p-2 px-3">
                                {post.reposted_post.caption && <span className='caption'>{post.reposted_post.caption}</span> }
                                {post.reposted_post.post_images && 
                                    <div className="reposted-post-post-image">
                                        {post && post.reposted_post.post_images && post.reposted_post.post_images.map((image, index) => (
                                            <img className="reposted-post-image-item" key={index} src={`${api.defaults.baseURL}${image.image}`} alt={image.image} />
                                        ))}
                                    </div>
                                }
                            </div>
                        </Link>
                    </div>
                        
                    {Authenticated && 
                        <div>
                            <div className="d-flex justify-content-start p-1 px-4 border-top">
                                <button className="btn action" onClick={likePost}>
                                    {liked ? 
                                        <FaHeart /> :
                                        <FaRegHeart />
                                    }
                                    <span className="icon-num">{likes}</span>
                                </button>
                                <div className='action'>
                                    <FaComments />
                                    <span className="icon-num">{comments}</span>
                                </div>
                                <div className="action">
                                    <FaEye />
                                    <span className="icon-num black">{views}</span>
                                </div>
                                <button className="btn action">
                                    <FaShare/>
                                </button>
                                <button className="btn action" onClick={bookmark}>
                                    <FaRegBookmark />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default RePost