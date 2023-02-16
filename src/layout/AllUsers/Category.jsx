import {Breadcrumb, Col, Container,Row} from "react-bootstrap";

import '../main.style.css'
import '../../components/CustomTable/table.style.css'
import {GiveIdContext} from "../../Context/GiveId"
import FilterBox from "../../components/FilterBox/FilterBox";

import {useCallback, useContext, useEffect, useState} from "react";
import {deleteUser, GetAllFromUser, GetById} from "../../api/Services";
import ActionTableButton from "../../components/ActionTableButton/ActionTableButton";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Loader from "../../Loader/Loader";



const Category = () => {
    const [id, setId] = useState({});
    const {state , dispatch} = useContext(GiveIdContext)
    const [token, setToken] = useState({});
    const [data, setData] = useState(undefined)


    const [call, setCall] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const manageGetdata = useCallback(() => {
        const data =  localStorage.getItem("auth");
        const final = JSON.parse(data);
        setId(final.userId)
        setToken(final.accessToken)
    }, [id])

    const manageUserTable = useCallback(async () => {
        const apiData = await GetAllFromUser(id, token).catch(() => setError(true));
        if (apiData.data.isSuccess === false) {
            setLoading(true)
            setCall(true)
        } else {
            setData(apiData.data.users)
            console.log(data);
            setCall(false);
            setLoading(false)
        }
    }, [call])


    const manageEditUser = async (userid) => {
        setLoading(true)
        const user = await GetById(userid);
        if (user.data.rows === 0) {
            alert("پاسخی از سمت سرور دریافت نشد")
            setLoading(false)
        } else if (user.data.rows !== 0) {
            dispatch({type: 'UserData' , payload:user})
            setLoading(false)
            navigate("/editUser")
        }
    }


    const manageDelete = async (userid) => {
        const item = await deleteUser(userid , token);
        if(item === undefined){
            alert("حذف با مشکل مواجه شد")
        }else {
            alert("عملیات با موفقیت انجام شد")
        }
    }


    useEffect(() => {
        manageGetdata();
    }, [id])

    useEffect(() => {
        manageUserTable()
    }, [call])


    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item href={'/'} className={'beard_crumb'}>
                            {'داشبورد'}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {'کاربران'}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className={'main_block'}>
                <Col>
                    <Row>
                        <Col>
                            <p>
                                {'کاربران'}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <FilterBox/>
                    </Row>
                    <Row>
                        <Col dir={'rtl'}>
                            {
                                loading === true ?
                                    <Row className={'d-flex w-100 justify-content-center mt-5'}>
                                        <Col className={"col-12 d-flex justify-content-center"}>
                                            <Loader/>
                                        </Col>
                                    </Row> :
                                    <Row>
                                        <Col className={"d-flex p-5 w-100 col-12"}>
                                            <Row className={"overflow-scroll d-flex w-100"}>
                                                <table className={"table_block"}>
                                                    <thead>
                                                    <tr>
                                                        <td className={"p-2"}>
                                                            {"نام کاربری"}
                                                        </td>
                                                        <td className={"p-2"}>
                                                            {"شماره موبایل"}
                                                        </td>
                                                        <td className={"p-2"}>
                                                            {"ایمیل"}
                                                        </td>
                                                        <td className={"p-2"}>
                                                            {"وضعیت کاربر"}
                                                        </td>
                                                        <td className={"p-2"}>
                                                            {"نوع کاربر"}
                                                        </td>
                                                        <td className={"p-2"}>
                                                            {"عملیات"}
                                                        </td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        data.map(item => (
                                                            <tr key={item.userId}>
                                                                <td className={"p-2"}>{item.userName}</td>
                                                                <td className={"p-2"}>{item.mobile}</td>
                                                                <td className={"p-2"}>{item.email}</td>
                                                                <td className={"p-2"}>{item.kind === 1 ? "مدیر" : "کاربر عادی"}</td>
                                                                <td className={"p-2"}>{item.status === 1 ? "فعال" : "غیر فعال"}</td>
                                                                <td className={"d-flex justify-content-center gap-2 p-2"}>
                                                                    <ActionTableButton color={"--text-color-white"}
                                                                                       bgColor={"--color-warning"}
                                                                                       tooltip={"ویرایش"}
                                                                                       icon={faEdit}
                                                                                       onClick={() => manageEditUser(item.userId)}/>
                                                                    <ActionTableButton color={"--text-color-white"}
                                                                                       bgColor={"--color-danger"}
                                                                                       tooltip={"حذف کاربر"}
                                                                                       icon={faTrash}
                                                                                       onClick={() => manageDelete(item.userTypeId)}/>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </table>
                                            </Row>
                                        </Col>
                                    </Row>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}


export default Category;

