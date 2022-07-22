import React from 'react'

export default function ShowCode({ data, setShowCode }) {
    const handleClosebtn = () => {
        setShowCode(false)
    }
    return (<>
        <div className='row align-items-center justify-content-center m-0 mt-3 position-relative'>
            <div className='col-md-8 cfs-box px-5 position-absolute top-0 start-50 translate-middle'
                style={{ background: 'rgb(245, 210, 243)', zIndex: '1000', marginTop: '260px',minHeight:'200px'}}>
                <div className='position-relative'>
                    <div className='position-absolute top-0 start-100'>
                        <button onClick={handleClosebtn}>X</button>
                    </div>
                </div>
                <div className="container fw-bolder">
                    <pre>
                        <code>
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    </>
    )
}
