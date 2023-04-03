import React from 'react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Loading from './Loading'

const AdminRoute = () => {
    // state
    const [ok, setOk] = useState(false);

    // context
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const adminCheck = async () => {
            try {
                // console.log("[Admin Router] useEffect",auth?.token)
                const {data} = await axios.get(`/auth/admin-check`)
                if(data?.ok) {
                    setOk(true);
                }
                else {
                    setOk(false);
                }
            } catch (error) {
                toast.error("UnAuthorized Access!")
            }
        }
        adminCheck();
    },[auth?.token])

    return ok? <Outlet/> : <Loading path=''/>
}

export default AdminRoute