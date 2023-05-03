import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/auth"

const SideMenu = () => {
    const [auth, setAuth] = useAuth()
    return (
        <div className="bg-light" style={{minHeight: '100vh'}}>
        {auth?.user?.role === 'Admin'?
        <ul className="list-group h-100">
            <li>
                <NavLink className='list-group-item list-group-item-secondary list-group-item-action' to='/drives'>Drives</NavLink>
            </li>
            <li>  
                <NavLink className='list-group-item list-group-item-secondary list-group-item-action' to='/admin/create-drive'>Create Drive</NavLink>
            </li>
            <li>  
                <NavLink className='list-group-item list-group-item-secondary list-group-item-action' to='/admin/register-student'>Register New Student</NavLink>
            </li>
        </ul>
        :
        <ul className="list-group h-100">
            <li>
                <NavLink className='list-group-item list-group-item-secondary list-group-item-action' to='/drives'>Drives</NavLink>
            </li>
            <li>  
                <NavLink className='list-group-item list-group-item-secondary list-group-item-action' to='/user-drives'>My Drives</NavLink>
            </li>
        </ul>
        }
        </div>
    )
}

export default SideMenu