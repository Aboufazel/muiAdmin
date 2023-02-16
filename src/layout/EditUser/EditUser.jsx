import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {GiveIdContext} from "../../Context/GiveId";
import data from "bootstrap/js/src/dom/data";
import {Edit} from "../../api/Services";


const EditUser = () => {
    const navigate = useNavigate();
    const Data = useContext(GiveIdContext);
    const a = Object.entries(Data);
    const b = Object.values(a[0][1]);

    const manageReturn = ()=>{
        navigate("/allUser")
    }


    return(
        <Container>
            <Row>
                <Col className={"col-12 d-flex justify-content-end"}>
                    <Button variant={"warning"} onClick={()=>manageReturn() }>
                        {"بازگشت"}
                    </Button>
                </Col>
            </Row>
            {
                b.map(item=>(
                    <Container key={item.userId}>
                        <Row>
                            <Col className={"col-12 d-flex my-5 justify-content-center align-items-center"}>
                                <div className={"d-flex mx-3 align-items-center"}>
                                    <label className={"me-1"}>
                                        {"نام کاربری:"}
                                    </label>
                                    <input value={item.userName}/>
                                </div>
                                <div className={"d-flex mx-3  align-items-center"}>
                                    <label className={"me-1"}>
                                        {"شماره موبایل:"}
                                    </label>
                                    <input value={item.mobile}/>
                                </div>
                                <div className={"d-flex mx-3 align-items-center"}>
                                    <label className={"me-1"}>
                                        {"ایمیل:"}
                                    </label>
                                    <input value={item.email}/>
                                </div>
                            </Col>
                            <Col className={"col-12 d-flex my-5 justify-content-center align-items-center"}>
                                <div className={"d-flex mx-3  align-items-center"}>
                                    <label className={"me-1"}>
                                        {"وضعیت کاربر:"}
                                    </label>
                                    <select>
                                        <option selected={item.status === 1 ? "selected" : ""}  id={"active"}>فعال</option>
                                        <option selected={item.status === 0 ? "selected" : ""} id={"Nonactive"}>غیر فعال</option>
                                    </select>
                                </div>
                                <div className={"d-flex mx-3 align-items-center"}>
                                    <label className={"me-1"}>
                                        {"نوع کاربر:"}
                                    </label>
                                    <select>
                                        <option selected={item.kind === 0 ? "selected" : ""}  id={0}>
                                            {"عادی"}
                                        </option>
                                        <option  selected={item.kind === 1 ? "selected" : ""}   id={1}>
                                            {"مدیر"}
                                        </option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"col-12 d-flex justify-content-center"}>
                                <Button variant={"success"}>
                                    {"ذخیره تغییرات"}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                ))
            }
        </Container>
    )
}


export default EditUser;