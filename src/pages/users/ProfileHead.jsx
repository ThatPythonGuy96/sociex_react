import React, { useContext, useState } from 'react'
import '../components/css/Profile.css'
import api from '../../api'
import { FaPenToSquare } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import AuthContext from '../../utils/AuthContext'
import { Modal, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProfileHead = ({ profile }) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
    const {user} = useContext(AuthContext)
    const [following, setFollowing] = useState(profile.is_following)
    const userData = {username:profile.username}
    const [caption, setCaption] = useState("")
    const [images, setImages] = useState([])
    const [previews, setPreviews] = useState([]);
    const MAX_IMAGES = 4;

    function followUser(){
        api.post('api/user/follow/', userData)
        .then(res => {
            setFollowing(res.data.is_following)
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...files]);
        setPreviews((prev) => [...prev, ...imagePreviews]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    function submitPost(){
        const formData = new FormData();
        formData.append("caption", caption);

        images.forEach((image) => {
            formData.append("images", image);
        });
        api.post('api/post/feeds/create/', formData)
        .then(res => {
            navigate(`/post/${res.data.id}`)
            setShow(false)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    return (
        <div className="mt-2">
            <div className="profile-grid">
                <div className="cover">
                    <img className="cover-img" src={`${profile.cover_pic}`}/>
                </div>
                <div className="prof-pic">
                    <img className="profile-pic" src={`${profile.profile_pic}`}/>
                </div>
                <div className="username">
                    <span className="profile-name">{profile.username}</span>
                </div>
                <div className="profile-button">
                    {profile.username === user.username ?
                        <div className="d-flex flex-row">
                            <Button type="button" className="btn btn-primary mx-1" onClick={handleShow}>
                                Post
                                <Modal show={show} size="lg">
                                    <Modal.Header>
                                        <Modal.Title>Create Post</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form encType="multipart/form-data">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Caption</Form.Label>
                                                <Form.Control type="text" placeholder="Caption" autoFocus value={caption} onChange={(e) => setCaption(e.target.value)}/>
                                            </Form.Group>
                        
                                            {images ? 
                                                <div style={{display: "flex", gap: "10px", border: "1px solid blue"}}>
                                                    {previews.map((preview, index) => (
                                                        <div key={index}>
                                                            <img src={preview} alt="Preview" width="100" height="100" />
                                                            <button type="button" onClick={() => removeImage(index)} style={{ position: "relative", bottom: "33px", right: "37px" }}>
                                                            ❌
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div> : null
                                            }
                        
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control type="file" accept="image/*" multiple onChange={handleImageChange} disabled={images.length >= MAX_IMAGES}/>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                        <Button variant="primary" onClick={submitPost}>Post</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Button>
                            <Link className="btn edit-bottons mx-1" to={`/profile/${user.username}/update`}>
                                <FaPenToSquare className='mb-1 me-1'/>
                                Edit profile
                            </Link>
                        </div>:
                        <div className="d-flex flex-row">
                            <Link className="btn btn-primary mx-1 text-white" to='/chat'>Send Message</Link>
                            
                            {following ? 
                                <Button className="btn-danger" onClick={followUser}> 
                                    {following && "UnFollow"}
                                </Button>
                                :
                                <Button className="btn-primary" onClick={followUser}> 
                                    {!following && "Follow"}
                                </Button>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileHead