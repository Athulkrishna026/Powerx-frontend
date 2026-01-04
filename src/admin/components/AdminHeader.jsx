import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeader = () => {
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate("/")
    }

    // return (
    //     <div>
    //         <div className=' h-20 bg-white flex justify-between items-center py-3 px-2 sm:px-5 md:px-10'>
    //             <div className=' flex sm:gap-1 justify-center items-center'>
    //                 <img className=' w-12 sm:w-20 ' src="https://i.pinimg.com/736x/12/f3/f4/12f3f4ecc8d00b48041062625fa9ebed.jpg" alt="" />
    //                 <h1 className=' text-xl sm:text-2xl md:text-4xl font-bold text-center'>BookStore</h1>
    //             </div>
    //             <div>
    //                 <button onClick={logout} className=' bg-white border-2 p-1 sm:p-2 border-black rounded text-black'><FontAwesomeIcon icon={faPowerOff} />Logout</button>
    //             </div>
    //         </div>
    //         <div>
    //             <marquee className='p-3 bg-gray-800 text-white' behavior="" direction="left">
    //                 Welcome Admineyy! 
    //             </marquee>
    //         </div>
    //     </div>
    // )

    return (
        <nav className="w-full px-6 py-4 bg-gradient-to-r from-black via-slate-900 to-black">
            <div className="max-w-7xl mx-auto flex items-center justify-between pt-3 pb-3">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        Px
                    </div>
                </div>

                {/* Center Navigation */}
                <div className="hidden md:flex gap-6">
                    <Link
                        to="/"
                        className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        Home
                    </Link>

                    


                </div>

                {/* Right Action */}
                <div className="flex gap-2">
                    <Link onClick={logout}
                        to="/login"
                        className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
                    >
                        Logout
                    </Link>
                    

                </div>


            </div>
        </nav>
    );
}

export default AdminHeader