import { baseURL } from '../../CONST';

export const updateUserHandler = async ({
    setAlertInfo,
    password,
    name,
    setUserInfo,
    userInfo,
    setLoaderInfo,
}) => {
    try {
        let data = {};

        if (name !== '') {
            data['name'] = name;
        }
        if (password !== '') {
            data['password'] = password;
        }

        setLoaderInfo({ show: true });

        const url = `${baseURL}/api/user/update-user`;

        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify(data),
        })
            .then((e) => (e.ok ? e.json() : { error: 'Something went wrong!' }))
            .catch((e) => {
                throw new Error(e);
            });

        setLoaderInfo({ show: false });

        if (res.error) {
            setAlertInfo({ message: res.error, type: 'warning' });
            return;
        }

        setUserInfo(res);
        localStorage.setItem('USER_INFO', JSON.stringify(res));
    } catch (e) {
        console.log(e);
        setAlertInfo({ message: 'Something went wrong!', type: 'normal' });
        setLoaderInfo({ show: false });
    }
};

export const deleteUserHandler = async ({
    setAlertInfo,
    setUserInfo,
    userInfo,
    setLoaderInfo,
}) => {
    try {
        setLoaderInfo({ show: true });
        const url = `${baseURL}/api/user/delete-user`;

        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((e) => (e.ok ? e.json() : { error: 'Something went wrong!' }))
            .catch((e) => {
                throw new Error(e);
            });

        setLoaderInfo({ show: false });

        if (res.error) {
            setAlertInfo({ message: res.error, type: 'warning' });
            return;
        }

        setUserInfo({});
        localStorage.removeItem('USER_INFO');
    } catch (e) {
        console.log(e);
        setAlertInfo({ message: 'Something went wrong!', type: 'normal' });
        setLoaderInfo({ show: false });
    }
};
export const logoutUserHandler = async ({
    setAlertInfo,
    setUserInfo,
    setLoaderInfo,
    userInfo
}) => {
    try {
        setLoaderInfo({ show: true });
        const url = `${baseURL}/api/user/log-out`;

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        })
            .then((e) => (e.ok ? e.json() : { error: 'Something went wrong!' }))
            .catch((e) => {
                throw new Error(e);
            });
        setUserInfo({});
        localStorage.removeItem('USER_INFO');
        setLoaderInfo({ show: false });
    } catch (e) {
        console.log(e);
        setAlertInfo({ message: 'Something went wrong!', type: 'normal' });
        setLoaderInfo({ show: false });
    }
};
