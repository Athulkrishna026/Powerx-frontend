import { faEye, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makepaymentAPI, viewBookApi } from '../../services/allApis';
import { serverURL } from '../../services/serverURL';
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify';

const ViewBooks = () => {

    const [modal, setModal] = useState(false);
    const [book, setBook] = useState({});
    const [token, setToken] = useState("")
    
    const { id } = useParams();


    const viewBook = async (id) => {
        const result = await viewBookApi(id);
        if (result.status === 200) {
            setBook(result.data);
        }
    };
    console.log(book);
    

    const makePayment = async ()=>{
        console.log(book);
        const stripe = await loadStripe('pk_test_51SeX1NLOmj0ZOn0vWApOIAXOTSPyZG0gLdLENpTw4r5cqdjnQKG5v05nnY5CX45LwNoMiKlpbJ6SVIsy0yDF6eny00M4gLOBKt');
        const reqBody ={
            bookDetails:book
        }
        const reqHeader ={
            "Authorization" : `Bearer ${token}`
        }

        const result = await makepaymentAPI(reqBody,reqHeader)
        console.log(result);

        const checkOutURL = result?.data?.url

        if(checkOutURL){
            // just redirect to page
            window.location.href = checkOutURL
        }else{
            toast.error("something wrong")
        }
        
        

    }

    useEffect(() => {
        viewBook(id);
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            setToken(token)
        }
    }, []);

    return (
        <div className="w-full flex justify-center py-10 px-5">

            {/* MAIN CONTENT WRAPPER */}
            <div className="w-full max-w-6xl bg-white p-6 rounded shadow-md">

                {book && (
                    <div className="grid md:grid-cols-2 gap-10">

                        {/* LEFT SECTION - BOOK IMAGE */}
                        <div className="flex justify-center">
                            <img
                                className="w-full max-w-sm rounded shadow"
                                src={book?.imgUrl}
                                alt="Book"
                            />
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="flex flex-col gap-6">

                            {/* VIEW ICON */}
                            <div className="flex justify-end">
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className="text-xl cursor-pointer hover:text-blue-600"
                                    onClick={() => setModal(true)}
                                />
                            </div>

                            {/* TITLE + AUTHOR */}
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">{book?.title}</h1>
                                <h2 className="text-xl font-medium mt-1">{book?.author}</h2>
                            </div>

                            {/* BOOK DETAILS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 text-gray-700">

                                <div className="bg-gray-100 p-3 rounded shadow-sm">
                                    <p><strong>Publisher:</strong> {book?.publisher}</p>
                                </div>

                                <div className="bg-gray-100 p-3 rounded shadow-sm">
                                    <p><strong>Language:</strong> {book?.language}</p>
                                </div>

                                <div className="bg-gray-100 p-3 rounded shadow-sm">
                                    <p><strong>No. of Pages:</strong> {book?.nop}</p>
                                </div>

                                <div className="bg-gray-100 p-3 rounded shadow-sm">
                                    <p><strong>Seller Email:</strong> {book?.userMail}</p>
                                </div>

                                <div className="bg-gray-100 p-3 rounded shadow-sm">
                                    <p><strong>Price:</strong> ₹{book?.price}</p>
                                </div>

                                <div className="bg-gray-100 p-3 rounded shadow-sm">
                                    <p><strong>ISBN:</strong> {book?.isbn}</p>
                                </div>

                            </div>

                            {/* ABSTRACT */}
                            <div className="mt-5 bg-gray-50 p-4 rounded shadow-sm leading-relaxed">
                                <p>{book?.abstract}</p>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex justify-end gap-3 mt-5">
                                <button className="p-2 px-5 bg-red-600 text-white rounded hover:bg-red-700">
                                    Close
                                </button>
                                <button onClick={makePayment} className="p-2 px-5 bg-green-600 text-white rounded hover:bg-green-700">
                                    Buy ${book?.price}
                                </button>
                            </div>

                        </div>

                    </div>
                )}
            </div>

            {/* MODAL - QUICK PHOTOS */}
            {modal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5 z-50"
                >
                    <div className="bg-white rounded shadow-lg w-full max-w-5xl">

                        {/* MODAL HEADER */}
                        <div className="bg-black text-white px-4 py-3 flex justify-between items-center rounded-t">
                            <h1 className="text-lg font-semibold">Quick Photos</h1>
                            <FontAwesomeIcon
                                icon={faX}
                                className="cursor-pointer hover:text-red-400"
                                onClick={() => setModal(false)}
                            />
                        </div>

                        {/* MODAL IMAGE GRID */}
                        <div className="p-5 grid sm:grid-cols-2 md:grid-cols-3 gap-5">

                            {book?.uploadImg?.map((item, index) => (
                                <div key={index} className="flex justify-center">
                                    <img
                                        className="h-60 rounded shadow"
                                        src={`${serverURL}/upload/${item}`}
                                        alt="Preview"
                                    />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            )}
                  <ToastContainer theme='colored' position='top-center' autoClose='2000' />


        </div>
    );
};

export default ViewBooks;
