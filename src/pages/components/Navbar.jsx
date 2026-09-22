import React, { useContext, useState } from 'react'
import { Navbar as NavBar, Button, Form, Row, Col, Nav, Container, Badge, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/sociama.png'
import { FaCirclePlus, FaMessage, FaBell, FaUsers } from "react-icons/fa6";
import AuthContext from '../../utils/AuthContext';
import api from '../../api'
import PostModal from '../components/ui/PostModal'

const Navbar = () => {
    const navigate = useNavigate()
    const {user, Authenticated, setAuthenticated } = useContext(AuthContext)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    function logout(){
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setAuthenticated(false)
        navigate('/login')
    }  

    return (
        <NavBar collapseOnSelect expand="lg" className="bg-body-tertiary justify-content-between mb-2" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <NavBar.Brand href="/">
                    <img src={logo} width="25" className="d-inline-block align-top" alt="Sociama Logo" style={{ marginTop: "2px", height: "25px" }} />
                </NavBar.Brand>
                <Form>
                    <Row>
                        <Col xs="auto">
                            <Form.Control type="text" placeholder="Search" className=" mr-sm-2"/>
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                {Authenticated ? 
                    <Nav className="justify-content-end">
                        <Dropdown align="end" className='me-2 px-1' data-bs-theme="light">
                            <Dropdown.Toggle as="div" id="dropdown-custom">
                                <img className="dropdown-toggle nav-user-image mt-1" src={`${api.defaults.baseURL}${user.profile_pic}`} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href={`#/profile/${user.username}`} className="capitalize">{user.username}</Dropdown.Item>
                                <Dropdown.Item >Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link className='me-2 px-1' onClick={handleShow}>
                            <span><FaCirclePlus className='fa-lg' /> Post</span>
                        </Nav.Link>
                        <Nav.Link className='me-2 px-1' href="#/chat"><FaMessage className='fa-lg' /></Nav.Link>
                        <Nav.Link className='me-2 px-1'><FaUsers className='fa-lg' /></Nav.Link>
                        <Nav.Link className='me-2 px-1'>
                            <FaBell className='fa-lg' />
                            <Badge pill bg="info" className="badge rounded-pill badge-notification">9</Badge>
                        </Nav.Link>
                        
                        <PostModal show={show} setShow={setShow} />   
                    </Nav> :
                    <Nav className="justify-content-end">
                        <Nav.Link className='me-2 px-1' href='/#/login'>Login</Nav.Link>
                        <Nav.Link className='me-2 px-1'href='/#/signup'>SignUp</Nav.Link>
                    </Nav>
                }
                <NavBar.Toggle aria-controls="responsive-navbar-nav" />
                {/* <NavBar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="#features"><FaCirclePlus />Post</Nav.Link>
                    <Nav.Link href="#features"><FaMessage/></Nav.Link>
                    <Nav.Link href="#features"><FaRegUser /></Nav.Link>
                    <Nav.Link href="#pricing">
                        <FaRegBell />
                        <span className="badge rounded-pill badge-notification bg-danger">12</span>
                    </Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">{user.username}</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
                    </NavDropdown>
                </NavBar.Collapse> */}
            </Container>
        </NavBar>
    )
}

export default Navbar