import axios from "axios";




const AccountType = axios.create({
        baseURL: "http://siavashma.ir"
    }
)
AccountType.interceptors.response.use();



export const GetAllAccountType = ()=>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountType.get("/AccountTypeService/api/AccountTypes/getall" , {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}


export const AddAccountType = (typeName) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);

    return AccountType({
        method: "post",
        url: "/AccountTypeService/api/AccountTypes/add",
        data: {
            "accountTypeName": `${typeName}`,
            "lang": "fa",
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        },
    })
}

export const AccountTypeGetById = (id) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountType.get(`/AccountTypeService/api/AccountTypes/GetAccountType?AccountTypeId=${id}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}

export const EditAccountType = (id, TypeId , isActive) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountType({
        method: 'PUT',
        url: '/AccountTypeService/api/AccountTypes/edit',
        data: {
            "accountTypeId": +id,
            "accountTypeName": TypeId,
            "isActive": isActive,
            "lang": "fa",
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        },
    })
}

export const AccountTypeEditIsActive = (mainId, isActive) =>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountType({
        method: 'PUT',
        url: '/AccountTypeService/api/AccountTypes/EditIsActive',
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


export const DeleteAccountType = (typeId) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountType.delete(`/AccountTypeService/api/AccountTypes/remove?AccountTypeId=${typeId}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        }
    })
}

export default AccountType;