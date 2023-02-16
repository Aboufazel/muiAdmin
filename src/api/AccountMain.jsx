import axios from "axios";


const AccountMain = axios.create({
        baseURL: "http://siavashma.ir"
    }
)
AccountMain.interceptors.response.use();



export const AddAccountMain = (mainCode , mainName , GroupId)=>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
     return AccountMain({
         method:"post",
         url:"/AccountMainService/api/AccountMains/add",
         data: {
             "AccountGroupId":GroupId,
             "AccountMainCode": +mainCode,
             "AccountMainName": `${mainName}`,
             "lang": "fa",
         },
         headers: {
             "selfuserid": `${final.userId}`,
             "token": `${final.accessToken}`,
             'Content-Type': 'application/json'
         },
     })
}


export const GetAllAccountMain = ()=>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountMain.get("/AccountMainService/api/AccountMains/getall" , {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}


export const AccountMainGetById = (id) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountMain.get(`/AccountMainService/api/AccountMains/GetAccountMainCode?AccountMainCode=${id}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}


export const GetAccountMainByGroupId = (id)=>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountMain.get(`/AccountMainService/api/AccountMains/GetAccountMainByGroupId/${id}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}


export const EditAccountMain = (id, GroupId,mainCode, mainName) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountMain({
        method: 'PUT',
        url: '/AccountMainService/api/AccountMains/edit',
        data: {
            "AccountMainId": +id,
            "AccountGroupId": GroupId,
            "AccountMainCode": +mainCode,
            "AccountMainName": `${mainName}`,
            "lang": "fa",
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        },
    })
}


export const MainEditIsActive = (mainId, isActive) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountMain({
        method: 'PUT',
        url: '/AccountMainService/api/AccountMains/EditIsActive',
        params: {
            "AccountMainId": mainId,
            "IsActive": isActive
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        }
    })
}


export default AccountMain;