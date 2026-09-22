import React, { useEffect, useState, useContext } from 'react'
import '../components/css/Post.css'
import { useParams, Link} from 'react-router-dom'
import { Dropdown, Button, Form, Row, Col } from 'react-bootstrap'
import { FaComments, FaEye, FaHeart, FaRegHeart, FaEllipsisVertical, FaTelegram } from 'react-icons/fa6'
import api from '../../api'
import AuthContext from '../../utils/AuthContext'
import Loader from '../components/Loader'
import Comment from './Comments'

const Detail = () => {
	const {id} = useParams()
	const [post, setPost] = useState([])
	const { Authenticated, user } = useContext(AuthContext)
	const [comments, setComments] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [likeNum, setLikeNum] = useState("")
	const [commentNum, setCommentNum] = useState("")
	const [views, setViews] = useState("")
	const [liked, setLiked] = useState(post.is_liked || false)
	const postId = {post_id: post.id}
	const [newComment, setNewComment] = useState("")
    const commentData = {comment:newComment, post_id:id}

	useEffect(() => {
		setLoading(true)
		api.get(`api/post/${id}`)
		.then(res => {
			setPost(res.data)
			setLikeNum(res.data.likes_num)
			setCommentNum(res.data.comment_num)
			setViews(res.data.views)
			setComments(res.data.comment_post)
			setLoading(false)
			setError("")
        })
        .catch(err => {
            console.log(err.message)
			setLoading(false)
			setError(err.message)
        })
	}, [id])

	function likePost(e){
		e.preventDefault()
		api.post('api/post/like/', postId)
		.then(res => {
			setLiked(res.data.isliked)
			setLikeNum(res.data.num_of_likes)
		})
		.catch(err => {
			console.log(err.message)
		})
	} 

	function deletePost(){
		api.post(`api/post/${post.id}/delete`)
		.then(res => {
			console.log(res.data)
			navigate('/')
		})
		.catch(err => {
			console.log(err.message)
		})
		
	}

	function createComment(e) {
		e.preventDefault();
		api.post('api/comment/create/', commentData)
		.then(res => {
			console.log(res.data)
		})
		.catch(err => {
			console.log(err.message)
		})
	}

    return (
		<div className='container'>
            {loading && <Loader />}
			{loading || error !="" || 
				<>
					<div className='feed shad rounded py-2'>
						<div className="d-flex flex-row justify-content-between py-1 align-items-center border-bottom">
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
						<div className="p-2 px-3">
							<span className='caption'>{post.caption}</span>
							<div className="post-image">
								{post && post.post_images && post.post_images.map((image, index) => (
									<img className="image-item-detail" key={index} src={`${api.defaults.baseURL}${image.image}`} alt={image.image} />
								))}
							</div>
						</div>
							
						{Authenticated && 
							<div>
								<div className="d-flex justify-content-start p-1 px-4 border-top">
									<button className="btn action" onClick={likePost}>
										{liked ? 
											<FaHeart /> :
											<FaRegHeart />
										}
										<span className="icon-num">{likeNum}</span>
									</button>
									<div className='action'>
										<FaComments />
										<span className="icon-num">{commentNum}</span>
									</div>
									<div className="action">
										<FaEye />
										<span className="icon-num black">{views}</span>
									</div>
								</div>
							</div>
						}
					</div>
					
					<>
						<div className="p-2 shad">
							<div className="card-header d-flex justify-content-center">
								<b className="text-white">Comments</b>
							</div>
						</div>
						{comments && comments.length > 0 ? comments.map(comment => (
							<Comment comment={comment} post={post} key={comment.id} />
						)): 
							<div className="d-flex justify-content-center align-items-center">
								<h4 className="text-white">Be the first to comment.</h4>
							</div>
						}
					</>

					<div className="p-2 shad">
						<Form onSubmit={createComment}>
							<Row className="align-items-center">
								<Col>
									<Form.Group controlId="exampleForm.ControlTextarea1">
										<Form.Control as="textarea" rows={2} placeholder="Make a comment ..." name='email' value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
									</Form.Group>
								</Col>
								<Col xs="auto" className="my-1">
									<Button type="submit"><FaTelegram /></Button>
								</Col>
							</Row>
						</Form>
					</div> 
				</> 
			}
		</div>
    ) 
}

export default Detail