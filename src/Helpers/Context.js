import {createContext, useState} from 'react';

const Context = createContext();

export const Provider = ({children}) => {
    const [isDrawrOpen, setIsDrawrOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({token: ""})

    const value = {
        isDrawrOpen,
        userInfo,
        setIsDrawrOpen,
        setUserInfo
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Context;