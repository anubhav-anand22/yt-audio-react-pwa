import React from 'react';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';
import './fourOFour.css';
import { useNavigate } from 'react-router-dom';

const FourOFour = () => {
    const [timeoutCount, setTimeoutCount] = React.useState(5);

    const navigate = useNavigate();

    React.useEffect(() => {
        const id = setInterval(() => {
            setTimeoutCount(pre => {
                if(pre <= 0){
                    clearInterval(id);
                    setTimeout(() => {
                        navigate('/')
                    }, 100);
                    return pre;
                } else {
                    return pre - 1
                }
            })
        }, 1000);
    }, [navigate])
    return (
        <div className="four-o-four">
            <HeaderComp />
            <h2 className='four-o-four-message'><span>404</span>Not Found</h2>
            <h3>Redirecting in {timeoutCount} {timeoutCount < 2 ? 'second' : 'seconds'}</h3>
        </div>
    )
}

export default FourOFour;