import { faHouse, faSquarePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { allBooksAdminApi, approveBooksApi, getAllUsersApi } from '../../services/allApis'

export const AdminBooks = () => {

  const [bookListSatus, setbookListStatus] = useState(true)
  const [usersStatus, setUsersStatus] = useState(false)
  const [token, setToken] = useState('')
  const [approveStatus, setApproveStatus] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [users, setUsers] = useState([])

  const getAllAdminBooks = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }

    const result = await allBooksAdminApi(reqHeader)
    const arr = result.data
    console.log(arr);
    if (result.status == 200) {
      setAllBooks(arr)

    }
  }

  const handleApprove = async (data) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    }

    const result = await approveBooksApi(data, reqHeader)
    // const arr = result.data
    // console.log(arr);
    if (result.status == 200) {
      setApproveStatus(true)
    }
  }

  const getAllUsers = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await getAllUsersApi(reqHeader)
    if (result.status == 200) {
      console.log(result.data);
      setUsers(result.data)
    } else {
      console.log('err');
    }
  }

  useEffect(() => {
    const t = sessionStorage.getItem('token')
    getAllAdminBooks(t)
    setToken(t)
    if (usersStatus == true) {
      getAllUsers()
    }

  }, [approveStatus, usersStatus])


  return (
    <>
      <AdminHeader />

      <div className=' grid md:grid-cols-[1fr_4fr]'>

        <div>
          <AdminSidebar />
        </div>
        <div>
          {/* tabs */}
          <div className=' flex justify-center items-center my-5 gap-0'>

            <p onClick={() => { setbookListStatus(true); setUsersStatus(false) }} className={bookListSatus ? ' p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded-t cursor-pointer' : ' p-4 text-black border-b border-gray-200'}> Book List</p>
            <p onClick={() => { setbookListStatus(false); setUsersStatus(true); }} className={usersStatus ? ' p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded-t cursor-pointer' : ' p-4 text-black border-b border-gray-200'}>Users</p>


          </div>



          {/* content */}
          {
            bookListSatus &&
            <div>
              <h1 className=' text-2xl text-center'>Book List</h1>
              <div className=' p-3 px-10 sm:px-24 md:grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3'>

                {allBooks.length > 0 ?

                  allBooks.map((book, index) => (

                    <div key={index} className={book.status == "sold" ? 'p-3 border border-gray-300 opacity-50' : ' p-3 border border-gray-300'}>
                      <div className=' flex flex-col'>
                        <img className=' h-80' src={book.imgUrl} alt="" />
                        <h1 className=' mt-2 text-xl text-blue-400'>{book.author}</h1>
                        <h1 className=' mt-2 text-lg'>{book.title}</h1>
                        <h1 className=' mt-2 text-amber-600'>${book.price}</h1>
                        <div className=' mt-3'>

                          {book.status == "pending" &&
                            <button onClick={() => handleApprove(book)} className=' w-full bg-green-600 text-white p-2'>Approve</button>}


                          {book.status == "approved" &&
                            <button  className=' w-full bg-white border border-green-600 text-green-600 p-2'>Done<FontAwesomeIcon icon={faCircleCheck} style={{color: "#63E6BE",}} /></button>
                            

                            }
                        </div>
                      </div>
                    </div>

                  ))

                  :

                  <p>No books added.</p>


                }



              </div>
            </div>
          }
          {
            usersStatus &&
            <div>
              <h1 className=' text-2xl text-center'>Users</h1>

              <div className=' grid md:grid-cols-2 lg:grid-cols-3'>
                {users.length > 0 &&

                  users.map((user, index) => (

                    <div key={index} className=' p-5'>
                      <div className=' bg-gray-300 p-5'>
                        <h4 className=' text-red-500'>ID : {user._id}</h4>
                        <div className=' flex gap-3 my-3'>
                          <img className=' w-20 rounded-4xl' src={!user.profile ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" : user.profile} alt="" />
                          <div>
                            <h1 className=' text-2xl text-blue-400'>{user.username}</h1>
                            <p>{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  ))

                }

              </div>

            </div>
          }

        </div>

      </div>


      <Footer />
    </>
  )
}
