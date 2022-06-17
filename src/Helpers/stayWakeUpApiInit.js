export const stayWakeUpApiInit = async () => {
    if ('wakeLock' in navigator) {
        const wakeLock = await navigator.wakeLock.request('screen');
        return wakeLock;
    } 
}