import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { loginAsync } from '../../store/userSlice';
import { change } from '../../utils/change';

const Login = () => {

    const [input, setinput] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { error } = useSelector(state => state.user);

    const submit = (e) => {
        e.preventDefault();
        dispatch(loginAsync(input));
        if (typeof error !== "string") {
            navigate("/")
        }
    };

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [token]);

    return (
        <>
            <div className='grid justify-center items-center w-full h-[77vh] m-10 mt-20'>
                <form onSubmit={submit} className='shadow-lg md:w-[24rem] w-[18rem] px-10 rounded-md py-7 bg-white'>
                    <p className='text-red-600'>{typeof error === "string" ? error : ""}</p>
                    <div className='inputs'>
                        <label htmlFor='Email' className='text-sm md:text-base'>Email</label>
                        <input type="email" className='input' placeholder='Email' onChange={(e) => change(e, setinput)} name="email" id="email" />
                    </div>
                    <div className='inputs'>
                        <label htmlFor='Password' className='text-sm md:text-base'>Password</label>
                        <input type="password" className='input' placeholder='password' onChange={(e) => change(e, setinput)} name="password" id="password" />
                    </div>
                    <p className='text-sm md:text-base'>don't have an account ?&nbsp;
                        <span className='text-purple-700 tracking-wide font-semibold'>
                            <NavLink to="/user/register">Register</NavLink>
                        </span>
                    </p>
                    <button type="submit" className='bg-purple-600 hover:bg-purple-700 text-white 
                    px-5 py-1.5 rounded-md cursor-pointer mt-4'>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
