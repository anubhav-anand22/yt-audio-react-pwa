import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import PlayerPageItem from '../../Components/PlayerPageItem/PlayerPageItem';
import {
    loadPlaylist,
    onChangeSelect,
    loadVideoInfo,
    setisLikedPlaylistHanlder,
} from './PlayerPageFn.js';
import './PlayerPage.css';
import Player from '../../Components/Player/Player';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Context from '../../Helpers/Context';

const PlayerPage = ({ type }) => {
    const params = useParams();

    const { userInfo, setUserInfo, setAlertInfo, setLoaderInfo } =
        useContext(Context);

    const [listType, setListType] = useState(type);
    const [currentVideoInfo, setCurrentVideoInfo] = useState({});
    const [que, setQue] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [isLikedPlaylist, setIsLikedPlaylist] = useState(false);

    React.useEffect(() => {
        const id = params.id;
        if (id.length === 11) {
            setLoaderInfo({show: true})
            loadVideoInfo(
                id,
                setCurrentVideoInfo,
                true,
                setQue,
            ).finally(e => setLoaderInfo({show: false}));
        } else if (id.length === 34) {
            setLoaderInfo({show: true})
            loadPlaylist(
                id,
                setQue,
                setCurrentVideoInfo,
                setListItems,
            ).finally(e => setLoaderInfo({show: false}));
        }
    }, []);

    React.useEffect(() => {
        if (userInfo?.liked?.playlist?.includes(params.id)) {
            setIsLikedPlaylist(true);
        } else {
            setIsLikedPlaylist(false);
        }
    }, [userInfo])

    return (
        <div className="player-page">
            <HeaderComp />
            <div className="player-page-controls-cont">
                {type === 'list' && (
                    <select
                        className="player-page-select-list-type"
                        value={listType}
                        onChange={(e) =>
                            onChangeSelect({
                                value: e.target.value,
                                currentVideoInfo,
                                listItems,
                                setListType,
                                setQue,
                            })
                        }
                    >
                        <option value="list">Playlist</option>
                        <option value="v">Related videos</option>
                    </select>
                )}
                {params?.id.length === 34 && userInfo?.token && (
                    <div className="player-page-controls-section-two">
                        {isLikedPlaylist ? (
                            <AiFillHeart
                                className="player-page-icon"
                                onClick={() =>
                                    setisLikedPlaylistHanlder(
                                        false,
                                        params.id,
                                        userInfo,
                                        setUserInfo,
                                        setAlertInfo,
                                        setIsLikedPlaylist,
                                        setLoaderInfo
                                    )
                                }
                            />
                        ) : (
                            <AiOutlineHeart
                                className="player-page-icon"
                                onClick={() =>
                                    setisLikedPlaylistHanlder(
                                        true,
                                        params.id,
                                        userInfo,
                                        setUserInfo,
                                        setAlertInfo,
                                        setIsLikedPlaylist,
                                        setLoaderInfo
                                    )
                                }
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="player-page-item-cont">
                {que.map((e) => (
                    <PlayerPageItem
                        key={e.id}
                        info={e}
                        setQue={setQue}
                        que={que}
                        setCurrentVideoInfo={setCurrentVideoInfo}
                        currentVideoInfo={currentVideoInfo}
                    />
                ))}
            </div>
            <Player
                info={currentVideoInfo?.videoDetails}
                que={que}
                setCurrentVideoInfo={setCurrentVideoInfo}
                setQue={setQue}
            />
        </div>
    );
};

export default PlayerPage;
