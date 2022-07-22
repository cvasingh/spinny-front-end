import { useState, useRef } from 'react';
import './App.css';
import './bootstrap.css';
import Books from './Components/Books';
import Other from './Components/Other';
import Transactions from './Components/Transaction';


function App() {
  const [show, setShow] = useState('book')

  const [apiLink, setApiLink] = useState(sessionStorage.getItem('apiLink') || 'http://flask-env.eba-h6dhzczh.ap-south-1.elasticbeanstalk.com')
  const [reload, setReload] = useState(true)
  const handleApiLink = (e) => {
    sessionStorage.setItem('apiLink', apiLink);
    setReload(!reload)
    e.preventDefault();
  }

  const z = useRef(null);

  const allBooks = () => {
    z.current.style.left = "0";
    setShow('book')
  }

  const allTrans = () => {
    z.current.style.left = "185px";
    setShow('trans')
  }
  const allOthers = () => {
    z.current.style.left = "365px";
    setShow('')
  }

  return <div className='cfs-box'>
    <div className='py-4 position-relative'>
      <div className='position-absolute top-0 start-50 translate-middle mt-3'>
        <div className="button_box">
          <div id="btn" ref={z}></div>
          <button type="button" className="toggle_btn" onClick={allBooks}>All Books</button>
          <button type="button" className="toggle_btn" onClick={allTrans}>All Transactions</button>
          <button type="button" className="toggle_btn" onClick={allOthers}>Others</button>
        </div>
      </div>
    </div>
    {reload && <>
      {show === 'book' ?
        <Books apiLink={apiLink} /> :
        show === 'trans' ?
          <Transactions apiLink={apiLink} /> :
          <Other apiLink={apiLink} />}
    </>}
    {!reload && <>
      {show === 'book' ?
        <Books apiLink={apiLink} /> :
        show === 'trans' ?
          <Transactions apiLink={apiLink} /> :
          <Other apiLink={apiLink} />}
    </>}

    <div className='row align-items-center justify-content-center m-0 mt-3'>
      <div className='col-md-6 cfs-box'>
        <form className="p-2" onSubmit={handleApiLink}>
          <div class="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder=" "
              value={apiLink} onChange={(e) => setApiLink(e.target.value)} required />
            <label for="floatingInput">Change APIs Link (like-'http://127.0.0.1:5000')</label>
          </div>
          <div className="d-grid gap-2 col-8 m-2 mx-auto ">
            <button className='btn btn-cfs-primary' type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}

export default App;
