import React, { createContext } from 'react';

export const AuthDataContext = createContext();

const AuthContext = ({children}) => {
  const serverURL = import.meta.env.VITE_SERVER_URL
    const value = {
      serverURL
    }
  return (
    <AuthDataContext.Provider value={value}>
        {children}
    </AuthDataContext.Provider>
  )
}

export default AuthContext;