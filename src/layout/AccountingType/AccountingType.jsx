import {useContext, useEffect, useState} from "react";
import {
    AccountTypeGetById,
    AddAccountType,
    DeleteAccountType,
    EditAccountType,
    GetAllAccountType
} from "../../api/AccountType";
import {Alert, Breadcrumb, Button, Col, Container, Modal, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../../Loader/Loader";
import FilterBox from "../../components/FilterBox/FilterBox";
import ActionTableButton from "../../components/ActionTableButton/ActionTableButton";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {GiveIdContext} from "../../Context/GiveId";


const AccountingType = () => {
    const [account, setAccount] = useState(undefined);
    const {state , dispatch} = useContext(GiveIdContext);
    const [error, setError] = useState(false);
    const [value, setValue] = useState({name: ""});
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [edit, setEdit] = useState({id: "", name: "", active: ""});
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [successShow, setSuccessShow] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [deleteModal, setDeleteModal] = useState(undefined);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const navigate = useNavigate();


    const handleClose = () => {
        setShow(false);
    };

    const handleDeleteClose = ()=>{
        setDeleteModalShow(false);
    }


    const handleShow = () => setShow(true);


    const manageChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }

    const AccountTypeGetTabel = async () => {
        const data = await GetAllAccountType().catch(() => setError(true));
        if (data.data.isSuccess === false) {
            localStorage.clear();
            alert("نیاز به ورود مجدد دارید");
            navigate('/login')
        }
        setAccount(data.data.accountTypes)
    };


    useEffect(() => {
        AccountTypeGetTabel();
    }, [reload])


    const manageAddAccount = async () => {
        setWaiting(true);
        const addResponse = await AddAccountType(value.name);
        if (addResponse.data.isSuccess === true) {
            setMessage(addResponse.data.message);
            setShow(false);
            setWaiting(false);
            setSuccessShow(true);
            emptyInput();
            setReload(!reload);
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

    const manageRemoveAccount = async (id) => {
        setWaiting(true);
        setDeleteModalShow(false);
        const removeResponse = await DeleteAccountType(id);
        console.log(removeResponse);
        if (removeResponse.data.isSuccess === false) {
            setMessage(removeResponse.data.message);
            setWaiting(false);
            setErrorShow(true);
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

    const manageSendEditAccount = async () => {
        setWaiting(true);
        const sendEditResponse = await EditAccountType(edit.id, edit.name);
        if (sendEditResponse.data.isSuccess === true) {
            setLoading(!setReload(!reload))
            setSuccessShow(true);
            setWaiting(false);
            setEditShow(false);
            setMessage(sendEditResponse.data.message);
            setTimeout(() => {
                setSuccessShow(false);
            }, 2500)
        } else {
            setMessage(sendEditResponse.data.message);
            setErrorShow(true);
            setWaiting(false);
            setTimeout(() => {
                setErrorShow(false);
            }, 2500)
        }
    }

    const manageEditChange = (e) => {
        setEdit({...edit, [e.target.name]: e.target.value});
    }

    const handleEditClose = () => {
        setEditShow(false);
        emptyInput()
    };

    const manageEditAccount = async (id) => {
        setEditShow(true);
        setLoading(true)
        const getResponse = await AccountTypeGetById(id);
        console.log(getResponse)
        setEdit({
            id: getResponse.data.accountTypeId,
            name: getResponse.data.accountTypeName,
            active: getResponse.data.isActive
        })
        if (getResponse.status === 200) {
            setLoading(false)
        } else {
            setEditShow(false)
        }
    }


    const manageSpecShowByType = (id) => {
        dispatch({type: 'UserData', payload: id});
        navigate("/accountSpecType");
    }

    const showAlert = () => {
        setMessage("قابلیت غیرفعال کردن وجودندارد");
        setErrorShow(true);
        setTimeout(() => {
            setErrorShow(false)
        }, 2000)
    }

    const manageDeleteModal = (id)=>{
        setDeleteModalShow(true);
        setDeleteModal(id);
    }

    const emptyInput = () => {
        setValue({name: ""});
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
                            {'نوع حساب'}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className={'main_block'}>
                <Col>
                    <Row className={'mb-3'}>
                        <Col lg={1}>
                            <p className={'mt-1'}>
                                {'نوع حساب'}
                            </p>
                            {
                                waiting === true ?
                                    <div style={{left: 45}} className={'position-absolute'}>
                                        <Loader/>
                                    </div> : <div></div>
                            }
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <Row className={"d-flex my-3 mb-5"}>
                        <Col>
                            <>
                                <Button className={'btn_style'} onClick={handleShow}>
                                    {"افزودن نوع حساب"}
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className={'modal_title'}>
                                            {"افزودن حساب کل"}
                                        </Modal.Title>
                                        {
                                            waiting === true ?
                                                <Loader/> : <div></div>
                                        }
                                    </Modal.Header>
                                    <Modal.Body class={'d-flex flex-column justify-content-start p-3'}>
                                        <Row className={"my-3"}>
                                            <Col className={"d-flex align-items-center col-12"}>
                                                <label style={{fontFamily: 'iran-sans'}}
                                                       className={"me-2"}>{"نام حساب کل:"}</label>
                                                <input name={"name"} onChange={manageChange} value={value.name}
                                                       className={'p-2'}/>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => manageAddAccount()} className={'save_btn'}>
                                            {"ذخیره"}
                                        </Button>
                                        <Button className={'close_btn'} onClick={handleClose}>
                                            {"بستن"}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={editShow} onHide={handleEditClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className={'modal_title'}>
                                            {"ویرایش حساب"}
                                        </Modal.Title>
                                        {
                                            waiting === true ?
                                                <Loader/> : <div></div>
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
                                                           className={"me-2"}>{"نام حساب:"}</label>
                                                    <input name={"name"} onChange={manageEditChange}
                                                           value={edit.name} className={'p-2'}/>
                                                </Col>
                                            </Row>
                                        </Modal.Body>
                                    }
                                    <Modal.Footer>
                                        <Button onClick={() => manageSendEditAccount()} className={'save_btn'}>
                                            {"ویرایش"}
                                        </Button>
                                        <Button className={'close_btn'} onClick={handleEditClose}>
                                            {"بستن"}
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal style={{fontFamily: 'iran-sans'}} show={deleteModalShow} onHide={handleClose}>
                                    <Modal.Body class={'d-flex flex-column justify-content-start p-3'}>
                                        {"آیا از حذف نوع حساب اطمینان دارید؟"}
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
                    <Row>
                        <Col className={"position-relative"}>
                            <Alert style={{position: "fixed", top: 0, left: 0}} variant={"danger"}
                                   onClose={() => setErrorShow(false)} dismissible show={errorShow}>
                                {message}
                            </Alert>
                            <Alert style={{position: "fixed", top: 0, left: 0}} variant={"success"}
                                   onClose={() => setSuccessShow(false)} dismissible show={successShow}>
                                {message}
                            </Alert>
                        </Col>
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
                                            {"نام"}
                                        </td>
                                        <td className={"p-2"}>
                                            {"حساب های معین"}
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
                                        account.map(
                                            item => <tr key={item.accountTypeId}>
                                                <td className={"p-2"}>{item.accountTypeName}</td>
                                                <td style={{width: "50%"}} className={"p-2"}>
                                                    <Button
                                                        onClick={() => manageSpecShowByType(item.accountTypeId)}
                                                        variant={"warning"}>
                                                        {"مشاهده"}
                                                    </Button>
                                                </td>
                                                <td className={"p-2"}>{item.isActive === true ? <Button
                                                    variant={"success"}
                                                    value={true}
                                                    onClick={showAlert}
                                                >{"فعال"}</Button> : <Button
                                                    variant={"secondary"}
                                                    value={false}
                                                >{"غیر فعال"}</Button>}</td>
                                                <td className={"d-flex justify-content-center gap-2 p-2"}>
                                                    <ActionTableButton color={"--text-color-white"}
                                                                       bgColor={"--color-warning"}
                                                                       tooltip={"ویرایش"}
                                                                       icon={faEdit}
                                                                       onClick={() => manageEditAccount(item.accountTypeId)}
                                                    />

                                                    <ActionTableButton color={"--text-color-white"}
                                                                       bgColor={"--color-danger"}
                                                                       tooltip={"حذف حساب"}
                                                                       icon={faTrash}
                                                                       onClick={() => manageDeleteModal(item.accountTypeId)}
                                                    />
                                                </td>
                                            </tr>
                                        )
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


export default AccountingType;