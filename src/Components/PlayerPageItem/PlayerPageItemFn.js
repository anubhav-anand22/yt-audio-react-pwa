import { baseURL } from "../../CONST";

export const removeFromQue = (id, que, setQue) => {
    const newQue = que.filter(e => e.id !== id);
    setQue(newQue)
}

export const openInNewTab = (id) => {
    window.open(`/v/${id}`, '_blank')
}

export const downloadFile = (id, title) => {
    const a = document.createElement('a');
    a.setAttribute('href', `${baseURL}/api/audio/${id}`)
    a.setAttribute('title', `${title}.mp3`)
    a.setAttribute('download', `${title}.mp3`)
    a.setAttribute('target', '_blank')
    a.click();
}