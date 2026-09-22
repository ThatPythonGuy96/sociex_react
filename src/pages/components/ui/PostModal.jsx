import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import api from '../../../api'
import { useNavigate } from 'react-router-dom'
import Loading from '../ui/Loading'

const PostModal = ({show, setShow}) => {
	const navigate = useNavigate()
	const handleClose = () => setShow(false);
	const [caption, setCaption] = useState("")
	const [images, setImages] = useState([])
	const [posting, setPosting] = useState(false)
	const [previews, setPreviews] = useState([]);
	const MAX_IMAGES = 4;

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
		setPosting(true)
		api.post('api/post/feeds/create/', formData)
		.then(res => {
			navigate(`/post/${res.data.id}`)
			setShow(false)
			setPosting(false)
		})
		.catch(err => {
			console.log(err.message)
			setPosting(false)
		})
    }

    return (
		<Modal show={show} onHide={handleClose} size="lg">
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
				{posting && <Loading />}
			</Modal.Footer>
		</Modal>
    )
}

export default PostModal