import axios from "axios";
import AccountGroup from "./AccountGroup";

const AccountSpec = axios.create({
        baseURL: "http://siavashma.ir"
    }
)
AccountSpec.interceptors.response.use()


export const GetAllAccountSpec = () => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountSpec.get('/AccountSpecService/api/AccountSpecs/getall', {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}

export const AddAccountSpec = (specCode , specName,MainId) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);

    return AccountSpec({
        method: "post",
        url: "/AccountSpecService/api/AccountSpecs/add",
        data: {
            "AccountSpecCode": +specCode,
            "AccountSpecName": `${specName}`,
            "AccountMainId":MainId,
            "lang": "fa",
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        },
    })
}

export const AccountSpecGetById = (id) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup.get(`/AccountSpecService/api/AccountSpecs/GetAllAccountSpecCode?AccountPersonCode=${id}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}

export const AccountSpecGetByMainId = (id) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup.get(`/AccountSpecService/api/AccountSpecs/GetAccountSpecByMainId/${id}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}

export const EditAccountSpec = (id, MainId,specCode, specName) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup({
        method: 'PUT',
        url: '/AccountSpecService/api/AccountSpecs/edit',
        data: {
            "AccountSpecId": +id,
            "AccountMainId": MainId,
            "AccountSpecCode": +specCode,
            "AccountSpecName": `${specName}`,
            "lang": "fa",
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        },
    })
}

export const SpecEditIsActive = (mainId, isActive) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup({
        method: 'PUT',
        url: '/AccountSpecService/api/AccountSpecs/EditIsActive',
        params: {
            "AccountSpecId": mainId,
            "IsActive": isActive
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        }
    })
}


export default AccountSpec;