import React, { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ user, children }) => {
    const [currentUser, setCurrentUser] = useState(user);

    return (
      <AuthContext.Provider value={{ currentUser, setCurrentUser}}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)