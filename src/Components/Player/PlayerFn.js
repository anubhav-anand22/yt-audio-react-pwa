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