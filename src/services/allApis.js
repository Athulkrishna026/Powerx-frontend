import commonApi from "./commonApi"
import { serverURL } from "./serverURL"

// register
export const registerApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/register`,reqBody)

}

// login
export const loginApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/login`,reqBody)

}

// google login
export const googleLoginApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/google-login`,reqBody)

}

export const homeBooksApi= async()=>{

   return await commonApi("get",`${serverURL}/home-books`)

}



// ..............users....................

// addbook
export const addBookApi= async(reqBody,reqHeader)=>{

   return await commonApi("post",`${serverURL}/add-book`,reqBody,reqHeader)

}
// add tool booking
export const addToolBookApi= async(reqBody,reqHeader)=>{

   return await commonApi("post",`${serverURL}/add-booking`,reqBody,reqHeader)

}


export const allBooksApi= async(searchKey,reqHeader)=>{

   return await commonApi("get",`${serverURL}/all-books?search=${searchKey}`,'',reqHeader)

}

export const viewBookApi= async(id)=>{

   return await commonApi("get",`${serverURL}/view-book/${id}`)

}

export const userProfileUpdateApi= async(reqBody,reqHeader)=>{

   return await commonApi("put",`${serverURL}/user-profile-update`,reqBody,reqHeader)

}

// get current user profile
export const getUserProfileAPI = async (reqHeader) => {
   return await commonApi("get", `${serverURL}/user-profile`, "", reqHeader)
}

// submit feedback (user)
export const submitFeedbackAPI = async (reqBody, reqHeader) => {
   return await commonApi("post", `${serverURL}/feedback`, reqBody, reqHeader)
}

// admin: get all feedbacks
export const getAllFeedbacksAdminAPI = async (reqHeader) => {
   return await commonApi("get", `${serverURL}/admin-feedbacks`, "", reqHeader)
}

// admin: resolve feedback
export const resolveFeedbackAPI = async (id, reqHeader) => {
   return await commonApi("put", `${serverURL}/admin-feedbacks/${id}/resolve`, "", reqHeader)
}

// user rental
export const getMyRentalsAPI = (reqHeader) => {
  return commonApi(
    "GET",
    `${serverURL}/my-rentals`,
    "",
    reqHeader
  );
};




//..........admin.........

export const allBooksAdminApi= async(reqHeader)=>{

   return await commonApi("get",`${serverURL}/admin-all-books`,'',reqHeader)

}

export const approveBooksApi= async(reqBody,reqHeader)=>{

   return await commonApi("put",`${serverURL}/approve-books`,reqBody,reqHeader)

}

export const getAllUsersApi= async(reqHeader)=>{

   return await commonApi("get",`${serverURL}/all-users`,'',reqHeader)

}

// update admin
export const adminProfileUpdateApi= async(reqBody,reqHeader)=>{

   return await commonApi("put",`${serverURL}/admin-profile-update`,reqBody,reqHeader)

}

// get all brought books by user
export const getAllUserBooksAPI = async(reqHeader)=>{

   return await commonApi("get",`${serverURL}/user-add-books`,"",reqHeader)

}
// get user all brought book
export const getAllUserBroughtBooksAPI = async(reqHeader)=>{

   return await commonApi("get",`${serverURL}/user-brought-books`,"",reqHeader)

}
// make payment api
export const makepaymentAPI = async(reqBody,reqHeader)=>{

   return await commonApi("put",`${serverURL}/make-payment`,reqBody,reqHeader)

}



// delete a tool by admin
export const deleteAUserBookAPI = async(id)=>{

   return await commonApi("Delete",`${serverURL}/delete-user-book/${id}`)

}

// delete a user by admin
export const deleteAUserAPI = async(id)=>{

   return await commonApi("Delete",`${serverURL}/delete-user/${id}`)

}



// book count
export const getToolCountAPI = async () => {
  return await commonApi("GET", `${serverURL}/tools-count`)
}

// book count
export const getUserCountAPI = async () => {
  return await commonApi("GET", `${serverURL}/users-count`)
}

// ADMIN – get all rental bookings
export const getAllAdminBookingsAPI = (reqHeader) => {
  return commonApi(
      "GET",
      `${serverURL}/admin-all-bookings`,
      "",
      reqHeader
  );
};

export const markBookingReturnedAPI = async (bookingId, reqHeader) => {
  return await commonApi(
    "PUT",
    `${serverURL}/admin/bookings/${bookingId}/return`,
    {},
    reqHeader
  );
};

// USER STRIPE PAYMENT
export const createUserStripeSessionAPI = async (bookingId, reqHeader) => {
  return await commonApi(
    "POST",
    `${serverURL}/user/bookings/${bookingId}/pay`,
    {},
    reqHeader
  );
};

export const markUserPaymentDoneAPI = async (bookingId, reqHeader) => {
  return await commonApi(
    "PUT",
    `${serverURL}/user/bookings/${bookingId}/payment-success`,
    {},
    reqHeader
  );
};

// get rentals count
export const getRentalsCountAPI = async (reqHeader) => {
  return await commonApi("GET", `${serverURL}/rentals-count`, "", reqHeader);
};

export const addFeedbackAPI = async (reqBody, reqHeader) => {
  return await commonApi(
    "POST",
    `${serverURL}/add-feed`,
    reqBody,
    reqHeader
  );
};

export const getAllFeedbacksAPI = async (reqHeader) => {
  return await commonApi(
    "GET",
    `${serverURL}/all-feed`,
    "",
    reqHeader
  );
};

// ADMIN – delete feedback
export const deleteFeedbackAdminAPI = async (id, reqHeader) => {
  return await commonApi(
    "DELETE",
    `${serverURL}/feedback/${id}`,
    "",
    reqHeader
  );
};









