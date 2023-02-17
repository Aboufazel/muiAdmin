import React, {Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexLayout from "../layout/IndexLayout";
import Main from "../layout/Main/Main";
import Login from "../layout/Login/Login";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import AllUser from "../layout/AllUsers/AllUser";


const Root = () => {
    const router = createBrowserRouter(
        [
            {
                path: "/login",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login/>
                    </Suspense>
                )
            },
            {
                path: "/",
                element: <IndexLayout/>,
                children: [
                    {
                        path: "/",
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AuthProvider>
                                    <Main/>
                                </AuthProvider>
                            </Suspense>
                        )
                    }, {
                        path: '/users',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <AuthProvider>
                                    <AllUser/>
                                </AuthProvider>
                            </Suspense>
                        )
                    },
                ]

            }
        ]
    )
    return (
        <RouterProvider router={router}/>
    )
}

export default Root;