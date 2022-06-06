import React from 'react';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import './homePage.css';
import { MdOutlineSearch, 
    MdChevronLeft,
    MdChevronRight, } from 'react-icons/md';
import { resolveQuery } from '../../Helpers/resolveHelpers';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../Helpers/Context';
import {baseURL} from '../../CONST'

const HomePage = () => {
    const [url, setUrl] = React.useState('');
    const navigate = useNavigate();
    const { userInfo } = React.useContext(Context);
    const videoItemCont = React.useRef(null);
    const playlistItemCont = React.useRef(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { v, list } = resolveQuery(url);
        if (v) {
            navigate(`/v/${v}`);
        } else if (list) {
            navigate(`/list/${list}`);
        } else {
            // give a warning
        }
    };

    return (
        <div className="homePage">
            <HeaderComp />
            <form className="homepage-search-form" onSubmit={onSubmitHandler}>
                <input
                    type="search"
                    className="homepage-search-input"
                    placeholder="Search video or playlist"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                />
                <button className="homepage-search-btn" type="submit">
                    <MdOutlineSearch className="homepage-search-icon" />
                </button>
            </form>
            <div className="home-page-liked-items-cont">
                {userInfo?.liked ? (
                    <div>
                        <div className="home-page-video-liked-section">
                            <p>Liked video</p>
                            {userInfo?.liked?.video.length !== 0 && <MdChevronLeft className='home-page-video-liked-section-scroll-btn-left' onClick={() => {
                                const width = window.innerWidth
                                videoItemCont.current.scrollLeft -= (width / 1.25);
                            }} />}
                            {userInfo?.liked?.video.length !== 0 && <MdChevronRight className='home-page-video-liked-section-scroll-btn-right' onClick={() => {
                                const width = window.innerWidth
                                videoItemCont.current.scrollLeft += (width / 1.25);
                            }} />}
                            {userInfo?.liked?.video.length !== 0 ? (
                                <div className="home-page-video-liked-item-cont" ref={videoItemCont}>
                                    {userInfo?.liked?.video?.map((e) => (
                                        <Item key={e} redirect={`/v/${id}`} id={e} url={`https://i.ytimg.com/vi/${e}/hqdefault.jpg`} />
                                    ))}
                                </div>
                            ) : (
                                <div className="home-page-video-liked-not-item-warning">
                                    <p>No liked video</p>
                                </div>
                            )}
                        </div>
                        <div className="home-page-video-liked-section">
                            <p>Liked playlist</p>
                            {userInfo?.liked?.playlist.length !== 0 && <MdChevronLeft className='home-page-video-liked-section-scroll-btn-left' onClick={() => {
                                const width = window.innerWidth
                                playlistItemCont.current.scrollLeft -= (width / 1.25);
                            }} />}
                            {userInfo?.liked?.playlist.length !== 0 && <MdChevronRight className='home-page-video-liked-section-scroll-btn-right' onClick={() => {
                                const width = window.innerWidth
                                playlistItemCont.current.scrollLeft += (width / 1.25);
                            }} />}
                            {userInfo?.liked?.playlist.length !== 0 ? (
                                <div className="home-page-video-liked-item-cont" ref={playlistItemCont}>
                                    {userInfo?.liked?.playlist?.map((e) => (
                                        <Item key={e} redirect={`/list/${id}`} id={e} url={`${baseURL}/api/get-img-link-from-playlist-id/${e}`} />
                                    ))}
                                </div>
                            ) : (
                                <div className="home-page-video-liked-not-item-warning">
                                    <p>No liked playlist</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="home-page-liked-items-not-loged-comp">
                        <p>Not loged in</p>
                        <button onClick={() => navigate('/login/Lw==')}>
                            Log in
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Item = ({ id, url, redirect }) => {
    return (
        <Link to={redirect}>
            <div className="home-page-liked-item">
                <img
                    src={url}
                    alt=""
                />
            </div>
        </Link>
    );
};

export default HomePage;
