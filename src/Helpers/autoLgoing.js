import { baseURL } from "../CONST";

export const autoLogin = async ({setUserInfo}) => {
    const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));
    const currentTime = new Date().getTime();
    const oneDayInMiSec = 86400000;

    if(!userInfo?.updatedAt) return;

    if(userInfo?.updatedAt + oneDayInMiSec > currentTime){
        const res = await fetch(`${baseURL}/api/user/new-token`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(e => e.ok && e.json());

        if(!res || res.error) return;

        setUserInfo(res);
        localStorage.setItem("USER_INFO", JSON.stringify(res))

    } else {
        localStorage.removeItem("USER_INFO")
        setUserInfo({})
    }
}