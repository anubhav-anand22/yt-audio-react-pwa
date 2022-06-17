import { baseURL } from "../../CONST";

const getBackPath = (t) => {
    try {
        const path = atob(t);

        if (path.match(/http|:\/\/|:/g)) return '/';

        return path
    } catch {
        return '/';
    }
};

export const onSubmitHandler = async (
    e,
    setAlertInfo,
    password,
    name,
    navigate,
    setUserInfo,
    params,
    setLoaderInfo,
    type
) => {
    try {
        e.preventDefault();

        if(!name || !password) return setAlertInfo({message: "Name and password are required!", type: "normal"});

        setLoaderInfo({show: true})
        const url = `${baseURL}/api/user/${type === 'login' ? "log-in" : "sign-up"}`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name,
                password
            })
        }).then(e => e.ok ? e.json() : {error: "Something went wrong!"}).catch(e => {
            throw new Error(e);
        })

        setLoaderInfo({show: false})

        if (res.error) {
            setAlertInfo({ message: res.error, type: 'warning' });
            return;
        }

        setUserInfo(res);
        localStorage.setItem('USER_INFO', JSON.stringify(res));

        navigate(getBackPath(params.r));
    } catch (e) {
        setAlertInfo({ message: "Something went wrong!", type: 'warning' });
        setLoaderInfo({show: false})
    }
};