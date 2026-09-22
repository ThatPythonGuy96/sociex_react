import React from 'react'
import { FaUserPlus } from 'react-icons/fa6'
import api from '../../api'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import '../components/css/Profile.css'

const Aside = ({ follows, suggests }) => {
	
	function followUser(username){
		const userData = {username:username}
		api.post('api/user/follow/', userData)
		.then(res => {
			setFollowing(res.data.is_following)
		})
		.catch(err => {
			console.log(err.message)
		})
	}

	return (
		<div className='aside'>
			<div className="feed">
				<div className="p-3 mb-1">
					<div className="d-flex justify-content-center mb-2">
						<h6 className="card-title border-bottom p-2"><b>Following</b></h6>
					</div>
					{follows.map((following, index) => (
						<div className="d-flex justify-content-between mb-2 pb-2 border-bottom" key={index} >
							<div className="d-flex align-items-center hover-pointer">
								<Link to={`/profile/${following.username}`}>
									<img className="img-xs rounded-circle" src={`${api.defaults.baseURL}${following.profile_pic}`} alt="" />
								</Link>
								<div className="mx-2">
									<Link to={`/profile/${following.username}`}>
										<p className="mb-1">{following.username}</p>
									</Link>
									<p className="tx-11 text-muted mb-1">Mutual Friends</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="feed">
				<div className="p-3 mb-1">
					<div className="d-flex justify-content-center mb-2">
						<h6 className="card-title border-bottom p-2"><b>People you may know</b></h6>
					</div>
					{suggests.map((suggest, index) => (
						<div className="d-flex justify-content-between mb-2 pb-2 border-bottom" key={index}>
							<div className="d-flex align-items-center hover-pointer">
								<Link to={`/profile/${suggest.username}`}>
									<img className="img-xs rounded-circle" src={`${api.defaults.baseURL}${suggest.profile_pic}`} alt="" />
								</Link>
								<div className="mx-2">
									<Link to={`/profile/${suggest.username}`}>
										<p className="mb-1">{suggest.username}</p>
									</Link>
									<p className="tx-11 text-muted mb-1">Mutual Friends</p>
								</div>
							</div>

							<Button variant="success" className="follow-botton" onClick={() => followUser(suggest.username)}>
								<FaUserPlus />
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Aside