import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const Loading = ({path ='login'}) => {
    // state
    const [count, setCount] = useState(3);
    // hooks
    const navigate = useNavigate();
    const location = useLocation();

    // console.log("[Loading]",location)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => --prevCount)
        },1000);
        // redirect once count is equal to 0
        if(count === 0){
            navigate(`/${path}`,{state: location.pathname})
        }
        return () => clearInterval(interval)
    },[count]);

    return <div className="d-flex justify-content-center align-items-center vh-100">
        <div className='text-center'>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
        </div>;
}

export default Loading