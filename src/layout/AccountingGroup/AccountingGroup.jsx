import {Alert, Breadcrumb, Button, Col, Container, Modal, Row} from "react-bootstrap";
import FilterBox from "../../components/FilterBox/FilterBox";
import {
    AddAccountGroup,
    DeleteAccountGroup,
    EditAccountGroup,
    EditIsActive,
    GetAllAccountGroup, GetById
} from "../../api/AccountGroup";
import '../../components/CustomTable/table.style.css'
import {useContext, useEffect, useState} from "react";
import ActionTableButton from "../../components/ActionTableButton/ActionTableButton";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import "../../components/CustomModal/modal.style.css"
import {GiveIdContext} from "../../Context/GiveId";
import Loader from "../../Loader/Loader";


const AccountingGroup = () => {
    const {state, dispatch} = useContext(GiveIdContext)
    const [account, setAccount] = useState(undefined);
    const [error, setError] = useState(false);
    const [value, setValue] = useState({code: "", name: ""});
    const [edit, setEdit] = useState({id: "", code: "", name: "", active: ""});
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [successShow, setSuccessShow] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [deleteModal, setDeleteModal] = useState(undefined);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const navigate = useNavigate();


    const handleClose = () => {
        setShow(false);
        emptyInput()
    };

    const handleDeleteClose = ()=>{
        setDeleteModalShow(false);
    }

    const handleEditClose = () => {
        setEditShow(false);
        emptyInput()
    };
    const handleShow = () => setShow(true);

    const manageChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }

    const manageEditChange = (e) => {
        setEdit({...edit, [e.target.name]: e.target.value});
    }

    const AccountGroupGetTabel = async () => {
        const data = await GetAllAccountGroup().catch(() => setError(true));
        console.log(data.data.accountGroups)
        if (data.data.isSuccess === false) {
            localStorage.clear();
            alert("نیاز به ورود مجدد دارید");
            navigate('/login')
        }
        setAccount(data.data.accountGroups)
    };

    useEffect(() => {
        AccountGroupGetTabel();
    }, [reload]);


    const manageAddAccount = async () => {
        setWaiting(true)
        const addResponse = await AddAccountGroup(value.code, value.name);
        if (addResponse.data.isSuccess === true) {
            setMessage(addResponse.data.message);
            setShow(false);
            setWaiting(false);
            setSuccessShow(true);
            setReload(!reload);
            emptyInput();
            setTimeout(() => {
                setSuccessShow(false)
            }, 2500)
        } else {
            setMessage(addResponse.data.message);
            setShow(false);
            setWaiting(false);
            setErrorShow(true);
            setTimeout(() => {
                setErrorShow(false)
            }, 2500)
        }

    }


    const manageAccountMain = (id) => {
        dispatch({type: 'UserData', payload: id});
        navigate("/accountingMain");
    }


    const manageEditAccount = async (id) => {
        setEditShow(true);
        setLoading(true)
        const getResponse = await GetById(id);
        getResponse.data.accountGroups.map(item => setEdit({
            id: item.accountGroupId,
            code: item.accountGroupCode, name: item.accountGroupName, active: item.isActive
        }))
        if (getResponse.status === 200) {
            setLoading(false)
        } else {
            setEditShow(false)
        }
    }

    const manageSendEditAccount = async () => {
        setWaiting(true)
        const sendEditResponse = await EditAccountGroup(edit.id, edit.code, edit.name, edit.active);
        if (sendEditResponse.data.isSuccess === true) {
            setLoading(!setReload(!reload));
            setWaiting(false)
            setSuccessShow(true);
            setEditShow(false);
            setMessage(sendEditResponse.data.message);
            setTimeout(() => {
                setSuccessShow(false);
            }, 2500)
        } else {
            setMessage(sendEditResponse.data.message);
            setErrorShow(true);
            setTimeout(() => {
                setErrorShow(false);
            }, 2500)
        }
    }


    const manageRemoveAccount = async (id) => {
        setWaiting(true);
        setDeleteModalShow(false);
        const removeResponse = await DeleteAccountGroup(id);
        if (removeResponse.data.isSuccess === false) {
            setMessage(removeResponse.data.message);
            setErrorShow(true);
            setWaiting(false);
            setTimeout(() => {
                setErrorShow(false);
                setMessage("");
            }, 1000)
        } else if (removeResponse.data.isSuccess === true) {
            setMessage(removeResponse.data.message);
            setWaiting(false);
            setSuccessShow(true);
            setReload(!reload);
            setTimeout(() => {
                setSuccessShow(false);
                setMessage("");
            }, 1000)
        }
    }

    const manageActive = async (id, active) => {
        setWaiting(true);
        const activeResponse = await EditIsActive(id, active)
            .catch(() => {
                setMessage(activeResponse.data.message);
                setErrorShow(true);
                setTimeout(() => {
                    setErrorShow(false)
                }, 2500)
            });
        setWaiting(false);
        setReload(!reload);
    }

    const emptyInput = () => {
        setValue({code: "", name: ""});
    };

    const manageDeleteModal = (id)=>{
        setDeleteModalShow(true);
        setDeleteModal(id);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item className={'beard_crumb'}>
                            <Link to={'/'}>
                                {'داشبورد'}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {'گروه حساب'}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className={'main_block'}>
                <Col>
                    <Row>
                        <Col>
                            <p>
                                {'گروه حساب'}
                            </p>
                            {
                                waiting === true ?
                                    <div style={{left:45}} className={'position-absolute'}>
                                        <Loader/>
                                    </div> : <div></div>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"position-relative"}>
                            <Alert style={{position: "fixed", top: 0, left: 0, fontFamily: 'iran-sans'}}
                                   variant={"danger"}
                                   dismissible show={errorShow}>
                                {message}
                            </Alert>
                            <Alert style={{position: "fixed", top: 0, left: 0, fontFamily: 'iran-sans'}}
                                   variant={"success"}
                                   dismissible show={successShow}>
                                {message}
                            </Alert>
                        </Col>
                    </Row>
                    <Row className={"d-flex my-3 mb-5"}>
                        <Col>
                            <>
                                <Button className={'btn_style'} onClick={handleShow}>
                                    {"افزودن گروه حساب"}
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className={'modal_title'}>
                                            {"افزودن حساب"}
                                        </Modal.Title>
                                        {
                                            waiting === true ? <Loader/> : <div></div>
                                        }
                                    </Modal.Header>
                                    <Modal.Body class={'d-flex flex-column justify-content-start p-3'}>
                                        <Row className={"my-3"}>
                                            <Col className={"d-flex align-items-center col-12"}>
                                                <label style={{fontFamily: 'iran-sans'}}
                                                       className={"me-2"}>{"کد گروه:"}</label>
                                                <input name={"code"} onChange={manageChange} value={value.code}
                                                       className={'p-2'}/>
                                            </Col>
                                        </Row>
                                        <Row className={"my-3"}>
                                            <Col className={"d-flex align-items-center col-12"}>
                                                <label style={{fontFamily: 'iran-sans'}}
                                                       className={"me-2"}>{"نام گروه:"}</label>
                                                <input name={"name"} onChange={manageChange} value={value.name}
                                                       className={'p-2'}/>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className={'close_btn'} onClick={handleClose}>
                                            {"بستن"}
                                        </Button>
                                        <Button onClick={() => manageAddAccount()} className={'save_btn'}>
                                            {"ایجاد گروه"}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={editShow} onHide={handleEditClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className={'modal_title'}>
                                            {"ویرایش حساب"}
                                        </Modal.Title>
                                        {
                                            waiting === true ? <Loader/> : <div></div>
                                        }
                                    </Modal.Header>
                                    {loading === true ?
                                        <div className={"d-flex w-100 justify-content-center"}><Loader/>
                                        </div> :
                                        <Modal.Body
                                            class={'d-flex flex-column justify-content-start p-3'}>
                                            <Row className={"my-3"}>
                                                <Col className={"d-flex align-items-center col-12"}>
                                                    <label style={{fontFamily: 'iran-sans'}}
                                                           className={"me-2"}>{"کد گروه:"}</label>
                                                    <input name={"code"} onChange={manageEditChange}
                                                           value={edit.code} className={'p-2'}/>
                                                </Col>
                                            </Row>
                                            <Row className={"my-3"}>
                                                <Col className={"d-flex align-items-center col-12"}>
                                                    <label style={{fontFamily: 'iran-sans'}}
                                                           className={"me-2"}>{"نام گروه:"}</label>
                                                    <input name={"name"} onChange={manageEditChange}
                                                           value={edit.name} className={'p-2'}/>
                                                </Col>
                                            </Row>
                                        </Modal.Body>
                                    }
                                    <Modal.Footer>
                                        <Button className={'close_btn'} onClick={handleEditClose}>
                                            {"بستن"}
                                        </Button>
                                        <Button onClick={() => manageSendEditAccount()} className={'save_btn'}>
                                            {"ویرایش گروه"}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal style={{fontFamily: 'iran-sans'}} show={deleteModalShow} onHide={handleClose}>
                                    <Modal.Body class={'d-flex flex-column justify-content-start p-3'}>
                                        {"آیا از حذف حساب اطمینان دارید؟"}
                                        <Row className={"d-flex flex-row justify-content-center"}>
                                            <Col className={"d-flex flex-row-reverse gap-3 mt-3 flex-row justify-content-center col-12"}>
                                                <Button className={'save_btn'} onClick={handleDeleteClose}>
                                                    {"انصراف"}
                                                </Button>
                                                <Button className={'close_btn'} onClick={() => manageRemoveAccount(deleteModal)}>
                                                    {"حذف"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                </Modal>
                            </>
                        </Col>
                    </Row>
                    <Row>
                        <FilterBox/>
                    </Row>
                </Col>
                <Row>
                    <Col className={"d-flex p-5 w-100 col-12"}>
                        <Row className={"overflow-scroll d-flex w-100"}>
                            {account === undefined ?
                                <div className={"d-flex w-100 justify-content-center"}><Loader/></div> :
                                <table className={"table_block"}>
                                    <thead>
                                    <tr>
                                        <td className={"p-2"}>
                                            {"کد گروه حساب"}
                                        </td>
                                        <td className={"p-2"}>
                                            {"نام گروه حساب"}
                                        </td>
                                        <td className={"p-2"}>
                                            {"حساب های کل"}
                                        </td>
                                        <td className={"p-2"}>
                                            {"وضعیت حساب"}
                                        </td>
                                        <td className={"p-2"}>
                                            {"عملیات"}
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        account.map(item => (
                                            <tr key={item.accountGroupId}>
                                                <td className={"p-2"}>{item.accountGroupCode}</td>
                                                <td className={"p-2"}>{item.accountGroupName}</td>
                                                <td className={"p-2"}><Button
                                                    onClick={() => manageAccountMain(item.accountGroupId)}
                                                    variant={"warning"}>{"مشاهده"}</Button>
                                                </td>
                                                <td className={"p-2"}>{item.isActive === true ? <Button
                                                    onClick={() => manageActive(item.accountGroupId, !item.isActive)}
                                                    variant={"success"} value={true}>{"فعال"}</Button> : <Button
                                                    onClick={() => manageActive(item.accountGroupId, !item.isActive)}
                                                    variant={"secondary"} value={false}>{"غیر فعال"}</Button>}</td>
                                                <td className={"d-flex justify-content-center gap-2 p-2"}>
                                                    <ActionTableButton color={"--text-color-white"}
                                                                       bgColor={"--color-warning"}
                                                                       tooltip={"ویرایش"}
                                                                       icon={faEdit}
                                                                       onClick={() => manageEditAccount(item.accountGroupId)}/>

                                                    <ActionTableButton color={"--text-color-white"}
                                                                       bgColor={"--color-danger"}
                                                                       tooltip={"حذف کاربر"}
                                                                       icon={faTrash}
                                                                       onClick={() => manageDeleteModal(item.accountGroupId)}/>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            }
                        </Row>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default AccountingGroup;