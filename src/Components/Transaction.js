import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './Loader';
import Table from './Table';
import Bill from './Bill';
// set columns 
const COLUMNS = [
    {
        Header: "Id",
        accessor: (row, index) => index + 1
    },
    {
        Header: "Book Name",
        accessor: "bookName"
    },
    {
        Header: "Person Name",
        accessor: "person"
    },
    {
        Header: "Issued Date",
        accessor: (item) => {
            const d = new Date(item.issuedDate)
            return ((d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
                + "-" + (d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth())
                + "-" + d.getFullYear()
            )
        }
    },
    {
        Header: "Returned Date",
        accessor: (item) => {
            if (item.returnedDate) {
            const d = new Date(item.returnedDate)
            return ((d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
                + "-" + (d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth())
                + "-" + d.getFullYear()
            )
        }else{
            return "Not Return Yet"
        }
        }

    }
]

export default function Transactions({ apiLink }) {
    const [issudata, setIssudata] = useState({
        bookName: "",
        person: "",
        issuedDate: "",
    })
    const [returndata, setReturndata] = useState({
        bookName: "",
        person: "",
        returnedDate: ""
    })
    const [data, setData] = useState([])
    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(false)
    const [showBill, setShowBill] = useState(false)
    // festch device data from csf_device table 
    useEffect(() => {
        setLoading(true)
        axios.get(`${apiLink}/transactionAPI/allTransaction`)
            .then((res) => {
                // handle success
                setData([...res.data])
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [result])

    const handleIssu = (e) => {
        setLoading(true)
        axios.post(`${apiLink}/transactionAPI/bookIssued`, issudata)
            .then((res) => {
                // handle success
                console.log(res.data);
                setResult(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        e.preventDefault();
    }

    const handleReturn = (e) => {
        setLoading(true)
        axios.post(`${apiLink}/transactionAPI/bookReturn`, returndata)
            .then((res) => {
                // handle success
                console.log(res.data);
                setResult(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
            .then(() => {
                setShowBill(true)
                setTimeout(() => setShowBill(false), 5000)
            })
        e.preventDefault();
    }
    return <>
        {showBill && <Bill result={result} />}
        <div className='row align-items-center justify-content-center m-0 mt-3'>
            <div className='col-md-5 cfs-box'>
                <div className='h4 text-cfs-primary'>Books Issu</div>
                <form className="p-2" onSubmit={handleIssu}>
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" "
                            value={issudata.bookName} onChange={(e) => setIssudata({ ...issudata, bookName: e.target.value })} required />
                        <label for="floatingInput">Enter Book Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" "
                            value={issudata.person} onChange={(e) => setIssudata({ ...issudata, person: e.target.value })} required />
                        <label for="floatingInput">Enter Person Name</label>
                    </div>
                    <div class="mb-3">
                        <label for="Issu Date" class="form-label">Issu Date:</label>
                        <input type="date" class="form-control"
                            value={issudata.issuedDate} onChange={(e) => setIssudata({ ...issudata, issuedDate: e.target.value })} required></input>
                    </div>
                    <div className="d-grid gap-2 col-8 m-2 mx-auto ">
                        <button className='btn btn-cfs-primary' type="submit">Update</button>
                    </div>
                </form>
            </div>
            <div className='col-md-5 cfs-box'>
                <div className='h4 text-cfs-primary'>Books Return</div>
                <form className="p-2" onSubmit={handleReturn}>
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" "
                            value={returndata.bookName} onChange={(e) => setReturndata({ ...returndata, bookName: e.target.value })} required />
                        <label for="floatingInput">Enter Book Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" "
                            value={returndata.person} onChange={(e) => setReturndata({ ...returndata, person: e.target.value })} required />
                        <label for="floatingInput">Enter Person Name</label>
                    </div>
                    <div class="mb-3">
                        <label for="Return Date" class="form-label">Return Date:</label>
                        <input type="date" class="form-control"
                            value={returndata.returnedDate} onChange={(e) => setReturndata({ ...returndata, returnedDate: e.target.value })} required></input>
                    </div>
                    <div className="d-grid gap-2 col-8 m-2 mx-auto ">
                        <button className='btn btn-cfs-primary' type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
        <div className='row align-items-center justify-content-center m-0'>
            <div className='col-md-10'>
                {loading ? <Loader /> :
                    <Table datas={data} COLUMNS={COLUMNS} />}
            </div>
        </div>
    </>
}
