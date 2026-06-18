import React from 'react'
import HeaderLanding from './components/BHeaderLanding'
import BBody from './components/BBody'



const page = () => {
    return (
        <div className='text-white bg-linear-to-r from-gray-800 to-gray-600 p-5 h-full w-full'>
            <div>
                <HeaderLanding />
            </div>

            <div className='border-be-yellow-600  border-t border-b-10 py-10 mx-75 mt-2'>
                <BBody />
            </div>
        </div>
    )
}

export default page
