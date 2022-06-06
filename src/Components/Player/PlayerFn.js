import { baseURL } from '../../CONST';
import { loadVideoInfo } from '../../Pages/PlayerPage/PlayerPageFn';

export const next = (que, setCurrentVideoInfo, setQue, info) => {
    let index = -1;
    for (let i in que) {
        if (que[i].id === info.id) {
            index = parseInt(i);
            break;
        }
    }
    if (index === -1 || index + 1 === que.length) {
        loadVideoInfo(que[0].id, setCurrentVideoInfo, false, setQue);
    } else {
        loadVideoInfo(
            que[index + 1].id,
            setCurrentVideoInfo,
            false,
            setQue
        );
    }
};

export const previous = (que, setCurrentVideoInfo, setQue, info) => {
    let index = -1;
    for (let i in que) {
        if (que[i].id === info.id) {
            index = parseInt(i);
            break;
        }
    }
    if (index === -1) {
        loadVideoInfo(que[0].id, setCurrentVideoInfo, false, setQue);
    } else if (index === 0) {
        loadVideoInfo(
            que[que.length - 1].id,
            setCurrentVideoInfo,
            false,
            setQue
        );
    } else {
        loadVideoInfo(
            que[index - 1].id,
            setCurrentVideoInfo,
            false,
            setQue
        );
    }
};

export const setPlayBackRateHandler = (
    setAlertInfo,
    by,
    playBackRate,
    setPlayBackRate
) => {
    let v = playBackRate + by;
    if (v >= 1000) {
        v = 1000;
    } else if (v <= 0) v = 0;
    setPlayBackRate(v);
    setAlertInfo({ message: `Playback rate ${v / 100}`, type: 'normal' });
};

export const setVolumeHandler = (setAlertInfo, by, volume, setVolume) => {
    let v = volume + by;
    if (v >= 100) {
        v = 100;
    } else if (v <= 0) v = 0;
    setVolume(v);
    setAlertInfo({ message: `Volume ${v}%`, type: 'normal' });
};

export const setIsLikedHandler = async (
    e,
    id,
    userInfo,
    setUserInfo,
    setAlertInfo,
    setIsLiked,
    setLoaderInfo
) => {
    try {
        if (!userInfo?.token || id.length !== 11) return;
        setIsLiked(e);

        let liked = userInfo.liked;

        if (liked.video.includes(id)) {
            liked.video = liked.video.filter((e) => e !== id);
        } else {
            liked.video = [id, ...liked.video];
        }

        setLoaderInfo({show: true})

        const url = `${baseURL}/api/user/update-user`;

        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({ liked }),
        })
            .then((e) =>
                e.ok ? e.json() : { error: 'Something went wrong!' }
            )
            .catch((e) => {
                throw new Error(e);
            });

        setLoaderInfo({show: false})

        if (res.error) {
            setAlertInfo({ message: res.error, type: 'warning' });
            setIsLiked(!e);
            return;
        }

        setUserInfo(res);
        localStorage.setItem('USER_INFO', JSON.stringify(res));
    } catch (e) {
        setIsLiked(!e);
        setAlertInfo({ message: 'Something went wrong!', type: 'warning' });
        console.log(e);
        setLoaderInfo({show: false})
    }
};