import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import '../components/css/Profile.css'

const UpdateProfile = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState([])
	const [email, setEmail] = useState('')
	const [about, setAbout] = useState('')
	const [profilePic, setProfilePic] = useState(null)
	const [coverPic, setCoverPic] = useState(null)

	const [preview, setPreview] = useState({
		profilePic: null,
		coverPic: null,
	});

	useEffect(() => {
		api.get('api/user/')
		.then(res => {
			setUser(res.data)
		})
		.catch(err => {
			console.log(err.message);	
		})
	}, [])

	const handleImageChange = (e) => {
		const { name, files } = e.target;
		const file = files[0]

		const imageUrl = URL.createObjectURL(file);

		if (name === "profile_pic") {
			setProfilePic(file);
			setPreview((prev) => ({ ...prev, profilePic: imageUrl }));
		} else if (name === "cover_pic") {
			setCoverPic(file);
			setPreview((prev) => ({ ...prev, coverPic: imageUrl }));
		}
	};

	function updateProfile(e){
		e.preventDefault()
		
		const formData = new FormData();

		if (about){
            formData.append("bio", about);  
        }

		if (email){
            formData.append("email", email);  
        }

		if (profilePic){
			formData.append("profile_pic", profilePic);
        }

		if (coverPic){
			formData.append("cover_pic", coverPic);
        }
		
		console.log(formData)
		api.patch(`api/user/${user.username}/update`, formData)
		.then(res => {
            console.log(res.data)
			navigate(`/profile/${user.username}`)
        })
        .catch(err => {
            console.log(err.message)
        })
	}

	return (
		<div className="container-fluid">
			<Form onSubmit={updateProfile}>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 4fr", gap: "10px" }}>    
					<div className="profile">
						<div className="card mb-4 mb-2">
							<div className="card-header">Profile Picture</div>
							<div className="card-body text-center">
								{preview.profilePic ? 
									<img className="update-profile-picture mb-2" src={preview.profilePic} alt="" /> 
									: <img className="update-profile-picture mb-2" src={`${api.defaults.baseURL}${user.profile_pic}`} alt="" />
								}
								<input type="file" name="profile_pic" accept="image/*" onChange={handleImageChange}/>
							</div>
						</div>
						<div>
							<Button >Change Password</Button>
						</div>
					</div>
					<div className="account">
						<div className="card mb-4">
							<div className="card-header">Account Details</div>
							<div className="card-body pt-2">
								<Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
									<Form.Label>Username</Form.Label>
									<Form.Control type="text" placeholder={user.username} readOnly name='username'/>
								</Form.Group>

								<Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder={user.email} name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
								</Form.Group>

								<Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
									<Form.Label>About</Form.Label>
									<Form.Control as="textarea" rows={3} placeholder={user.bio} name='about' value={about} onChange={(e) => setAbout(e.target.value)}/>
								</Form.Group>

								{preview.coverPic ? 
									<img className="update-cover-pic small mb-2" src={preview.coverPic} alt="" /> 
									: <img className="update-cover-pic small mb-2" src={`${api.defaults.baseURL}${user.cover_pic}`} alt="" />
								}
								

								<Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
									<Form.Label>Cover Picture</Form.Label>
									<Form.Control type="file" name="cover_pic" accept="image/*" onChange={handleImageChange} />
								</Form.Group>

								<div className="modal-footer mt-1" style={{ borderTop: "0 solid #dee2e6" }}>
									<Button variant='primary' type="submit" className='mx-1'>Save changes</Button>
									<Button variant='danger'>Cancel</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default UpdateProfile