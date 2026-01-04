import React, { useState, useEffect, useContext } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  adminProfileUpdateApi,
  getAllFeedbacksAPI,
  deleteFeedbackAdminAPI
} from '../../services/allApis'
import { serverURL } from '../../services/serverURL'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { adminProfileUpdateContext } from '../../context/ContextShare'

const AdminSettings = () => {

  const { setAdminProfileStatus } = useContext(adminProfileUpdateContext)

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: ""
  })

  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [existImg, setExistImg] = useState("")
  const [updateStatus, setUpdateStatus] = useState({})
  const [feedbacks, setFeedbacks] = useState([])
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false)

  /* ======================
      PROFILE IMAGE
  ====================== */
  const handleAddFile = (e) => {
    const file = e.target.files[0]
    setAdminDetails({ ...adminDetails, profile: file })
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleReset = () => {
    if (sessionStorage.getItem('token')) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({
        username: user.username,
        password: user.password,
        cPassword: user.password
      })
      setExistImg(user.profile)
    }
    setPreview("")
  }

  /* ======================
      UPDATE PROFILE
  ====================== */
  const handleUpdate = async () => {
    const { username, password, cPassword } = adminDetails

    if (!username || !password || !cPassword) {
      toast.warning("Please fill all fields")
      return
    }

    if (password !== cPassword) {
      toast.error("Passwords do not match")
      return
    }

    const reqHeader = { Authorization: `Bearer ${token}` }
    let result

    if (preview) {
      const reqBody = new FormData()
      for (let key in adminDetails) reqBody.append(key, adminDetails[key])
      result = await adminProfileUpdateApi(reqBody, reqHeader)
    } else {
      result = await adminProfileUpdateApi(
        { username, password, profile: existImg },
        reqHeader
      )
    }

    if (result.status === 200) {
      toast.success("Profile Updated Successfully")
      sessionStorage.setItem("existingUser", JSON.stringify(result.data))
      setUpdateStatus(result.data)
      setAdminProfileStatus(result.data)
    } else {
      toast.error("Something went wrong")
    }
  }

  /* ======================
      GET FEEDBACKS
  ====================== */
  const getFeedbacks = async () => {
    setLoadingFeedbacks(true)
    const token = sessionStorage.getItem("token")
    const reqHeader = { Authorization: `Bearer ${token}` }

    const result = await getAllFeedbacksAPI(reqHeader)
    setLoadingFeedbacks(false)

    if (result.status === 200) {
      setFeedbacks(result.data)
    } else {
      toast.error("Failed to fetch feedbacks")
    }
  }

  /* ======================
      DELETE FEEDBACK
  ====================== */
  const handleDeleteFeedback = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?")
    if (!confirmDelete) return

    const token = sessionStorage.getItem("token")
    const reqHeader = { Authorization: `Bearer ${token}` }

    const result = await deleteFeedbackAdminAPI(id, reqHeader)

    if (result.status === 200) {
      toast.success("Feedback deleted successfully")
      getFeedbacks()
    } else {
      toast.error("Failed to delete feedback")
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const t = sessionStorage.getItem('token')
      setToken(t)
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setAdminDetails({
        username: user.username,
        password: user.password,
        cPassword: user.password
      })
      setExistImg(user.profile)
      getFeedbacks()
    }
  }, [updateStatus])

  return (
    <>
      <AdminHeader />

      <div className="grid md:grid-cols-[260px_1fr] min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
        <AdminSidebar />

        <div className="p-10 pb-20">

          <h1 className="text-3xl font-bold mb-10">Admin Setting</h1>

          {/* ================= PROFILE ================= */}
          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-gray-300">
              Manage your admin profile settings here.
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">

              <div className="flex flex-col items-center gap-4 mb-6">
                <img
                  className="w-32 h-32 rounded-full border-2 border-cyan-400"
                  src={
                    preview
                      ? preview
                      : existImg
                        ? `${serverURL}/uploads/${existImg}`
                        : "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"
                  }
                  alt="admin"
                />

                <label htmlFor="file" className="cursor-pointer">
                  <FontAwesomeIcon icon={faPencil} />
                </label>

                <input type="file" id="file" hidden onChange={handleAddFile} />
              </div>

              <div className="flex flex-col gap-4">
                <input
                  value={adminDetails.username}
                  onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })}
                  className="p-3 bg-black/40 rounded"
                  placeholder="Username"
                />
                <input
                  type="password"
                  value={adminDetails.password}
                  onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                  className="p-3 bg-black/40 rounded"
                  placeholder="Password"
                />
                <input
                  type="password"
                  value={adminDetails.cPassword}
                  onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })}
                  className="p-3 bg-black/40 rounded"
                  placeholder="Confirm Password"
                />

                <div className="flex gap-4">
                  <button onClick={handleReset} className="w-full bg-red-500/30 p-3 rounded">Reset</button>
                  <button onClick={handleUpdate} className="w-full bg-green-500/30 p-3 rounded">Update</button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FEEDBACK ================= */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">User Feedbacks</h2>

            {loadingFeedbacks ? (
              <p>Loading...</p>
            ) : feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div key={feedback._id} className="bg-white/10 border border-white/20 rounded-xl p-6 mb-4">

                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {feedback.username || feedback.userId?.username}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteFeedback(feedback._id)}
                      className="bg-red-500/30 px-3 py-1 rounded text-red-400"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="mt-3">{feedback.message}</p>

                  <p className="text-yellow-400 mt-2">
                    {"⭐".repeat(feedback.rating)} ({feedback.rating}/5)
                  </p>
                </div>
              ))
            ) : (
              <p>No feedbacks available</p>
            )}
          </div>

        </div>
      </div>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  )
}

export default AdminSettings
