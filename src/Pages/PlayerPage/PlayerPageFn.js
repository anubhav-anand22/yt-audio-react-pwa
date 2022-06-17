import { baseURL } from '../../CONST';

export const loadPlaylist = async (
    id,
    setQue,
    setCurrentVideoInfo,
    setListItems,
) => {
    try {
        const list = await fetch(`${baseURL}/api/video-from-list/${id}`)
            .then((e) => {
                if (!e.ok) return e;
                return e.json();
            })
            .catch((e) => {
                console.log(e);
            });

        loadVideoInfo(list.items[0].id, setCurrentVideoInfo, false, setQue);
        setQue(list.items);
        setListItems(list.items);
    } catch (e) {
        console.log(e);
    }
};

export const loadVideoInfo = async (
    id,
    setCurrentVideoInfo,
    shouldSetQue = false,
    setQue,
) => {
    try {
        const res = await fetch(`${baseURL}/api/video-info/${id}`)
            .then((e) => {
                if (!e.ok) return e;
                return e.json();
            })
            .catch((e) => {
                console.log(e);
            });


        const m = {
            related_videos: res.related_videos,
            videoDetails: {
                id: res.videoDetails.videoId,
                authorId: res.videoDetails.channelId,
                authorName: res.videoDetails.ownerChannelName,
                title: res.videoDetails.title,
                thumbnails: res.videoDetails.thumbnails,
                description: res.videoDetails.description
            }
        }

        setCurrentVideoInfo(m);

        if (shouldSetQue) {
            setQue(res.related_videos);
        }
    } catch (e) {
        console.log(e);
    }
};

export const onChangeSelect = ({
    value,
    setListType,
    setQue,
    currentVideoInfo,
    listItems,
}) => {
    setListType(value);
    if (value === 'v') {
        setQue(currentVideoInfo.related_videos);
    } else if (value === 'list') {
        setQue(listItems);
    }
};

export const setisLikedPlaylistHanlder = async (
    e,
    id,
    userInfo,
    setUserInfo,
    setAlertInfo,
    setIsLikedPlaylist,
    setLoaderInfo
) => {
    try {
        if (!userInfo?.token || id.length !== 34) return;
        setIsLikedPlaylist(e);

        let liked = userInfo.liked;

        if (liked.playlist.includes(id)) {
            liked.playlist = liked.playlist.filter((e) => e !== id);
        } else {
            liked.playlist = [id, ...liked.playlist];
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
            setIsLikedPlaylist(!e);
            return;
        }

        setUserInfo(res);
        localStorage.setItem('USER_INFO', JSON.stringify(res));
    } catch (e) {
        setIsLikedPlaylist(!e);
        setAlertInfo({ message: 'Something went wrong!', type: 'warning' });
        console.log(e);
        setLoaderInfo({show: false})
    }
};