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

export const allBooksApi= async(searchKey,reqHeader)=>{

   return await commonApi("get",`${serverURL}/all-books?search=${searchKey}`,'',reqHeader)

}

export const viewBookApi= async(id)=>{

   return await commonApi("get",`${serverURL}/view-book/${id}`)

}

export const userProfileUpdateApi= async(reqBody,reqHeader)=>{

   return await commonApi("put",`${serverURL}/user-profile-update`,reqBody,reqHeader)

}



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



// delete a user book
export const deleteAUserBookAPI = async(id)=>{

   return await commonApi("Delete",`${serverURL}/delete-user-book/${id}`)

}




