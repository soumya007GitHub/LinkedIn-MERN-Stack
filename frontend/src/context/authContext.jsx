import React, { createContext } from 'react';

export const AuthDataContext = createContext();

const AuthContext = ({children}) => {
    const serverURL = import.meta.env.VITE_SERVER_URL;
  return (
    <AuthDataContext.Provider value={serverURL}>
        {children}
    </AuthDataContext.Provider>
  )
}

export default AuthContext;