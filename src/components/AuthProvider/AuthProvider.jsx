import React from "react";
import {Navigate} from "react-router-dom";
import Storage from "../../Service/Storage";


const AuthProvider = ({children}) => {
    const storage = Storage();

    if (!storage.isLogin) {
        return <Navigate to={"/login"}/>;
    }
    return (
        <>
            {children}
        </>
    )

};

export default AuthProvider;
