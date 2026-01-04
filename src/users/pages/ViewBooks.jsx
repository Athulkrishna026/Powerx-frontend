import { faEye, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { makepaymentAPI, viewBookApi } from '../../services/allApis'
import { serverURL } from '../../services/serverURL'
import { loadStripe } from '@stripe/stripe-js'
import { toast, ToastContainer } from 'react-toastify'

const ViewBooks = () => {

  const [modal, setModal] = useState(false)
  const [book, setBook] = useState({})
  const [token, setToken] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()

  const viewBook = async (id) => {
    const result = await viewBookApi(id)
    if (result.status === 200) {
      setBook(result.data)
    }
  }

  const makePayment = async () => {
    const stripe = await loadStripe(
      'pk_test_51SeX1NLOmj0ZOn0vWApOIAXOTSPyZG0gLdLENpTw4r5cqdjnQKG5v05nnY5CX45LwNoMiKlpbJ6SVIsy0yDF6eny00M4gLOBKt'
    )

    const reqBody = { bookDetails: book }
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    }

    const result = await makepaymentAPI(reqBody, reqHeader)
    const checkOutURL = result?.data?.url

    if (checkOutURL) {
      window.location.href = checkOutURL
    } else {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    viewBook(id)
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black
                    flex justify-center items-center px-5 py-10">

      {/* MAIN GLASS CARD */}
      <div className="w-full max-w-6xl
                      backdrop-blur-xl bg-white/10
                      border border-white/20
                      rounded-3xl shadow-2xl p-6 md:p-10 text-white">

        {book && (
          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT - IMAGE */}
            <div className="flex justify-center">
              <img
                className="w-full max-w-sm rounded-2xl shadow-lg border border-white/20"
                src={book?.imgUrl}
                alt="Tool"
              />
            </div>

            {/* RIGHT - DETAILS */}
            <div className="flex flex-col gap-6">

              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {book?.title}
                </h1>
                <p className="text-gray-300 mt-1">
                  Category: {book?.category}
                </p>
              </div>

              {/* INFO GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="bg-white/10 backdrop-blur
                                border border-white/20
                                p-4 rounded-xl">
                  <p className="text-sm text-gray-300">Daily Rent</p>
                  <p className="text-xl font-semibold text-white">
                    ₹ {book?.price}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur
                                border border-white/20
                                p-4 rounded-xl">
                  <p className="text-sm text-gray-300">Availability</p>
                  <p className="text-xl font-semibold text-green-400">
                    Ready to Rent
                  </p>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 mt-6">

                <button
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 rounded-full
                             bg-red-500/80 border border-red-400
                             hover:bg-red-600 transition"
                >
                  Close
                </button>

                <button
                  onClick={makePayment}
                  className="flex-1 py-3 rounded-full
                             bg-blue-600 border border-blue-400
                             hover:bg-blue-700 transition"
                >
                  Take Rent
                </button>

              </div>

              {/* VIEW MORE IMAGES */}
              {book?.uploadImg?.length > 0 && (
                <button
                  onClick={() => setModal(true)}
                  className="mt-4 flex items-center gap-2
                             text-blue-400 hover:text-blue-300 transition"
                >
                  <FontAwesomeIcon icon={faEye} />
                  View More Images
                </button>
              )}

            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/70
                        flex justify-center items-center z-50 p-5">

          <div className="bg-white rounded-2xl w-full max-w-5xl shadow-xl">

            <div className="flex justify-between items-center
                            px-6 py-4 bg-black text-white rounded-t-2xl">
              <h2 className="text-lg font-semibold">Tool Images</h2>
              <FontAwesomeIcon
                icon={faX}
                className="cursor-pointer hover:text-red-400"
                onClick={() => setModal(false)}
              />
            </div>

            <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {book?.uploadImg?.map((item, index) => (
                <img
                  key={index}
                  className="h-60 w-full object-cover rounded-xl shadow"
                  src={`${serverURL}/upload/${item}`}
                  alt="Preview"
                />
              ))}
            </div>

          </div>
        </div>
      )}

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  )
}

export default ViewBooks
