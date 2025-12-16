import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faBars, faL, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userProfileUpdateContext } from '../../context/ContextShare'
import { serverURL } from '../../services/serverURL'

const Header = () => {

  const [visible, setVisible] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [token, setToken] = useState("")
  const [profile, setProfile] = useState("")
      const { userProfileStatus } = useContext(userProfileUpdateContext)

  const show = () => {

    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }

  }

  useEffect(() => {

    if (sessionStorage.getItem("token")) {
      const t = sessionStorage.getItem("token")
      setToken(t)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setProfile(user.profile)
    }

  }, [userProfileStatus])

  //console.log(token);



  return (
    <div>
      <div className=' w-screen grid grid-cols-3 items-center ps-2 md:ps-3  pe-7 md:pe-8'>
        <img className=' w-20 ' src="https://i.pinimg.com/736x/12/f3/f4/12f3f4ecc8d00b48041062625fa9ebed.jpg" alt="" />
        <h1 className=' text-4xl font-bold text-center'>BookStore</h1>
        <div className=' flex justify-end'>
          <div className='hidden gap-2 md:block'>
            <div className=' flex items-center justify-center'>
              <FontAwesomeIcon className=' text-2xl' icon={faInstagram} />
              <FontAwesomeIcon className=' text-2xl' icon={faFacebookF} />
              <FontAwesomeIcon className=' text-2xl ' icon={faXTwitter} />

              {!token ?

                <Link to={'/login'}><button className=' border-2 rounded p-2 font-bold ms-5' ><FontAwesomeIcon icon={faUser} /> Login</button></Link>

                :

                // dropdown 
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                      onClick={() => setDropDownStatus(!dropDownStatus)}
                    >

                      <img style={{ height: "50px", width: "50px", borderRadius: "50%" }} src={ profile ==""? "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" :`${serverURL}/uploads/${profile}`}  alt="" />

                    </button>
                  </div>

                  {dropDownStatus && <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <Link to={'/profile'}>
                        <p
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          <FontAwesomeIcon icon={faAddressCard} className="me-2" />{" "}
                          Profile
                        </p>
                      </Link>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-1"
                      >
                        <FontAwesomeIcon icon={faPowerOff} className="me-2" />
                        Logout
                      </button>
                    </div>
                  </div>}
                </div>
              }


            </div>
          </div>
        </div>
      </div>
      <div className=' hidden md:flex bg-black text-white py-3 gap-10 justify-center items-center'>
        <Link to={'/'}><p>Home</p></Link>
        <Link to={'/all-books'}><p>Books</p></Link>
        {/* <Link to={'/careers'}><p>Careers</p></Link> */}
        <Link to={'/contact'}><p>Contact</p></Link>
      </div>






      <div className=' bg-black w-screen p-2 flex justify-between md:hidden'>
        <button onClick={show}><FontAwesomeIcon className=' text-3xl text-white ms-5' icon={faBars} /></button>

        {!token ?

          <Link to={'/login'}><button className=' border-2 rounded p-2 font-bold ms-5 text-white me-5' ><FontAwesomeIcon className=' text-white' icon={faUser} /> Login</button></Link>

          :

          // dropdown 
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setDropDownStatus(!dropDownStatus)}
              >

                <img src="https://cdn-icons-png.flaticon.com/512/8792/8792047.png" alt="UserLogin" style={{ width: "40px", height: '40px', borderRadius: "50%" }} />

              </button>
            </div>


            {dropDownStatus && <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <Link to={'/profile'}>
                  <p
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    <FontAwesomeIcon icon={faAddressCard} className="me-2" />{" "}
                    Profile
                  </p>
                </Link>
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  <FontAwesomeIcon icon={faPowerOff} className="me-2" />
                  Logout
                </button>
              </div>
            </div>}
          </div>
        }
      </div>
      {
        visible ?
          <div className=' border border-white md:hidden rounded-br-sm rounded-tr-sm grid-cols-1 bg-black text-white w-28 text-center p-4 absolute'>
            <Link to={'/'}><p className=' pb-2'>Home</p></Link>
            <Link to={'/all-books'}><p className=' pb-2'>Books</p></Link>
            {/* <Link to={'/careers'}><p className=' pb-2'>Careers</p></Link> */}
            <Link to={'/contact'}><p className=' pb-2'>Contact</p></Link>
          </div>
          :
          ""
      }

    </div>
  )
}

export default Header