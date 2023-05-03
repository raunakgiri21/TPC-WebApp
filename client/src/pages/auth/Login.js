import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Input} from 'antd'
import { useAuth } from '../../context/auth'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
    // state
    const [email, setEmail] = useState('user01@gmail.com');
    const [password, setPassword] = useState('user01@123');
    // hooks
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const emailChangeHandler = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }
    const passwordChangeHandler = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(`/auth/login`,{email,password});
            if(data?.error){
                toast.error(data.error)
            }
            else{
                localStorage.setItem("auth",JSON.stringify(data));
                setAuth({...auth, token: data.token, user: data.user})
                toast.success('Login Successful!')
                navigate(location.state || `/`)
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Login Failed!')
        }
    }
    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                    <form onSubmit={submitHandler}>
                        <Input type='email' className='mb-4 p-1' placeholder='Enter Your Email' value={email} onChange={(e) => emailChangeHandler(e)} autoFocus/>
                        <Input.Password minLength={8} className='mb-4 p-1' placeholder='Enter Your Password' value={password} onChange={(e) => passwordChangeHandler(e)}/>
                        <button className='btn btn-primary' type='submit'>Login</button>
                    </form>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login