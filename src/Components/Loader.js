import React from 'react'
import { PulseLoader } from 'react-spinners';

export default function Loader() {
    return (
        <div className='m-2 p-5 position-relative'>
            <div className='position-absolute top-50 start-50 translate-middle'>
                <PulseLoader color='#5B2C6F' size={20} margin={10}/>
            </div>
        </div>
    )
}
