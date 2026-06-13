import React from 'react'
import HeaderLanding from './components/BHeaderLanding'
import BBody from './components/BBody'



const page = () => {
    return (
        <div className='text-white bg-linear-to-r from-gray-800 to-gray-600 p-5 h-full w-full'>
            <div>
                <HeaderLanding />
            </div>
            <div className=''>
                <BBody />
            </div>
        </div>
    )
}

export default page
