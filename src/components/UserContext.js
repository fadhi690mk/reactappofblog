import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [userInfo,setUserInfo] = useState({});
    const REACT_APP_API_URL="https://mernappbackend3.onrender.com/";

    return (
        <UserContext.Provider value={{userInfo,setUserInfo,REACT_APP_API_URL}}>
            {children}
        </UserContext.Provider>
    );
}
