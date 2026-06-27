import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthDataContext } from './authContext';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const { serverURL } = useContext(AuthDataContext);
    useEffect(() => {
        const getUserDetails = async () => {
            console.log("User context ran");
            try {
                const response = await axios.get(
                    `${serverURL}/api/user/currentUser`,
                    { withCredentials: true }
                );
                setUser(response.data);
            } catch (err) {
                setUser(null);
                console.log(err.response.data.message);
            }
        }
        getUserDetails();
    }, [serverURL]);
    const value = {
        user,
        setUser
    }
    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext