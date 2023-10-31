import React, { useEffect, useState } from 'react'
import { change } from '../../utils/change'
import { useDispatch, useSelector } from 'react-redux';
import { editUserAsync, getUserAsync } from '../../store/userSlice';
import { url } from '../../store/blogSlice';

const Profile = () => {

  const { activeUser: user } = useSelector(state => state.user);

  const [input, setinput] = useState({
    name: user?.name,
    email: user?.email,
  });

  const [img, setimg] = useState(null);
  const [disable, setdisable] = useState(true);

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const formData = new FormData();
  formData.append("name", input.name)
  formData.append("email", input.email)
  formData.append("userImg", img);

  useEffect(() => {
    dispatch(getUserAsync(userId))
    // eslint-disable-next-line
  }, [userId])

  const update = () => {
    setdisable(false);
  }

  const save = () => {
    setdisable(true);
    dispatch(editUserAsync({ userId, formData }));
  }

  return (
    <div className='mt-24'>
      <div className='content-div'>
        <div className='grid justify-items-center items-center m-10'>
          <h2 className='text-2xl mb-4'>Welcome, {user?.name}</h2>
          <div className='shadow-md md:w-[24rem] w-[20rem] px-10 rounded-md py-7 bg-white'>
            <div className='inputs'>
              {user?.image !== "/userImages/undefined" ?
                <img src={`${url}/${user?.image}`} className='rounded-lg w-[11rem] h-[7rem] m-auto' alt="userProfile" /> :
                <img src="/default-profile-img.jpg" alt="userProfile" className='rounded-full w-[8rem] h-[8rem] m-auto' />
              }
            </div>
            <div className='inputs'>
              <label htmlFor='name'>Name</label>
              <input type="text" disabled={disable} defaultValue={user?.name} className='input' placeholder='name' onChange={(e) => change(e, setinput)} name="name" id="name" />
            </div>
            <div className='inputs'>
              <label htmlFor='Email'>Email</label>
              <input type="email" disabled={disable} className='input' defaultValue={user?.email} placeholder='Email' onChange={(e) => change(e, setinput)} name="email" id="email" />
            </div>
            <div className='inputs'>
              <label htmlFor='Profile img'>Profile Image</label>
              <input type="file" className='input' disabled={disable} onChange={(e) => setimg(e.target.files[0])} name="image" id="image" />
            </div>
            {disable ?
              <button type="submit" onClick={update} className='bg-purple-600 hover:bg-purple-700 text-white px-5 py-1.5 rounded-md cursor-pointer mt-4'>Update</button>
              : <button type="submit" className='bg-purple-600 hover:bg-purple-700 text-white px-5 py-1.5 rounded-md cursor-pointer mt-4' onClick={save}>Save Changes</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
