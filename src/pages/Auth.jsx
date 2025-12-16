import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { googleLoginApi, loginApi, registerApi } from '../services/allApis'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const Auth = ({ register }) => {

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const nav = useNavigate()

  console.log(userDetails);


  const handleRegister = async () => {
    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info("please fill form completely...")
    } else {

      const reg = await registerApi(userDetails)

      if (reg.status === 200) {
        console.log("success", reg.data);
        toast.success("Registration successful")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        nav('/login')

      } else if (reg.status == 400) {
        toast.warning(reg.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        nav('/login')
      }
      else {
        toast.error("Something went wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })

      }

    }
  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info("pplese fill the form")

    }
    else {

      const result = await loginApi({ email, password })
      console.log(result);

      if (result.status == 200) {
        toast.success("Login sucessfull...")
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)


        setTimeout(() => {
          if (result.data.existingUser.email == "bookadmin@gmail.com") {
            nav('/admin-home')
          }
          else {
            nav('/')
          }
        }, 2000)

      }

    }
  }

  const handleGoogleLogin = async (credentialResponse) => {

    const details = jwtDecode(credentialResponse.credential)
    console.log(details);
    const result = await googleLoginApi({ username: details.name, email: details.email, password: "Googlepass123", photo: details.picture })
    console.log(result);

    if (result.status == 200) {

      toast.success('Login sucessfull.')
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)


      setTimeout(() => {
        if (result.data.existingUser.email == "bookadmin@gmail.com") {
          nav('/admin-home')
        }
        else {
          nav('/')
        }
      }, 2000)

    }



  }



  return (
    <div id='loginpage'>

      <div className=' md:grid md:grid-cols-3'>
        <div></div>
        <div >
          <h1 className=' mt-10 text-4xl text-white text-center'>BOOKSTORE</h1>
          <div id='cardlogin' className=' shadow-black shadow-2xl flex justify-center items-center flex-col rounded-lg px-10 py-10 my-5'>
            <div style={{ width: "70px", height: "70px", borderRadius: "70px" }} className=' flex justify-center items-center border bg-black'>
              <FontAwesomeIcon icon={faUser} className=' text-white text-3xl' />
            </div>

            {!register ? <h1 className=' text-white mt-6 text-3xl'>LOGIN</h1>
              :
              <h1 className=' text-white mt-6 text-3xl'>REGISTER</h1>}

            {register && <div className=' mt-3 mb-4 w-full'>
              <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='User Name' className=' p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>}

            <div className=' mt-3 mb-4 w-full'>
              <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder=' Email Id' className=' p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>

            <div className=' mt-3 mb-4 w-full'>
              <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="password" placeholder='Password' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>


            <div className=' mb-5 w-full flex justify-between'>

              <p className=' text-amber-400'>Never share your password with others</p>

              {!register && <p className=' text-white'>Forgot Password</p>}

            </div>

            {!register ? <div className=' mb-5 w-full'>
              <button onClick={handleLogin} className=' bg-green-600 w-full text-white rounded p-2 text-xl'>Login</button>
            </div>
              :
              <div className=' mb-5 w-full'>
                <button onClick={handleRegister} className=' bg-green-600 w-full text-white rounded p-2 text-xl'>Register</button>
              </div>}

            <p className=' mb-5 text-white'> OR </p>

            {!register && <div className=' mb-5 w-full flex justify-center'>
              {/* <button className=' bg-white text-black w-full rounded p-2 text-xl'>Sign In With Google</button> */}

              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;

            </div>}

            {!register ? <p className=' text-center text-white'>Are you a new User? <Link to={'/register'}>Register</Link></p>
              :
              <p className=' text-center text-white'>Are you an existing User? <Link to={'/login'}>Login</Link></p>}

          </div>
        </div>
        <div></div>

      </div>
      <ToastContainer theme='colored' position='top-center' autoClose='2000' />

    </div>
  )
}

export default Auth