import React from 'react'

export default function Bill({ result }) {
    const d = new Date()
    const date = d.getDate() + "/0" + d.getMonth() + "/" + d.getFullYear();

    return (
        <div className='row align-items-center justify-content-center m-0 mt-3 position-relative'>
            <div className='col-md-7 cfs-box px-5 position-absolute top-0 start-50 translate-middle'
                style={{ background: 'rgb(245, 210, 243)', zIndex: '1000',marginTop:'260px'}}>
                <div className="container">
                    <p className="m-3 text-center" style={{ fontSize: '30px' }}>Thank You</p>
                    <div className="row">
                        <ul className="list-unstyled">
                            <li className="text-black">Name: {result.person}</li>
                            <li className="text-muted mt-1"><span className="text-black">Invoice: </span> #12345</li>
                            <li className="text-black mt-1">Date: {date}</li>
                        </ul>
                        <hr />
                        <div className="col-sm-8">
                            <p>Rent per Day</p>
                        </div>
                        <div className="col-sm-4">
                            <p className="float-end">Rs. {result.rentPerDay}
                            </p>
                        </div>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <p>Number of Days</p>
                        </div>
                        <div className="col-sm-4">
                            <p className="float-end">{result.day}
                            </p>
                        </div>
                        <hr style={{ border: '2px solid black' }} />
                    </div>
                    <div className="row text-black">
                        <div className="col-sm-12">
                            <p className="float-end fw-bold">Total: Rs. {result.Rs}
                            </p>
                        </div>
                        <hr style={{ border: '2px solid black' }} />
                    </div>
                    <div className="text-center" style={{ marginTop: '20px' }}>
                        <a><u className="text-info">View in browser</u></a>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
