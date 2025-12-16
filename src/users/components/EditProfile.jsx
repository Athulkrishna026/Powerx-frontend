import { faXmark, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { userProfileUpdateApi } from '../../services/allApis'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { serverURL } from '../../services/serverURL'   // ✅ FIXED MISSING IMPORT
import { userProfileUpdateContext } from '../../context/ContextShare'




const EditProfile = () => {

  const { setUserProfileStatus } = useContext(userProfileUpdateContext)


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: "",
    bio: ""
  });

  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [existImg, setExistImg] = useState("");
  const [updateStatus, setUpdateStatus] = useState({});

  // Add File
  const handleAddFile = (e) => {
    const file = e.target.files[0];
    setUserDetails({ ...userDetails, profile: file });
    console.log(userDetails.profile);

    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url);
    }
  };

  // Reset Function
  const handleReset = () => {
    if (sessionStorage.getItem("token")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        username: user.username,
        password: user.password,
        cPassword: user.password,
        bio: user.bio
      });
      setExistImg(user.profile);
    }
    setPreview("");
  };

  // Update Profile
  const handleUpdate = async () => {
    const { username, password, cPassword, bio, profile } = userDetails;

    if (!username || !password || !cPassword || !bio) {
      toast.warning("Please fill the form completely");
      return;
    }

    if (password !== cPassword) {
      toast.warning("Passwords must match");
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };

    let result;

    // If new image uploaded
    if (preview) {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("password", password);
      reqBody.append("bio", bio);
      reqBody.append("profile", profile);

      result = await userProfileUpdateApi(reqBody, reqHeader);
    }

    // If image NOT changed
    else {
      const reqBody = {
        username,
        password,
        bio,
        profile: existImg
      };

      result = await userProfileUpdateApi(reqBody, reqHeader);
    }

    if (result?.status === 200) {
      toast.success("Profile Updated Successfully");
      sessionStorage.setItem("existingUser", JSON.stringify(result.data));
      setUpdateStatus(result.data);
      handleClose();
      setUserProfileStatus(result.data)
    } else {
      toast.error("Something went wrong");
      setUpdateStatus({});
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const t = sessionStorage.getItem("token");
      setToken(t);

      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        username: user.username,
        password: user.password,
        cPassword: user.password,
        bio: user.bio
      });
      setExistImg(user.profile);
    }
  }, [updateStatus]);

  return (
    <div>

      <button onClick={handleOpen} className='p-2 bg-blue-600 text-white rounded'>
        Edit Profile
      </button>

      {open && (

        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>

          <div className='bg-white md:w-1/3 w-full rounded-lg p-8'>

            {/* Close Button */}
            <div className='flex justify-end'>
              <button className='text-2xl font-bold' onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>



            {/* Profile Image */}
            {existImg == "" ?
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={
                  preview
                    ? preview
                    : "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png"
                }
                alt="profile"
              />
              : existImg.startsWith("https://lh3.googleusercontent.com") ?

              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={
                  preview
                    ? preview
                    : existImg
                }
                alt="profile"
              />:
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={
                  preview
                    ? preview
                    : `${serverURL}/uploads/${existImg}`
                }
                alt="profile"
              />

            }



            <div className="w-full flex justify-center">
              <label
                htmlFor="file"
                className="bg-yellow-500 p-2 mt-2 inline-block rounded text-white cursor-pointer"
              >
                <FontAwesomeIcon icon={faPencil} />
              </label>
            </div>


            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleAddFile}
            />


            {/* Form Inputs */}
            <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              className='border p-2 rounded w-full my-2' placeholder='Name' type="text" />

            <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              className='border p-2 rounded w-full my-2' placeholder='Password' type="text" />

            <input value={userDetails.cPassword} onChange={(e) => setUserDetails({ ...userDetails, cPassword: e.target.value })}
              className='border p-2 rounded w-full my-2' placeholder='Confirm Password' type="text" />

            <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
              className='border p-2 rounded w-full h-32 my-2' placeholder='Bio'></textarea>

            {/* Buttons */}
            <div className='flex gap-3 mt-3'>
              <button onClick={handleReset} type='button' className='w-full p-2 bg-red-600 text-white rounded'>Reset</button>
              <button onClick={handleUpdate} type='button' className='w-full p-2 bg-green-600 text-white rounded'>Update</button>
            </div>

          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default EditProfile;
