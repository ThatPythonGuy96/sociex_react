import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<>
			<div className="d-flex">
				<div>
					<Link>Home</Link>
					<Link>Home</Link>
					<Link>Home</Link>
					<Link>Home</Link>
				</div>
				<div>
					<Link>About</Link>
					<Link>About</Link>
					<Link>About</Link>
				</div>
			</div>	
		</>
	)
}

export default Footer