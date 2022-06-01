import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import PlayerPageItem from '../../Components/PlayerPageItem/PlayerPageItem';
import { loadPlaylist, onChangeSelect, loadVideoInfo } from './PlayerPageFn.js';
import './PlayerPage.css';
import Player from '../../Components/Player/Player';

const PlayerPage = ({ type }) => {
    const params = useParams();

    const [listType, setListType] = useState(type);
    const [currentVideoInfo, setCurrentVideoInfo] = useState({});
    const [que, setQue] = useState([]);
    const [listItems, setListItems] = useState([]);

    React.useEffect(() => {
        const id = params.id;
        if (id.length === 11) {
            loadVideoInfo(id, setCurrentVideoInfo, true, setQue);
        } else if (id.length === 34) {
            loadPlaylist(id, setQue, setCurrentVideoInfo, setListItems);
        }
    }, [params]);

    console.log(currentVideoInfo);

    return (
        <div className="player-page">
            <HeaderComp />
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
