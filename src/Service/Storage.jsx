const Storage = () => {

    return {
        setLogin: (userId, accessToken) => {
            const data = {
                userId,
                accessToken,
                isLogin: true,
            };
            localStorage.setItem("auth", JSON.stringify(data));
        },
        setLogout: () => {
            const data = {
                userId: "",
                accessToken: "",
                isLogin: false,
            };
            localStorage.setItem("auth", JSON.stringify(data));
        },
        get  userId() {
            const key = localStorage.getItem("auth");
            if (key == null) {
                return false;
            }
            const auth= JSON.parse(key);
            return auth. userId;
        },
        get accessToken() {
            const key = localStorage.getItem("auth");
            if (key == null) {
                return false;
            }
            const auth = JSON.parse(key);
            return auth.accessToken;
        },
        get isLogin() {
            const key = localStorage.getItem("auth");
            if (key == null) {
                return false;
            }
            const auth = JSON.parse(key);
            return !!auth.isLogin;
        },
        setAccessToken: (accessToken) => {
            const key = localStorage.getItem("auth");
            const auth = JSON.parse(key);
            auth.accessToken = accessToken;
            localStorage.setItem("auth", JSON.stringify(auth));
        },
    }


}


export default Storage;