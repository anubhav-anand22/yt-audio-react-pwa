import React, { useContext, useEffect, useState } from 'react';
import './Player.css';
import {
    MdChevronLeft,
    MdChevronRight,
    MdVolumeDown,
    MdVolumeUp,
    MdPlayArrow,
    MdPause,
} from 'react-icons/md';
import {
    AiFillHeart,
    AiOutlineHeart,
    AiFillFastForward,
    AiFillFastBackward,
} from 'react-icons/ai';
import { formatTime } from '../../Helpers/formatTime';
import { baseURL } from '../../CONST';
import {
    next,
    previous,
    setIsLikedHandler,
    setPlayBackRateHandler,
    setVolumeHandler,
} from './PlayerFn';
import Context from '../../Helpers/Context';

const audio = document.getElementById('AUDIO')

const Player = ({ info, que, setCurrentVideoInfo, setQue }) => {
    const { setAlertInfo, userInfo, setUserInfo, setLoaderInfo } =
        useContext(Context);

    const [isPlayerMinimized, setIsPlayerMinimized] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [playBackRate, setPlayBackRate] = useState(100);

    useEffect(() => {
        if(!info?.thumbnails || info.thumbnails === 0) return;
        navigator.mediaSession.metadata = new MediaMetadata({
            title: info?.title || "TITLE",
            artist: info?.authorName || "ARTIST",
            artwork: info?.thumbnails?.map(e => ({...e, src: e.url}))
        });
        window.navigator.mediaSession.setActionHandler('play', () => audio.play())
        window.navigator.mediaSession.setActionHandler('pause', () => audio.pause())
        window.navigator.mediaSession.setActionHandler('previoustrack', () => previous(que, setCurrentVideoInfo, setQue, info))
        window.navigator.mediaSession.setActionHandler('nexttrack', () => next(que, setCurrentVideoInfo, setQue, info))
        window.navigator.mediaSession.setActionHandler('seekbackward', () => {
            let e = audio.currentTime - 10
            if(e < 0) e = 0;
            audio.currentTime = e
        })
        window.navigator.mediaSession.setActionHandler('seekforward', () => {
            let e = audio.currentTime + 10
            if(e > audio.duration) e = audio.duration;
            audio.currentTime = e
        })
    }, [info, que, setCurrentVideoInfo, setQue]);

    useEffect(() => {
        if (!info?.id) return;
        if (userInfo?.liked?.video?.includes(info?.id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [userInfo, info]);

    useEffect(() => {
        if (!info?.id) return;
        audio.src = `${baseURL}/api/audio/${info.id}`;
        audio.autoplay = true;
        audio.onloadeddata = () => {
            audio.play();
            setDuration(audio.duration);
        };
    }, [info]);

    useEffect(() => {
        audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
    }, []);

    useEffect(() => {
        audio.onended = () => {
            setIsPlaying(false);
            next(que, setCurrentVideoInfo, setQue, info);
        };
    }, [info, setQue, setCurrentVideoInfo, que]);

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        audio.playbackRate = playBackRate / 100;
    }, [playBackRate]);

    return (
        <div
            className={`player ${
                isPlayerMinimized ? 'player-min' : 'player-max'
            }`}
        >
            {info?.title && (
                <div className="player-back">
                    <div className="player-back-img-cont">
                        <img
                            src={
                                info?.thumbnails[info?.thumbnails?.length - 1]
                                    ?.url
                            }
                            alt=""
                            className="player-back-img"
                        />
                    </div>
                    <div className="player-back-info-cont">
                        <p className="player-back-info-cont-title">
                            {info.title}
                        </p>
                        <a
                            className="player-back-info-cont-a-author"
                            href={`https://www.youtube.com/channel/${info.authorId}`}
                        >
                            {info.authorName}
                        </a>
                        <br />
                        <a href={`${baseURL}/api/audio/${info?.id}`} download={info?.title} title={info?.title} target="_blank"><button className='player-back-info-conft-download-btn'>Download</button></a>
                        <p className="player-back-description">
                            {info.description}
                        </p>
                    </div>
                </div>
            )}
            {info?.title && (
                <div className="player-front">
                    <div className="player-front-open-back-btn-cont">
                        <MdChevronLeft
                            className="player-front-open-back-btn"
                            onClick={() =>
                                setIsPlayerMinimized(!isPlayerMinimized)
                            }
                        />
                    </div>
                    <div className="player-front-section-one">
                        <MdVolumeDown
                            className="player-front-icons"
                            onClick={() =>
                                setVolumeHandler(
                                    setAlertInfo,
                                    -10,
                                    volume,
                                    setVolume
                                )
                            }
                        />
                        <AiFillFastBackward
                            className="player-front-icons"
                            onClick={() =>
                                setPlayBackRateHandler(
                                    setAlertInfo,
                                    -25,
                                    playBackRate,
                                    setPlayBackRate
                                )
                            }
                        />
                        <MdChevronLeft
                            className="player-front-icons"
                            onClick={() =>
                                previous(que, setCurrentVideoInfo, setQue, info)
                            }
                        />
                        {isPlaying ? (
                            <MdPause
                                className="player-front-icons"
                                onClick={() => audio.pause()}
                            />
                        ) : (
                            <MdPlayArrow
                                className="player-front-icons"
                                onClick={() => audio.play()}
                            />
                        )}
                        <MdChevronRight
                            className="player-front-icons"
                            onClick={() =>
                                next(que, setCurrentVideoInfo, setQue, info)
                            }
                        />
                        <AiFillFastForward
                            className="player-front-icons"
                            onClick={() =>
                                setPlayBackRateHandler(
                                    setAlertInfo,
                                    25,
                                    playBackRate,
                                    setPlayBackRate
                                )
                            }
                        />
                        <MdVolumeUp
                            className="player-front-icons"
                            onClick={() =>
                                setVolumeHandler(
                                    setAlertInfo,
                                    10,
                                    volume,
                                    setVolume
                                )
                            }
                        />
                    </div>
                    <p className="player-front-title">{info?.title}</p>
                    <div className="player-front-section-two">
                        <p className="player-front-current-time">
                            {formatTime(currentTime)}
                        </p>
                        <input
                            min={0}
                            max={duration}
                            value={currentTime}
                            onChange={(e) =>
                                (audio.currentTime = e.target.value || 0)
                            }
                            type="range"
                            className="player-front-range-input"
                        />
                        <p className="player-front-duration">
                            {formatTime(duration)}
                        </p>
                        {isLiked && userInfo?.token && (
                            <AiFillHeart
                                onClick={() =>
                                    setIsLikedHandler(
                                        false,
                                        info.id,
                                        userInfo,
                                        setUserInfo,
                                        setAlertInfo,
                                        setIsLiked,
                                        setLoaderInfo
                                    )
                                }
                                className="player-front-icons"
                            />
                        )}
                        {!isLiked && userInfo?.token && (
                            <AiOutlineHeart
                                onClick={() =>
                                    setIsLikedHandler(
                                        true,
                                        info.id,
                                        userInfo,
                                        setUserInfo,
                                        setAlertInfo,
                                        setIsLiked,
                                        setLoaderInfo
                                    )
                                }
                                className="player-front-icons"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Player;
