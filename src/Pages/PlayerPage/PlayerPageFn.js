import { baseURL } from '../../CONST';

export const loadPlaylist = async (
    id,
    setQue,
    setCurrentVideoInfo,
    setListItems
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

        loadVideoInfo(list.items[0].id, setCurrentVideoInfo, setQue);
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
    setQue
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
                thumbnails: res.videoDetails.thumbnails
            }
        }

        setCurrentVideoInfo(m);
        console.log(res);

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
