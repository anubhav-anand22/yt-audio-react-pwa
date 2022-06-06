import {createContext, useState} from 'react';

const Context = createContext();

export const Provider = ({children}) => {
    const [isDrawrOpen, setIsDrawrOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({token: ""});
    const [alertInfo, setAlert] = useState({});
    const [loaderInfo, setLoaderInfo] = useState({show: false, message: ''});

    const setAlertInfo = (obj) => {
        setAlert({
            ...obj,
            id: Math.random().toString()
        })
    }

    const value = {
        isDrawrOpen,
        userInfo,
        alertInfo,
        setIsDrawrOpen,
        setUserInfo,
        setAlertInfo,
        loaderInfo,
        setLoaderInfo,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default Context;