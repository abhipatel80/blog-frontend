import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAsync } from "../store/userSlice";
import { getInputValue } from "../store/inputSlice";

const Navbar = () => {
  const [search, setsearch] = useState();

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchblog = (e) => {
    if (e.key === "Enter") {
      dispatch(getInputValue(search));
      navigate("/search");
    }
  };

  const logout = () => {
    dispatch(logoutAsync());
    localStorage.clear();
    navigate("/user/login");
  };

  return (
    <div>
      <nav className="shadow-md bg-white fixed top-0 w-full z-50">
        <ul className="flex p-3">
          <NavLink to="/" className="">
            <h2 className="md:text-2xl text-xl md:ml-4 ml-0 cursor-pointer md:mr-4 mr-3 mt-1">
              Blogify
            </h2>
          </NavLink>
          <div className="mb-[-2rem] ml-auto mt-[-12px]">
            <input
              type="search"
              onKeyUp={searchblog}
              className="outline-none border border-gray-400 bg-gray-100 
                            rounded-full input md:w-[25rem] w-[10rem]"
              placeholder="🔍 Search blog..."
              onChange={(e) => setsearch(e.target.value)}
              name="search"
              id="search"
            />
          </div>
          <div
            className={`ml-auto flex justify-between ${
              token ? "lg:w-[13rem] w-[11rem]" : ""
            }`}
          >
            {token ? (
              <NavLink to="/addblog" className="md:block hidden">
                <li className="cursor-pointer text-xl mt-1 hover:border-b-2 border-purple-600">
                  Add Blog
                </li>
              </NavLink>
            ) : (
              ""
            )}
            {token ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle hover:bg-purple-700 md:mr-4 ml-[1rem] bg-purple-600"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                <ul className="dropdown-menu">
                  <NavLink to="/myprofile">
                    <li className="cursor-pointer dropdown-item mt-1 border-purple-600">
                      My Profile
                    </li>
                  </NavLink>
                  <NavLink to="/myblog">
                    <li className="cursor-pointer dropdown-item mt-1 border-purple-600">
                      My Blogs
                    </li>
                  </NavLink>
                  <NavLink to="/addblog" className="md:hidden">
                    <li className="cursor-pointer dropdown-item mt-1 border-purple-600">
                      Add Blog
                    </li>
                  </NavLink>
                  {token ? (
                    <button
                      className="cursor-pointer dropdown-item mt-1 border-purple-600"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
