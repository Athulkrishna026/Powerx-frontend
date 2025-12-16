import { faBook, faGear, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/ContextShare'

const AdminSidebar = () => {
    const [homeStatus, setHomeStatus] = useState(false)
    const [bookStatus, setBookStatus] = useState(false)
    const [settingsStatus, setSettingsStatus] = useState(false)
    const [adminDetails, setAdminDetails] = useState({
        username: "",
        profile: ""
    })

    const nav = useNavigate()
    const {adminProfileStatus} = useContext(adminProfileUpdateContext)

    const handlePage = (page) => {

        if (page == "home") {
            nav('/admin-home')
        }
        else if (page == "books") {
            nav('/admin-books')
        }
        else if (page == "settings") {
            nav('/admin-settings')
        }

    }


    useEffect(() => {

        if (location.pathname == '/admin-home') {
            setHomeStatus(true)
        }
        else if (location.pathname == '/admin-books') {
            setBookStatus(true)
        }
        else if (location.pathname == '/admin-settings') {
            setSettingsStatus(true)
        }
        else {
            console.log("no page found");
        }

        if (sessionStorage.getItem('token')) {
            
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setAdminDetails({ username: user.username, profile:user.profile})
        }

    }, [adminProfileStatus])



    return (
        <div className=' bg-blue-300 h-full'>
            <div className='p-20 md:p-10 flex flex-col justify-center items-center'>
                <img className="rounded-full" src={adminDetails.profile ==""? "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png" :`${serverURL}/uploads/${adminDetails.profile}`} alt="" />
                <h1 className='mt-5'>{adminDetails.username}</h1>
            </div>
            <div className=' my-3 md:my-5 px-10'>
                <div className=' mb-3'>
                    <input type="radio" name="filter" id="filter" readOnly checked={homeStatus} />
                    <label onClick={() => handlePage("home")} className=' ms-3' htmlFor="filter"><FontAwesomeIcon className=' me-1' icon={faHouse} />Home</label>
                </div>
                <div className=' mb-3 '>
                    <input type="radio" name="ab" id="ab" readOnly checked={bookStatus} />
                    <label onClick={() => handlePage("books")} className=' ms-3' htmlFor="ab"><FontAwesomeIcon className=' me-1' icon={faBook} />All Books</label>
                </div>
                <div className=' mb-3 '>
                    <input type="radio" name="set" id="set" readOnly checked={settingsStatus} />
                    <label onClick={() => handlePage("settings")} className=' ms-3' htmlFor="set"><FontAwesomeIcon className=' me-1' icon={faGear} />Settings</label>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar