import React, { useEffect, useState } from 'react';
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
import { next, previous } from './PlayerFn';

const audio = new Audio();

const Player = ({ info, que, setCurrentVideoInfo, setQue }) => {
    const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);

    useEffect(() => {
        if (!info?.id) return;
        audio.src = `${baseURL}/api/audio/${info.id}`;
        audio.onloadeddata = () => {
            setDuration(audio.duration);
            // audio.play();
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
            next(que, setCurrentVideoInfo, setQue, info)
        }
    }, [info, setQue, setCurrentVideoInfo, que])

    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);

    

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
                        <MdVolumeDown className="player-front-icons" />
                        <AiFillFastBackward className="player-front-icons" />
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
                        <AiFillFastForward className="player-front-icons" />
                        <MdVolumeUp className="player-front-icons" />
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
                        {isLiked ? (
                            <AiFillHeart
                                onClick={() => setIsLiked(false)}
                                className="player-front-icons"
                            />
                        ) : (
                            <AiOutlineHeart
                                onClick={() => setIsLiked(true)}
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
