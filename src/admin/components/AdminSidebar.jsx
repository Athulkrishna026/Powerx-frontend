import { faBook, faGear, faHouse, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../../services/serverURL'
import { adminProfileUpdateContext } from '../../context/ContextShare'

const AdminSidebar = () => {

  const [open, setOpen] = useState(true)

  const [homeStatus, setHomeStatus] = useState(false)
  const [bookStatus, setBookStatus] = useState(false)
  const [settingsStatus, setSettingsStatus] = useState(false)
  const [rentalStatus, setRentalStatus] = useState(false)

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    profile: ""
  })

  const nav = useNavigate()
  const { adminProfileStatus } = useContext(adminProfileUpdateContext)

  const handlePage = (page) => {
    setHomeStatus(false)
    setBookStatus(false)
    setSettingsStatus(false)
    setRentalStatus(false)

    if (page === "home") {
      setHomeStatus(true)
      nav('/admin-home')
    }
    else if (page === "books") {
      setBookStatus(true)
      nav('/admin-books')
    }
    else if (page === "rental") {
      setRentalStatus(true)
      nav('/admin-rentals')
    }
    else if (page === "settings") {
      setSettingsStatus(true)
      nav('/admin-settings')
    }
  }

  useEffect(() => {

    if (location.pathname === '/admin-home') setHomeStatus(true)
    if (location.pathname === '/admin-books') setBookStatus(true)
    if (location.pathname === '/admin-settings') setSettingsStatus(true)
    if (location.pathname === '/admin-rentals') setRentalStatus(true)


    if (sessionStorage.getItem('token')) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({ username: user.username, profile: user.profile })
    }

  }, [adminProfileStatus])

  return (
    <div className={`
      min-h-screen
      ${open ? 'w-64' : 'w-20'}
      transition-all duration-500 ease-in-out
      bg-gradient-to-b from-black via-slate-900 to-black
      backdrop-blur-xl bg-white/10
      border-r border-white/20
      shadow-2xl
      text-white
      relative
    `}>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute -right-4 top-6 bg-black border border-white/20 p-2 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Admin Profile */}
      <div className="p-6 flex flex-col items-center">
        <img
          className="rounded-full w-16 h-16 border-2 border-cyan-400 shadow-[0_0_20px_#22d3ee]"
          src={
            adminDetails.profile === ""
              ? "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"
              : `${serverURL}/uploads/${adminDetails.profile}`
          }
          alt=""
        />
        {open && (
          <h1 className="mt-4 text-sm font-semibold tracking-wide">
            {adminDetails.username}
          </h1>
        )}
      </div>

      {/* Menu */}
      <div className="mt-8 px-4 space-y-4">

        {/* Home */}
        <div
          onClick={() => handlePage("home")}
          className={`
            flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-300
            ${homeStatus
              ? 'bg-cyan-500/20 shadow-[0_0_20px_#22d3ee] border border-cyan-400'
              : 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'}
          `}
        >
          <FontAwesomeIcon icon={faHouse} />
          {open && <span>Home</span>}
        </div>

        {/* Books */}
        <div
          onClick={() => handlePage("books")}
          className={`
            flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-300
            ${bookStatus
              ? 'bg-purple-500/20 shadow-[0_0_20px_#a855f7] border border-purple-400'
              : 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'}
          `}
        >
          <FontAwesomeIcon icon={faBook} />
          {open && <span>All Tools</span>}
        </div>

        <div
          onClick={() => handlePage("rental")}
          className={`
            flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-300
            ${rentalStatus
              ? 'bg-yellow-500/20 shadow-[0_0_20px_#a855f7] border border-yellow-400'
              : 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'}
          `}
        >
          <FontAwesomeIcon icon={faBook} />
          {open && <span>All Rentals</span>}
        </div>

        {/* Settings */}
        <div
          onClick={() => handlePage("settings")}
          className={`
            flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
            transition-all duration-300
            ${settingsStatus
              ? 'bg-emerald-500/20 shadow-[0_0_20px_#34d399] border border-emerald-400'
              : 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]'}
          `}
        >
          <FontAwesomeIcon icon={faGear} />
          {open && <span>Settings</span>}
        </div>

      </div>
    </div>
  )
}

export default AdminSidebar
