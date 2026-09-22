import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder';
import '../components/css/Post.css'

const Loader = () => {
    return (
        <>
            <div className='feed shad rounded py-2'>
                <div className="px-3 border-bottom">
                    <div>
                        <Placeholder animation="wave">
                            <Placeholder xs={12} bg="light" style={{ width: '25%' }}/>
                        </Placeholder>
                        <Placeholder as="p" animation="wave">
                            <Placeholder xs={12} bg="light" style={{ width: '15%' }}/>
                        </Placeholder>
                    </div>
                </div>
                <div className="p-2 px-3">
                    <span className='caption'>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} bg="light" style={{ width: '85%' }} size="lg"/>
                        </Placeholder>
                    </span>
                    <div className="post-image">
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} bg="light" style={{ width: "100%", height: "100%" }} />
                        </Placeholder>
                    </div>
                </div>
                <div>
                    <div className="d-flex justify-content-start p-1 px-4 border-top">
                        <div className='action'>
                            <Placeholder.Button xs={4} aria-hidden="true" variant='secondary'/>
                        </div>
                        <div className='action'>
                            <Placeholder.Button xs={4} aria-hidden="true" variant='secondary'/>
                        </div>
                        <div className="action">
                            <Placeholder.Button xs={4} aria-hidden="true" variant='secondary'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader