import React, {Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexLayout from "../layout/IndexLayout";
import Main from "../layout/Main/Main";
import Login from "../layout/Login/Login";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import AllUser from "../layout/AllUsers/AllUser";
import AccountingGroup from "../layout/AccountingGroup/AccountingGroup";


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
                    }, {
                        path: '/accountingGroup',
                        element:
                            (<Suspense fallback={<div>Loading...</div>}>
                                <AuthProvider>
                                    <AccountingGroup/>
                                </AuthProvider>
                            </Suspense>)

                    }, {
                        path: '/accountingMain',
                        element:
                            (<Suspense fallback={<div>Loading...</div>}>
                                <AuthProvider>
                                    {/*<AccountingMain/>*/}
                                </AuthProvider>
                            </Suspense>)

                    }, {
                        path: '/accountTotal',
                        element:
                            (<Suspense fallback={<div>Loading...</div>}>
                                <AuthProvider>
                                    {/*<AccountTotal/>*/}
                                </AuthProvider>
                            </Suspense>)
                    }, {
                        path: '/accountType',
                        element:
                            (<Suspense fallback={<div>Loading...</div>}>
                                <AuthProvider>
                                    {/*<AccountingType/>*/}
                                </AuthProvider>
                            </Suspense>)
                    },{
                        path: '/accountSpecType',
                        element:
                            (<Suspense fallback={<div>Loading...</div>}>
                                <AuthProvider>
                                    {/*<AccountingSpecType/>*/}
                                </AuthProvider>
                            </Suspense>)
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