import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    /*useEffect(() => {
        console.log('Updated User:', user);
    }, [user]);*/

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
