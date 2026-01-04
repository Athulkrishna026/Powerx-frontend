import React, { useContext, useEffect, useState } from "react";
import { faSquarePlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { addBookApi } from "../../services/allApis";
import { userProfileUpdateContext } from "../../context/ContextShare";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState({
    title: "",
    imgUrl: "",
    price: "",
    abstract: "",
    category: "",
    uploadImg: [],
  });

  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);
  const [token, setToken] = useState("");

  const { userProfileStatus } = useContext(userProfileUpdateContext);

  /* ================= IMAGE UPLOAD ================= */
  const handleUpload = (e) => {
    if (previewList.length >= 3) {
      toast.error("Only 3 images allowed");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    setBookDetails({
      ...bookDetails,
      uploadImg: [...bookDetails.uploadImg, file],
    });

    const url = URL.createObjectURL(file);
    setPreview(url);
    setPreviewList([...previewList, url]);
  };

  /* ================= RESET ================= */
  const handleReset = () => {
    setBookDetails({
      title: "",
      imgUrl: "",
      price: "",
      abstract: "",
      category: "",
      uploadImg: [],
    });
    setPreview("");
    setPreviewList([]);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    const { title, imgUrl, price, abstract, category, uploadImg } = bookDetails;

    if (!title || !imgUrl || !price || !abstract || !category || uploadImg.length === 0) {
      toast.warning("Please fill all fields");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = new FormData();
    Object.keys(bookDetails).forEach((key) => {
      if (key === "uploadImg") {
        uploadImg.forEach((img) => reqBody.append("uploadImg", img));
      } else {
        reqBody.append(key, bookDetails[key]);
      }
    });

    const result = await addBookApi(reqBody, reqHeader);

    if (result.status === 200) {
      toast.success("Tool added successfully");
      handleReset();
    } else {
      toast.error("Something went wrong");
    }
  };

  /* ================= TOKEN ================= */
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, [userProfileStatus]);

  return (
    <div>

      {/* ADD TOOL FORM */}
      <div
        className="
          max-w-4xl mx-auto my-16
          backdrop-blur-xl bg-white/10
          border border-white/20
          rounded-3xl shadow-2xl
          p-6 md:p-10 text-white
        "
      >
        <h1 className="text-center text-3xl font-bold mb-10">
          Sell / Add Tool
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Tool Name"
              value={bookDetails.title}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, title: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={bookDetails.imgUrl}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, imgUrl: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              placeholder="Daily Rent Price"
              value={bookDetails.price}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, price: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-600"
            />

            <textarea
              rows="7"
              placeholder="Tool Description"
              value={bookDetails.abstract}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, abstract: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 resize-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Category"
              value={bookDetails.category}
              onChange={(e) =>
                setBookDetails({ ...bookDetails, category: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-blue-600"
            />

            {/* IMAGE UPLOAD */}
            <div className="flex justify-center">
              <label htmlFor="imagefile" className="cursor-pointer">
                <input
                  type="file"
                  id="imagefile"
                  hidden
                  onChange={handleUpload}
                />
                <img
                  src={
                    preview ||
                    "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1-1-580x386.jpg"
                  }
                  alt=""
                  className="h-52 rounded-xl border border-white/20"
                />
              </label>
            </div>

            {/* PREVIEW LIST */}
            {previewList.length > 0 && (
              <div className="flex justify-center gap-4">
                {previewList.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="w-16 h-16 rounded-lg border border-white/20"
                    alt=""
                  />
                ))}

                <label htmlFor="imagefile" className="cursor-pointer">
                  <input
                    type="file"
                    id="imagefile"
                    hidden
                    onChange={handleUpload}
                  />
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className="text-4xl text-blue-400 hover:text-blue-500 transition"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mt-10 gap-4">
          {/* ⬅ BACK */}
          <button
            onClick={() => navigate(-1)}
            className="
              px-6 py-2 rounded-full
              border border-gray-400 text-gray-300
              hover:bg-gray-600 hover:text-white
              transition flex items-center gap-2
            "
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="
                px-6 py-2 rounded-full
                border border-red-400 text-red-400
                hover:bg-red-600 hover:text-white
                transition
              "
            >
              Reset
            </button>

            <button
              onClick={handleSubmit}
              className="
                px-6 py-2 rounded-full
                bg-green-600 hover:bg-green-700
                transition
              "
            >
              Add Tool
            </button>
          </div>
        </div>
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>
  );
};

export default Profile;
