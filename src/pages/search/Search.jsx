import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchBlogAsync } from '../../store/blogSlice';
import Blog from '../../components/Blog';
import { NavLink } from 'react-router-dom';

const Search = () => {
    const dispatch = useDispatch();
    const { searchData, loading } = useSelector(state => state.blog);
    const { search } = useSelector(state => state.input);

    useEffect(() => {
        dispatch(searchBlogAsync(search));
        // eslint-disable-next-line
    }, [search]);

    if (search === "") {
        return (
            <div className='bg-white w-[50rem] mx-auto h-[30rem] flex items-center justify-center rounded-md shadow-lg mt-28'>
                <h2 className='text-center text-3xl'>No Blog Found</h2>
                <NavLink to='/' className="mt-32 absolute">
                    <button className='py-1.5 px-6 text-md text-white hover:bg-purple-700 bg-purple-600 rounded-md'>Home</button>
                </NavLink>
            </div>
        )
    }

    return (
        <div className='mt-28'>
            <Blog data={searchData} loading={loading} />
        </div>
    )
}

export default Search
