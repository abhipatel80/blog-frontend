import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { registerAsync } from '../../store/userSlice';
import { change } from '../../utils/change';

const Register = () => {

    const [input, setinput] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [img, setimg] = useState();

    const dispatch = useDispatch();
    const { error } = useSelector(state => state.user);

    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("email", input.email)
    formData.append("password", input.password)
    formData.append("userImg", img);

    const submit = (e) => {
        e.preventDefault();
        dispatch(registerAsync(formData));
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
            <div className='grid justify-items-center items-center h-[77vh] m-10 mt-20'>
                <form onSubmit={submit} className='shadow-lg md:w-[24rem] w-[20rem] px-10 rounded-md py-7 bg-white'>
                    <p className='text-red-600'>{typeof error === "string" ? error : ""}</p>
                    <div className='inputs'>
                        <label htmlFor='Name' className='text-sm md:text-base'>Name</label>
                        <input type="text" className='input' onChange={(e) => change(e, setinput)} placeholder='Name' name="name" id="name" />
                    </div>
                    <div className='inputs'>
                        <label htmlFor='Email' className='text-sm md:text-base'>Email</label>
                        <input type="email" className='input' onChange={(e) => change(e, setinput)} placeholder='Email' name="email" id="email" />
                    </div>
                    <div className='inputs'>
                        <label htmlFor='Password' className='text-sm md:text-base'>Password</label>
                        <input type="password" className='input' onChange={(e) => change(e, setinput)} placeholder='password' name="password" id="password" />
                    </div>
                    <div className='inputs'>
                        <label htmlFor='Profile img' className='text-sm md:text-base'>Profile Image</label>
                        <input type="file" className='input' onChange={(e) => setimg(e.target.files[0])} name="image" id="image" />
                    </div>
                    <p className='text-sm md:text-base'>Already have an account ? &nbsp;
                        <span className='text-purple-700 tracking-wide font-semibold'>
                            <NavLink to="/user/login">Login</NavLink>
                        </span>
                    </p>
                    <button type="submit" className='bg-purple-600 hover:bg-purple-700 text-white px-5 py-1.5 rounded-md cursor-pointer mt-4'>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register
