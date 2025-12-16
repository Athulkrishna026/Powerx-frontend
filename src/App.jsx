
import Header from "./users/components/Header"
import Footer from "./components/Footer"
import Home from "./users/pages/Home"
import Auth from "./pages/Auth"
import Pagenotfound from "./pages/Pagenotfound"
import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import Preloader from "./components/Preloader"
import Careers from "./users/pages/Careers"
import Contact from "./users/pages/Contact"
import AllBooks from "./users/pages/AllBooks"
import Profile from "./users/pages/Profile"
import AdminHome from "./admin/pages/AdminHome"
import { AdminBooks } from "./admin/pages/AdminBooks"
import AdminSettings from "./admin/pages/AdminSettings"
import ViewBooks from "./users/pages/ViewBooks"
import PaymentSuccess from "./users/pages/PaymentSuccess"
import PaymentError from "./users/pages/PaymentError"


function App() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={loading ? <Home /> : <Preloader />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />
        {/* <Route path="/careers" element={<Careers/>} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/view-book/:id" element={<ViewBooks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-error" element={<PaymentError />} />

        <Route path="/admin-home" element={loading ? <AdminHome /> : <Preloader />} />
        <Route path="/admin-books" element={<AdminBooks />} />
        <Route path="/admin-settings" element={<AdminSettings />} />

      </Routes>
    </>
  )
}

export default App
