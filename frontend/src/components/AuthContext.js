import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Check if authentication data is stored in localStorage
        const storedToken = localStorage.getItem("authToken");
        const storedUserProfile = localStorage.getItem("userProfile");

        if (storedToken && storedUserProfile) {
            setAuthToken(storedToken);
            setUserProfile(JSON.parse(storedUserProfile));
        }
    }, []);

    const setAuthData = (token, profile) => {
        setAuthToken(token);
        setUserProfile(profile);

        // Store authentication data in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userProfile", JSON.stringify(profile));
    };

    const clearAuthData = () => {
        setAuthToken(null);
        setUserProfile(null);

        // Clear authentication data from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userProfile");
    };

    return (
        <AuthContext.Provider
            value={{ authToken, userProfile, setAuthData, clearAuthData }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
