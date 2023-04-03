import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const Menu = () => {
    // hooks
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    const logoutHandler = () => {
        setAuth({ ...auth, user: null, token: ''});
        localStorage.removeItem('auth');
        navigate('/login');
    }

    const loginRegisterHtml = !auth.user ? 
    <></>
    :
    (
        <div className='dropdown d-flex flex-row'>
            <li style={{marginLeft: '1rem'}}>
                <NavLink className='nav-link pointer dropdown-toggle' data-bs-toggle='dropdown'>
                    {auth?.user?.name}
                </NavLink>
                <ul className='dropdown-menu bg-gray'>
                    <li className="nav-item">
                        <NavLink className="nav-link pointer" to={`/${auth?.user?.role === 'Admin' ? 'admin' : 'user'}/dashboard`}>Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link pointer" to={'/login'} onClick={logoutHandler}>
                            LogOut
                        </NavLink>
                    </li>
                </ul>
            </li>
        </div>
    );

    return(
        <div>
            <ul className="nav d-flex justify-content-between align-items-center shadow-sm" style={{height: '60px',paddingRight: '5vw',paddingLeft: '5vw'}}>
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">TPC WebApp</NavLink>
                </li>
                {loginRegisterHtml}
            </ul>
        </div>
    )
}

export default Menu