import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../../utils/AuthContext'
import api from '../../api'
import { Form, Button } from 'react-bootstrap'
import '../components/css/Post.css'
import Loading from '../components/ui/Loading'

const Update = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const [post, setPost] = useState([])
    const [updating, setUpdating] = useState(false)
    const [newCaption, setNewCaption] = useState("")
    const [newImages, setNewImages] = useState([])
    const [previews, setPreviews] = useState([]);
    
    useEffect(() => {
        api.get(`api/post/${id}`)
        .then(res => {
            setPost(res.data)
        })
        .catch(err => [
            console.log(err.message)
        ])
    }, [])
    
    const removeImage = (index) => {
		setNewImages(images.filter((_, i) => i !== index));
		setPreviews(previews.filter((_, i) => i !== index));
	};

    const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
        setNewImages((prev) => [...prev, ...files]);
		const imagePreviews = files.map((file) => URL.createObjectURL(file));
		setPreviews((prev) => [...prev, ...imagePreviews]);
	};

    function updatePost(e){
        e.preventDefault()
        const formData = new FormData();
        
        formData.append("id", {id})
        
        if (newCaption){
            formData.append("caption", newCaption);  
        }
		
        if (newImages){
            newImages.forEach((image) => {
			    formData.append("images", image);
		    }); 
        }
		setUpdating(true)
        api.patch(`api/post/${id}/update/`, formData)
        .then(res => {
            console.log(res.data)
            navigate(`/post/${id}`)
		    setUpdating(false)
        })
        .catch(err => {
            console.log(err.message)
		    setUpdating(false)
        })
    }

    return (
        <>
            {user?.username === post.user?.username ? (
                <div className='container-fluid'>
                    <div className="card mb-4">
                        <div className="card-header">Post Details</div>
                        <div className="card-body">
                            <Form onSubmit={updatePost}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Caption</Form.Label>
                                    <Form.Control type="text" placeholder={post.caption} autoFocus value={newCaption} onChange={(e) => setNewCaption(e.target.value)}/>
                                </Form.Group>
                                {previews.length > 0 &&
                                    <div className="images-preview">
                                        {previews.map((preview, index) => (
                                            <div key={index}>
                                                <img className="preview-image-item" src={preview} alt="Preview" width="100" height="100" />
                                                <button type="button" onClick={() => removeImage(index)} className='preview-remove-button'>
                                                ❌
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {post.post_images?.length > 0 &&
                                    <div className="update-post-image">
                                        {post.post_images && post.post_images.map((image, index) => (
                                            <img className="update-image-item" key={index} src={`${api.defaults.baseURL}${image.image}`} alt={image.image} />
                                        ))}
                                    </div>
                                }

                                <Form.Group controlId="exampleForm.ControlInput3" className="mb-3">
                                    <Form.Label>Images</Form.Label>
                                    <Form.Control type="file" multiple onChange={handleImageChange}/>
                                </Form.Group>

                                <Button className="btn bottons mx-2" type="submit" variant='success'>Save changes</Button>
                                <Button variant='danger'>Cancel</Button>
                                {updating && <Loading />}
                            </Form>
                        </div>
                    </div>
                </div>
            ) : (
               <></>
            )}

        </>
    )
}

export default Update