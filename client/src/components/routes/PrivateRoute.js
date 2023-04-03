import React from 'react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Loading from './Loading'

const PrivateRoute = () => {
    // state
    const [ok, setOk] = useState(false);

    // context
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const {data} = await axios.get(`/auth/auth-check`)
                if(data?.ok) {
                    setOk(true);
                }
                else {
                    setOk(false);
                }
                // console.log("[Private Router] useEffect",auth?.token)
            } catch (error) {
                toast.error("Login to Access!")
            }
        }
        authCheck();
    },[auth?.token])

    return ok? <Outlet/> : <Loading/>
}

export default PrivateRoute