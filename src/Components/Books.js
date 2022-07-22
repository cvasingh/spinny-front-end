import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './Loader';
import Table from './Table';

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
        Header: "Category",
        accessor: "category"
    },
    {
        Header: "Rate For A Day",
        accessor: (item) => `Rs. ${item.rentPerDay}`
    }
]
export default function Main({ apiLink }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState({
        bookName: undefined,
        category: undefined,
        rentPerDay: undefined
    })
    // festch device data from csf_device table 
    useEffect(() => {
        setLoading(true)
        axios.post(`${apiLink}/bookAPI/searchBook`, filter)
            .then((res) => {
                // handle success
                setData([...res.data])
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [filter])
    return <>
        <div className='row align-items-center justify-content-center m-0 mt-3'>
            <div className='col-md-10 cfs-box'>
                <div className='h4 text-cfs-primary'>Books Filter</div>
                <form className="p-2">
                    <div class="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Search"
                            value={filter.bookName} onChange={(e) => setFilter({ ...filter, bookName: e.target.value })} />
                        <label for="floatingInput">Enter book name or a term in the name of the book</label>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <div className="form-check form-check-inline">
                                <label class="form-label">Select Category:</label>
                                <select className="form-select" value={filter.category}
                                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
                                    <option key="null" value={undefined}> </option>
                                    {["Crime", "Fiction", "Romance"].map(item => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div class="col-8">
                            <div className="mb-2">
                                <label class="form-label">Rate Per Day: (set only Maximum Limit)</label>
                                <div className='row align-items-center justify-content-center m-0 mt-3'>
                                    <div className='col-1'>0</div>
                                    <div className='col-10'>
                                        <input type="range" class="form-range" min="1" max="10" step="1"
                                            value={filter.rentPerDay ? filter.rentPerDay[1] : ""}
                                            onChange={(e) => setFilter({ ...filter, rentPerDay: [0, e.target.value] })} />
                                    </div>
                                    <div className='col-1'>10</div>
                                </div>
                            </div>
                        </div>
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
