import React, { useContext, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../utils/AuthContext'
import Loading from '../components/ui/Loading'

const Login = () => {
    const navigate = useNavigate()
    const {setAuthenticated} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const userData = {email, password}
    
    function loginUser(e){
        setLoading(true)
        e.preventDefault()
        api.post('api/user/auth/login', userData)
        .then(res => {
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
            setAuthenticated(true)
            navigate('/')
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
            setError(err.message)
            setLoading(false)
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="p-4 p-md-5 login">
                        {error && <p>{error}</p>}
                        <Form onSubmit={loginUser}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            {loading && <Loading />}
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                        <span className='d-flex justify-content-center'>Don't have an account?<Link to="/signup">Sign Up</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login