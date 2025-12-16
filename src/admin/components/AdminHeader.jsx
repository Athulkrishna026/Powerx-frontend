import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeader = () => {
    const navigate = useNavigate()

    const logout = ()=>{
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div>
            <div className=' h-20 bg-white flex justify-between items-center py-3 px-2 sm:px-5 md:px-10'>
                <div className=' flex sm:gap-1 justify-center items-center'>
                    <img className=' w-12 sm:w-20 ' src="https://i.pinimg.com/736x/12/f3/f4/12f3f4ecc8d00b48041062625fa9ebed.jpg" alt="" />
                    <h1 className=' text-xl sm:text-2xl md:text-4xl font-bold text-center'>BookStore</h1>
                </div>
                <div>
                    <button onClick={logout} className=' bg-white border-2 p-1 sm:p-2 border-black rounded text-black'><FontAwesomeIcon icon={faPowerOff} />Logout</button>
                </div>
            </div>
            <div>
                <marquee className='p-3 bg-gray-800 text-white' behavior="" direction="left">
                    Welcome Admin! 
                </marquee>
            </div>
        </div>
    )
}

export default AdminHeader