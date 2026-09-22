import React, { useContext } from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { Dropdown, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../utils/AuthContext'
import '../components/css/Post.css'
import api from '../../api'

const Comments = ({comment, post}) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    function deleteComment(){
        api.post(`api/comment/${comment.id}/delete/`)
        .then(res => {
            console.log(res.data)
            navigate(`/post/${post.id}`)
        })
        .catch(err => {
            console.log(err.message)
        })   
    }

    return (
        <>

                    
                <div className="card-body p-1">
                    <div className="shad" key={comment.id}>
                        <div className="card-header d-flex justify-content-between border-bottom">
                            <div className="d-flex">
                                <img className="rounded-circle" src={`${comment.user.profile_pic}`} style={{ height: "50px", width: "50px" }} />
                                <div className="d-flex flex-column mx-2">
                                    <a href="">
                                        <span className='capitalizer'><b>{comment.user.username}</b></span>
                                    </a>
                                    <p className="icon-num">{comment.created}</p>
                                </div>
                            </div>
                            {comment.user?.username === user.username ?
                                <div className="px-2 dropdown">
                                    <Dropdown align="end" className='me-2 px-1'>
                                        <Dropdown.Toggle as="div" id="dropdown-custom">
                                            <Button className="dropdown-toggle" variant='light'>
                                                <FaEllipsisVertical />
                                            </Button>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={deleteComment}>Delete</Dropdown.Item>
                                            <Dropdown.Item>Update</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div> :
                                null
                            }
                        </div>
                        <div className="card-body p-3">
                            <p className="caption">{comment.comment}</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Comments