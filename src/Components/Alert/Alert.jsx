import React from 'react';
import Context from '../../Helpers/Context';
import './Alert.css';
import { AiFillWarning } from 'react-icons/ai';

const Alert = () => {
    const { alertInfo, setAlertInfo } = React.useContext(Context);

    const [timeIndi, setTimeIndi] = React.useState(10);
    const [ids, setIds] = React.useState([])
    

    React.useEffect(() => {
        let t = 10;
        setTimeIndi(10);

        ids.forEach(e => {
            clearInterval(e);
        })
        setIds([]);

        if(!alertInfo.type || alertInfo.type === 'warning') return

        const id = setInterval(() => {
            if(t <= 0) {
                clearInterval(id)
                setAlertInfo({});
                return
            };
            t -= 1;
            setTimeIndi(t);
        }, 1000);

        setIds([...ids, id])
    }, [alertInfo])

    return (
        <div
            className={`alert ${alertInfo?.message && 'alert-show'} ${
                alertInfo.type === 'warning' && 'alert-warning'
            }`}
            onClick={() => {
                setAlertInfo({})
            }}
        >
            <div className="alert-section-one">
            <AiFillWarning className='alert-icon' />
            <p>{alertInfo.message}</p>
            </div>
            {alertInfo.type !== 'warning' && <p>{timeIndi}</p>}
        </div>
    );
};

export default Alert;
