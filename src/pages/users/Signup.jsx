import React, { useState } from 'react'
import api from '../../api'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState("")
    const userData = {email, username, password1, password2}
    
    function signupUser(e){
        e.preventDefault()
        api.post('api/user/auth/signup', userData)
        .then(res => {
            navigate('/login')
        })
        .catch(err => {
            console.log(err.message)
            setError(err.message)
        })
    }
    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="p-4 p-md-5 signup">
                        {error && <p>{error}</p>}
                        <Form onSubmit={signupUser}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name='password1' value={password1} onChange={(e) => setPassword1(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword2">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" name='password2' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                        <span className='d-flex justify-content-center'>Already have an account?<Link to='/login'>Login</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup