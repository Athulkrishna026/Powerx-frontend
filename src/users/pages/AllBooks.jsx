import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { allBooksApi } from '../../services/allApis'
import { Link } from 'react-router-dom'
import { searchKeyContext } from '../../context/ContextShare'

const AllBooks = () => {

    const [status, setStatus] = useState(true)
    const [token, setToken] = useState('')
    const [allBooks, setAllBooks] = useState([])
    const [tempAllBooks, setTempAllBooks] = useState([])

    const { searchKey, setSearchKey } = useContext(searchKeyContext)

    const getAllBooks = async (searchKey, token) => {
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }

        const result = await allBooksApi(searchKey, reqHeader)
        const arr = result.data
        console.log(arr)
        setAllBooks(arr)
        setTempAllBooks(arr)
    }

    const handleFilter = (data) => {
        console.log(data)
        if (data === 'Allbooks') {
            setAllBooks(tempAllBooks)
        } else {
            setAllBooks(tempAllBooks.filter(item =>
                item.category.toLowerCase() === data.toLowerCase()
            ))
        }
    }

    useEffect(() => {
        const t = sessionStorage.getItem('token')
        setToken(t)
        getAllBooks(searchKey, t)
    }, [searchKey])

    return (
        <div>
            <Header />

            {token ?

                <div className="flex flex-col justify-center items-center w-full">

                    <h1 className="text-black text-2xl mt-5">Collections</h1>

                    {/* SEARCH BAR */}
                    <div className="flex justify-center items-center py-5 w-full">
                        <input
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            placeholder="Search Book Name"
                            className="bg-white placeholder-gray-600 p-2 border rounded w-72 sm:w-96"
                            type="text"
                        />
                    </div>

                    {/* GRID LAYOUT */}
                    <div className="md:grid md:grid-cols-5 gap-5 md:p-10 p-5 w-full">

                        {/* FILTER SECTION */}
                        <div className="md:col-span-1 bg-white p-4 rounded shadow-sm">

                            <div className="flex justify-between items-center md:justify-center">
                                <h1 className="text-xl font-semibold">Filter</h1>
                                <button
                                    onClick={() => setStatus(!status)}
                                    className="md:hidden"
                                >
                                    <FontAwesomeIcon
                                        className="text-3xl text-black ms-5"
                                        icon={faBars}
                                    />
                                </button>
                            </div>

                            {/* FILTER OPTIONS */}
                            <div className={status ? "block mt-5" : "hidden md:block mt-5"}>

                                <div className="flex flex-col">

                                    <div
                                        className="mt-3 cursor-pointer"
                                        onClick={() => handleFilter('Allbooks')}
                                    >
                                        <input type="radio" name="filter" id="Allbooks" />
                                        <label htmlFor="Allbooks" className="ms-3">Allbooks</label>
                                    </div>

                                    <div
                                        className="mt-3 cursor-pointer"
                                        onClick={() => handleFilter('Fiction')}
                                    >
                                        <input type="radio" name="filter" id="Fiction" />
                                        <label htmlFor="Fiction" className="ms-3">Fiction</label>
                                    </div>

                                    <div
                                        className="mt-3 cursor-pointer"
                                        onClick={() => handleFilter('Self Help')}
                                    >
                                        <input type="radio" name="filter" id="Self Help" />
                                        <label htmlFor="Self Help" className="ms-3">Self Help</label>
                                    </div>

                                    <div
                                        className="mt-3 cursor-pointer"
                                        onClick={() => handleFilter('Horror')}
                                    >
                                        <input type="radio" name="filter" id="Horror" />
                                        <label htmlFor="Horror" className="ms-3">Horror</label>
                                    </div>

                                    <div
                                        className="mt-3 cursor-pointer"
                                        onClick={() => handleFilter('Adventure')}
                                    >
                                        <input type="radio" name="filter" id="Adventure" />
                                        <label htmlFor="Adventure" className="ms-3">Adventure</label>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>

                        {/* BOOKS SECTION */}
                        <div className="md:col-span-4">

                            <div
                                className="grid 
                                grid-cols-1 
                                sm:grid-cols-2 
                                md:grid-cols-3 
                                lg:grid-cols-4 
                                gap-6 mt-5">

                                {allBooks.length > 0 ? (

                                    allBooks.map((book, index) => (

                                        <div
                                            key={index}
                                            className="p-3 flex flex-col items-center text-center bg-white rounded shadow-md"
                                            hidden={book?.status === "pending" || book?.status === "sold"}
                                        >
                                            <img
                                                className="w-full max-w-xs rounded-md shadow-sm"
                                                src={book.imgUrl}
                                                alt="cover"
                                            />

                                            <p className="my-1 font-semibold">{book?.author}</p>
                                            <p className="my-1">{book?.title}</p>

                                            <Link to={`/view-book/${book?._id}`}>
                                                <button className="my-1 border border-blue-900 bg-blue-900 w-full p-2 text-white hover:bg-white hover:text-blue-900 rounded">
                                                    View More
                                                </button>
                                            </Link>
                                        </div>

                                    ))

                                ) : (
                                    <p>loading...</p>
                                )}

                            </div>

                        </div>
                    </div>

                </div>

                :

                <div className="flex justify-center flex-col items-center py-10">
                    <img
                        className="w-40"
                        src="https://cdn-icons-gif.flaticon.com/6569/6569164.gif"
                        alt=""
                    />
                    <p>Please <a className="underline text-blue-600" href="/login">Login</a> to access Books.</p>
                </div>

            }

            <Footer />
        </div>
    )
}

export default AllBooks
