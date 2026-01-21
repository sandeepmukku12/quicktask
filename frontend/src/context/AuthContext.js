import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        window.location.href = "/login";
    };


    return (
        <AuthContext.Provider value={{
            user,
            loginUser,
            logoutUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};