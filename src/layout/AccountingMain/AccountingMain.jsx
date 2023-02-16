import {Alert, Breadcrumb, Button, Col, Container, Modal, Row} from "react-bootstrap";
import FilterBox from "../../components/FilterBox/FilterBox";
import {
    AccountMainGetById,
    AddAccountMain,
    EditAccountMain,
    GetAllAccountMain,
    MainEditIsActive
} from "../../api/AccountMain";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ActionTableButton from "../../components/ActionTableButton/ActionTableButton";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import "./accountMain.style.css"
import {GiveIdContext} from "../../Context/GiveId";
import Loader from "../../Loader/Loader";
import {ReturnTotalAccountContext} from "../../Context/ReturnTotalAccount";


const AccountingMain = () => {
    const [account, setAccount] = useState(undefined);
    const {state, dispatch} = useContext(GiveIdContext);
    const {ReturnState, Dispatch} = useContext(ReturnTotalAccountContext);
    const [error, setError] = useState(false);
    const [value, setValue] = useState({code: "", name: ""});
    const [edit, setEdit] = useState({id: "", code: "", name: "", active: ""});
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [successShow, setSuccessShow] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false)
    const [activeShow, setActiveShow] = useState(false);
    const [waiting, setWaiting] = useState(false);


    const navigate = useNavigate();
    const Id = useContext(GiveIdContext);


    const handleClose = () => {
        setShow(false);
        emptyInput()
    };

    const handleShow = () => setShow(true);

    const manageChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    }


    const AccountMainGetTabel = async () => {
        const data = await GetAllAccountMain().catch(() => setError(true));
        console.log(data.data.accountMains)
        if (data.data.isSuccess === false) {
            localStorage.clear();
            alert("نیاز به ورود مجدد دارید");
            navigate('/login')
        }
        setAccount(data.data.accountMains);
        Dispatch({type: 'AccountData', payload: data.data.accountMains});
    };


    useEffect(() => {
        AccountMainGetTabel();
        manageGroupCode();
    }, [reload]);


    const emptyInput = () => {
        setValue({code: "", name: ""});
    }

    const manageAccountTotal = (id) => {
        dispatch({type: 'UserData', payload: id});
        navigate("/accountTotal");
    }

    const manageAddAccount = async () => {
        setWaiting(true);
        const addResponse = await AddAccountMain(value.code, value.name, Id.authData);
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

    const manageEditAccount = async (id) => {
        setEditShow(true);
        setLoading(true);
        const getResponse = await AccountMainGetById(id);
        getResponse.data.accountMains.map(item => setEdit({
            id: item.accountMainId,
            code: item.accountMainCode, name: item.accountMainName, active: item.isActive
        }))
        if (getResponse.status === 200) {
            setLoading(false);
        } else {
            setEditShow(false);
        }
    }

    const handleEditClose = () => {
        setEditShow(false);
        emptyInput()
    };

    const manageEditChange = (e) => {
        setEdit({...edit, [e.target.name]: e.target.value});
    }

    const manageSendEditAccount = async () => {
        setWaiting(true);
        const sendEditResponse = await EditAccountMain(edit.id, Id.authData, edit.code, edit.name);
        if (sendEditResponse.data.isSuccess === true) {
            setSuccessShow(true);
            setWaiting(false);
            setEditShow(false);
            setReload(!reload)
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


    const manageActive = async (id, active) => {
        setWaiting(true);
        const activeResponse = await MainEditIsActive(id, active)
            .catch(() => {
                setMessage(activeResponse.data.message);
                setErrorShow(true);
                setWaiting(false);
                setTimeout(() => {
                    setErrorShow(false)
                }, 2500)
            })
        setReload(!reload);
        setWaiting(false);
    }

    const manageGroupCode = () => {
        if (Id.authData === undefined) {
            navigate("/accountingGroup");
        }
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
                        <Breadcrumb.Item className={'beard_crumb'}>
                            <Link to={'/accountingGroup'}>
                                {'گروه حساب'}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {'حساب کل'}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className={'main_block'}>
                <Col>
                    <Row>
                        <Col>
                            <p>
                                {'حساب کل'}
                            </p>
                            {
                                waiting === true ?
                                    <div style={{left: 45}} className={'position-absolute'}>
                                        <Loader/>
                                    </div> : <div></div>
                            }
                        </Col>
                    </Row>
                    <Row className={"d-flex my-3 mb-5"}>
                        <Col>
                            <>
                                <Button className={'btn_style'} onClick={handleShow}>
                                    {"افزودن حساب کل به حساب گروه"}
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className={'modal_title'}>
                                            {"افزودن حساب کل"}
                                        </Modal.Title>
                                        {
                                            waiting === true ?
                                                    <Loader/>
                                                : <div></div>
                                        }
                                    </Modal.Header>
                                    <Modal.Body class={'d-flex flex-column justify-content-start p-3'}>
                                        <Row className={"my-3"}>
                                            <Col className={"d-flex align-items-center col-12"}>
                                                <label style={{fontFamily: 'iran-sans'}}
                                                       className={"me-2"}>{"کد حساب کل:"}</label>
                                                <input name={"code"} onChange={manageChange} value={value.code}
                                                       className={'p-2'}/>
                                            </Col>
                                        </Row>
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
                                            waiting === true ?
                                                <Loader/> : <div></div>
                                        }
                                    </Modal.Header>
                                    {loading === true ?
                                        <div className={"d-flex w-100 justify-content-center"}><Loader/></div> :
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
                                            {"کد حساب کل"}
                                        </td>
                                        <td className={"p-2"}>
                                            {"نام حساب کل"}
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
                                        //filter output is [];
                                        //this code filter the accountGroup have a accountMain;
                                        account.filter(item => item.accountGroupId === Id.authData).map(
                                            item => <tr key={item.accountMainId}>
                                                <td className={"p-2"}>{item.accountMainCode}</td>
                                                <td className={"p-2"}>{item.accountMainName}</td>
                                                <td className={"p-2"}>
                                                    <Button onClick={() => manageAccountTotal(item.accountMainId)}
                                                            variant={"warning"}>
                                                        {"مشاهده"}
                                                    </Button>
                                                </td>
                                                <td className={"p-2"}>{item.isActive === true ? <Button
                                                        variant={"success"}
                                                        value={true}
                                                        onClick={() => manageActive(item.accountMainId, !item.isActive)}>{"فعال"}</Button> :
                                                    <Button
                                                        variant={"secondary"}
                                                        value={false}
                                                        onClick={() => manageActive(item.accountMainId, !item.isActive)}>{"غیر فعال"}</Button>}</td>
                                                <td className={"d-flex justify-content-center gap-2 p-2"}>
                                                    <ActionTableButton color={"--text-color-white"}
                                                                       bgColor={"--color-warning"}
                                                                       tooltip={"ویرایش"}
                                                                       icon={faEdit}
                                                                       onClick={() => manageEditAccount(item.accountMainCode)}
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

export default AccountingMain;