import React from 'react';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import './homePage.css';
import { MdOutlineSearch } from 'react-icons/md';
import { resolveQuery } from '../../Helpers/resolveHelpers';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [url, setUrl] = React.useState('');
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const {v, list} = resolveQuery(url);
        if(v){
            navigate(`/v/${v}`)
        } else if (list) {
            navigate(`/list/${list}`)
        } else {
            // give a warning
        }
    }

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
                <button className="homepage-search-btn" type='submit'>
                    <MdOutlineSearch className="homepage-search-icon" />
                </button>
            </form>
        </div>
    );
};

export default HomePage;
