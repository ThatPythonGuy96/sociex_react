import React from 'react'
import Loader from './Loader'
import Placeholder from 'react-bootstrap/Placeholder';
import '../components/css/Post.css'
import '../components/css/Group.css'

const LoaderContainer = () => {
    return (
        <div className='grid-8-4 container mt-4'>
            <div>
                <Loader />
                <Loader />
                <Loader />
            </div>
            <div className='post-group'>
                <div className='feed shad rounded'>
                    <div className="group-feed message mb-2">
                        <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-row feed-text">
                                <Placeholder as="p" animation="wave">
                                    <Placeholder xs={12} bg="light" style={{ width: '25%' }}/>
                                </Placeholder>
                                <div className="d-flex flex-column flex-wrap mx-2">
                                    <Placeholder as="p" animation="wave">
                                        <Placeholder xs={12} bg="light" style={{ width: '15%' }}/>
                                    </Placeholder>
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} bg="light" style={{ width: '45%' }} size="sm"/>
                                    </Placeholder>
                                    <Placeholder as="p" animation="wave">
                                        <Placeholder xs={12} bg="light" style={{ width: '15%' }}/>
                                    </Placeholder>
                                </div>
                            </div>
                        </div>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} bg="light" style={{ width: '85%' }} size="lg"/>
                            <Placeholder xs={12} bg="light" style={{ width: '65%' }} size="lg"/>
                            <Placeholder xs={12} bg="light" style={{ width: '45%' }} size="lg"/>
                        </Placeholder>
                    </div>
                    <div className='action'>
                        <Placeholder.Button xs={4} aria-hidden="true" variant='secondary'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoaderContainer