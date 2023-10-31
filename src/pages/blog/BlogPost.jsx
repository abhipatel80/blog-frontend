import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogAsync } from '../../store/blogSlice';
import Blog from '../../components/Blog';
import { useNavigate } from 'react-router-dom';

const BlogPost = () => {
    const { blogData, loading } = useSelector(state => state.blog);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogAsync());
        // eslint-disable-next-line
    }, []);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/user/login")
        }
        // eslint-disable-next-line
    }, [token]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, []);

    return (
        <div className='mt-28'>
            <Blog data={blogData} loading={loading} />
        </div>
    )
}

export default BlogPost