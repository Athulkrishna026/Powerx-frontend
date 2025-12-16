import React, { createContext, useContext, useState } from 'react'


export const searchKeyContext = createContext()
export const adminProfileUpdateContext = createContext()
export const userProfileUpdateContext = createContext()



const ContextShare = ({ children }) => {

    const [searchKey, setSearchKey] = useState('')
    const [adminProfileStatus, setAdminProfileStatus] = useState('')
        const [userProfileStatus, setUserProfileStatus] = useState('')



    return (
        <userProfileUpdateContext.Provider value={{ userProfileStatus, setUserProfileStatus }}>
        <adminProfileUpdateContext.Provider value={{ adminProfileStatus, setAdminProfileStatus }}>
            <searchKeyContext.Provider value={{ setSearchKey, searchKey }}>
                {
                    children        //here it will be the app component so that every componet can access this data
                }
            </searchKeyContext.Provider>
        </adminProfileUpdateContext.Provider>
        </userProfileUpdateContext.Provider>
    )
}

export default ContextShare