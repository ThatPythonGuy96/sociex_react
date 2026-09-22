import React, { useState, useEffect, useContext } from 'react'
import '../components/css/Chat.css'
import api from '../../api'
import { FaMagnifyingGlass, FaCircle, FaCamera, FaImage, FaPaperPlane } from 'react-icons/fa6'
import { Button } from 'react-bootstrap'
import AuthContext from '../../utils/AuthContext'

const Chat = () => {

	const { user } = useContext(AuthContext)
	const [socket, setSocket] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [isonline, setIsOnline] = useState(false)
	const [chats, setChats] = useState([])
	const [activeChat, setActiveChat] = useState(null)
	const [chat, setChat] = useState([])
	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState('')

	useEffect(() => {
		setLoading(true)
		api.get('api/chat/chats')
		.then(res => {
			setChats(res.data)
			console.log(res.data);
			
			if (res.data.length > 0){
				setActiveChat(res.data[0].id)
			}
			setLoading(false)
			setError("")
		})
		.catch(err => {
			console.log(err.message)
			setLoading(false)
			setError(err.message)
		})
	}, [])
	
	useEffect(() => {
		api.get(`api/chat/chat/${activeChat}`)
		.then(res => {
			setChat(res.data)
			setMessages(res.data.dm_messages)
		})
		.catch(err => {
			console.log(err.message)
		})
	}, [`${activeChat}`])

	useEffect(() => {
        const websocketProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const socketURL = `${websocketProtocol}://${api.defaults.websocket}/ws/chat/${activeChat}/`;
        const newSocket = new WebSocket(socketURL)
        setSocket(newSocket)
            
        newSocket.onopen = () => {
            console.log("Connection Established");
			setIsOnline(true)
        }

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Receiving chat:", data)
            setMessages((prevMessages) => [...prevMessages, data]);
        }

        newSocket.onclose = () => {
            console.log('Socket closed');
        }

        newSocket.onerror = (error) => {
            console.error("WebSocket error:", error);
        }

        return () => {
            newSocket.close()
        }
    }, [`${activeChat}`])

	const sendMessage = () => {
        if (socket && message.trim()) {
            socket.send(
                JSON.stringify({
                    room_id: `${activeChat}`,
                    body: message,
                    sender: user.username,
                })
            );
            setMessage("")
        }
    }

	return (
		<div className="chat">
			<div className="chat-app">
				<div className="people-list">
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><FaMagnifyingGlass /></span>
						</div>
						<input type="text" className="form-control" placeholder="Search..." />
					</div>
					<ul className="list-unstyled chat-list mt-2 mb-0">
						{chats && chats.map((chat, index) => (
							<li key={index} className={`clearfix ${activeChat === chat.id ? 'active' : ''}`} onClick={() => setActiveChat(chat.id)}>
								{user.username === chat.receiver_user.username ? (
									<>
										<img src={`${api.defaults.baseURL}${chat.sender_user.profile_pic}`} alt="avatar" />
										<div className="about">
											<div className="name">{chat.sender_user.username}</div>
											<div className="status"> 
												{isonline ? <><FaCircle className="online"/> online</> : <><FaCircle className="offline"/> offline</>} 
											</div>
										</div>
									</>
								) : (
									<>
										<img src={`${api.defaults.baseURL}${chat.receiver_user.profile_pic}`} alt="avatar" />
										<div className="about">
											<div className="name">{chat.receiver_user.username}</div>
											<div className="status"> <FaCircle className='offline'/> online </div>
										</div>
									</>
								)}
							</li>
						))}
					</ul>
				</div>
				<div className="chat-message">
					<div className="chat-header clearfix">
						<div className="row">
							<div className="col-lg-6">
								{user?.username === chat?.receiver_user?.username ? (
									<>
										<a href="">
											<img src={`${api.defaults.baseURL}${chat.sender_user?.profile_pic}`} alt="avatar" />
										</a>
										<div className="chat-about">
											<h6 className="m-b-0">{chat.sender_user?.username}</h6>
											<small>Last seen: 2 hours ago</small>
										</div> 
									</> 
								) : (
									<>
										<a href="">
											<img src={`${api.defaults.baseURL}${chat.receiver_user?.profile_pic}`} alt="avatar" />
										</a>
										<div className="chat-about">
											<h6 className="m-b-0">{chat.receiver_user?.username}</h6>
											<small>Last seen: 2 hours ago</small>
										</div> 
									</>
								)}
							</div>
							<div className="col-lg-6 hidden-sm text-right">
								<a className="btn btn-outline-secondary"><FaCamera /></a>
								<a className="btn btn-outline-primary"><FaImage /></a>
							</div>
						</div>
					</div>
					<div className="chat-history clearfix">
						<ul className="m-b-0">
							{messages.map((message, index) => (
								<li key={index} className="clearfix">
									<div className={`message-data ${message.sender_user?.username === user.username ? 'text-right' : ''} `}>
										<span className="message-data-time">{message.sent}</span>
									</div>
									<div className={`${message.sender_user?.username === user.username ? 'other-message float-right' : 'my-message'}`}>
										{message.body && <div className='message'>{message.body}</div> }
										{message.image && <img src={`${api.defaults.baseURL}${message.image}`} key={index} className={`${message.sender_user?.username === user.username ? 'other-message-image' : 'my-message-image'}`}/>}
									</div>
								</li>
							))}
						
						</ul>
					</div>
					<div className="send-message clearfix">
						<div className="input-group mb-0">
							<input type="text" placeholder="Enter text here..." value={message} onChange={(e) => setMessage(e.target.value)} /> 
							<div className="input-group-prepend">
								<Button className="input-group-text" onClick={sendMessage}><FaPaperPlane /></Button>
							</div>                                 
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat