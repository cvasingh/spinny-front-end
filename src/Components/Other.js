import React, { useState } from 'react'
import axios from 'axios';
import Loader from './Loader';

export default function Other({ apiLink }) {
    const [loading, setLoading] = useState(false)

    const [bookNameToPerson, setBookNameToPerson] = useState("")
    const [bookNameToRent, setBookNameToRent] = useState("")
    const [person, setPerson] = useState("")
    const [date, setDate] = useState({
        issuedDate: '',
        returnedDate: ''
    })
    const [data, setData] = useState([])

    const handleBookNameToPerson = (e) => {
        setLoading(true)
        setData([])
        axios.post(`${apiLink}/otherAPI/bookNameToPerson`, { bookName: bookNameToPerson })
            .then((res) => {
                // handle success
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        e.preventDefault();
    }

    const handleBookNameToRent = (e) => {
        setLoading(true)
        setData([])
        axios.post(`${apiLink}/otherAPI/bookNameToRent`, { bookName: bookNameToRent })
            .then((res) => {
                // handle success
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        e.preventDefault();
    }

    const handlePerson = (e) => {
        setLoading(true)
        setData([])
        axios.post(`${apiLink}/otherAPI/personToBookName`, { person })
            .then((res) => {
                // handle success
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        e.preventDefault();
    }

    const handleDate = (e) => {
        setLoading(true)
        setData([])
        axios.post(`${apiLink}/otherAPI/datesToPerson`, date)
            .then((res) => {
                // handle success
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        e.preventDefault();
    }
    return <>
        <div className='row align-items-center justify-content-center m-0 mt-3'>
            <div className='col-sm-5 cfs-box'>
                <div className='h6 text-cfs-primary'>List of People</div>
                <form className="p-2" onSubmit={handleBookNameToPerson}>
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" "
                            value={bookNameToPerson} onChange={(e) => setBookNameToPerson(e.target.value)} />
                        <label for="floatingInput">Search With Book Name</label>
                    </div>
                    <div className="d-grid gap-2 col-8 m-2 mx-auto ">
                        <button className='btn btn-cfs-primary' type="submit">Search</button>
                    </div>
                </form>
            </div>
            <div className='col-sm-5 cfs-box'>
                <div className='h6 text-cfs-primary'>Total Rent</div>
                <form className="p-2" onSubmit={handleBookNameToRent}>
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" "
                            value={bookNameToRent} onChange={(e) => setBookNameToRent(e.target.value)} />
                        <label for="floatingInput">Search With Book Name</label>
                    </div>
                    <div className="d-grid gap-2 col-8 m-2 mx-auto ">
                        <button className='btn btn-cfs-primary' type="submit">Search</button>
                    </div>
                </form>
            </div>
            <div className='col-sm-5 cfs-box'>
                <div className='h6 text-cfs-primary'>List Of Books</div>
                <form className="p-2" onSubmit={handlePerson}>
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder=" "
                            value={person} onChange={(e) => setPerson(e.target.value)} />
                        <label for="floatingInput">Search With Person Name</label>
                    </div>
                    <div className="d-grid gap-2 col-8 m-2 mx-auto ">
                        <button className='btn btn-cfs-primary' type="submit">Search</button>
                    </div>
                </form>
            </div>
            <div className='col-sm-5 cfs-box'>
                <div className='h6 text-cfs-primary'>List Of Books And Person</div>
                <form className="p-2" onSubmit={handleDate}>
                    <div class="row">
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="Issu Date" class="form-label">Issu Date:</label>
                                <input type="date" class="form-control"
                                    value={date.issuedDate} onChange={(e) => setDate({ ...date, issuedDate: e.target.value })} required></input>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="mb-3">
                                <label for="Issu Date" class="form-label">Return Date:</label>
                                <input type="date" class="form-control"
                                    value={date.returnedDate} onChange={(e) => setDate({ ...date, returnedDate: e.target.value })} required></input>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-8 m-2 mx-auto ">
                        <button className='btn btn-cfs-primary' type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <div className='row align-items-center justify-content-center m-0'>
            <div className='col-md-10'>
                <div className='cfs-box'>
                    {loading ?
                        <Loader /> :
                        JSON.stringify(data)}
                </div>
            </div>
        </div>
    </>
}
