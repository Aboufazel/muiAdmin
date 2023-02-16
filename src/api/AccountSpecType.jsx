import axios from "axios";
import AccountMain from "./AccountMain";


const AccountSpecType = axios.create({
        baseURL: "http://siavashma.ir"
    }
)

AccountSpecType.interceptors.response.use();


export const GetAllTypeSpec =()=>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountSpecType.get("/AccountTypeService/api/AccountTypeSpecs/getall" , {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}


export const GetTypeSpecById =(id)=>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountSpecType.get(`/AccountSpecService/api/AccountSpecs/GetAccountSpecByMainId/${id}` , {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}



export const AddAccountSpecType = (TypeId, SpecId) =>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountMain({
            method:"post",
            url:"/AccountTypeService/api/AccountTypeSpecs/add",
            data: {
                "AccountTypeId":TypeId,
                "AccountSpecId": SpecId,
                "lang": "fa",
            },
            headers: {
                "selfuserid": `${final.userId}`,
                "token": `${final.accessToken}`,
                'Content-Type': 'application/json'
            },
        })
}


export const GetAccountTypeSpec = (id) =>{
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountSpecType.get(`/AccountMainService/api/AccountMains/GetAccountMainCode?AccountMainCode=${id}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}






export default AccountSpecType;