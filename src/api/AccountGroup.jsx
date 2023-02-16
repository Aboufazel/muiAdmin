import axios from "axios";


const AccountGroup = axios.create({
        baseURL: "http://siavashma.ir"
    }
)
AccountGroup.interceptors.response.use()

export const GetAllAccountGroup = () => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup.get('/AccountGroupService/api/AccountGroups/getall', {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}

export const GetById = (id) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup.get(`/AccountGroupService/api/AccountGroups/getById?accountGroupId=${id}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        },
    })
}

export const AddAccountGroup = (groupCode, groupName) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup({
        method: 'post',
        url: '/AccountGroupService/api/AccountGroups/add',
        data: {
            "AccountGroupCode": +groupCode,
            "AccountGroupName": `${groupName}`,
            "lang": "fa",
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        },
    })
}

export const DeleteAccountGroup = (groupId) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup.delete(`/AccountGroupService/api/AccountGroups/remove?AccountGroupId=${groupId}`, {
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`
        }
    })
}


export const EditAccountGroup = (id,groupCode, groupName,active) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup({
        method: 'PUT',
        url: '/AccountGroupService/api/AccountGroups/edit',
        data: {
            "AccountGroupId": +id,
            "AccountGroupCode": +groupCode,
            "AccountGroupName": `${groupName}`,
            "isActive": JSON.parse(active),
            "lang": "fa",
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        },
    })
}

export const EditIsActive = (groupId, isActive) => {
    const data = localStorage.getItem("auth")
    const final = JSON.parse(data);
    return AccountGroup({
        method: 'PUT',
        url: '/AccountGroupService/api/AccountGroups/EditIsActive',
        params: {
            "AccountGroupId": groupId,
            "IsActive": isActive
        },
        headers: {
            "selfuserid": `${final.userId}`,
            "token": `${final.accessToken}`,
            'Content-Type': 'application/json'
        }
    })
}

export default AccountGroup;