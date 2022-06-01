import React, { useState } from 'react';
import './PlayerPageItem.css';
import { MdOutlineMoreVert } from 'react-icons/md';
import {
    downloadFile,
    openInNewTab,
    removeFromQue,
} from './PlayerPageItemFn.js';
import { loadVideoInfo } from '../../Pages/PlayerPage/PlayerPageFn';

const PlayerPageItem = ({
    info,
    setQue,
    que,
    setCurrentVideoInfo,
    currentVideoInfo,
}) => {
    const [isMoreBtnFocused, setIsMoreBtnFocused] = useState(false);

    const onItemClickHanndler = async (setCurrentVideoInfo, info, setQue) => {
        await loadVideoInfo(info.id, setCurrentVideoInfo, false, setQue)
    }

    return (
        <div className="playerPageItem">
            <div
                className="player-page-item-img-cont"
                onClick={() =>
                    onItemClickHanndler(setCurrentVideoInfo, info, setQue)
                }
            >
                <img
                    className="player-page-item-img"
                    src={info?.thumbnails[info?.thumbnails?.length - 1]?.url}
                    alt={info?.title}
                />
            </div>
            <div className="player-page-item-author-more-icon-container">
                <a
                    className="player-page-item-a-author"
                    href={`https://www.youtube.com/channel/${info.authorId}`}
                >
                    {info.authorName}
                </a>
                <button
                    onFocus={() => setIsMoreBtnFocused(true)}
                    onBlur={() => setIsMoreBtnFocused(false)}
                    className="player-page-item-more-icon-btn"
                >
                    <MdOutlineMoreVert className="player-page-item-more-icon" />
                    <div
                        className={`player-page-item-more-cont ${
                            isMoreBtnFocused &&
                            'player-page-item-more-cont-show'
                        }`}
                    >
                        <span onClick={() => openInNewTab(info.id)}>
                            Open in new tab
                        </span>
                        <span
                            onClick={() => removeFromQue(info.id, que, setQue)}
                        >
                            Remove from que
                        </span>
                        <span onClick={() => downloadFile(info.id, info.title)}>
                            Download
                        </span>
                    </div>
                </button>
            </div>
            <p className="player-page-item-title">{info.title}</p>
        </div>
    );
};

export default PlayerPageItem;
