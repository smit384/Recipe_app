import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from "../redux/store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  // const [username, setUsername] = useState(localStorage.getItem("username"));
  
  function Logout(){
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("userID")
    dispatch(setUsername(""))
  }

  useEffect(()=>{
    if(localStorage.getItem("username")){
      dispatch(setUsername(localStorage.getItem("username")));
    }
  },[])

  return (
    <div>
      <nav class="  bg-gray-900 border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a class="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            /> */}
            <span
              class="self-center cursor-pointer  text-4xl font-semibold whitespace-nowrap"
              onClick={() => navigate("/")}
            >
              RecipeHub
            </span>
          </a>
          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
              <li>
                <a
                  class="block cursor-pointer text-xl py-2 px-3 text-white rounded md:bg-transparent  md:p-0 hover:text-blue-700"
                  aria-current="page"
                  onClick={() => navigate("/")}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  class="block cursor-pointer text-xl py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => navigate("/addrecipe")}
                >
                  View Recipes
                </a>
              </li>
              {username ? (
                <>
                  <li>
                    <a className="text-white cursor-pointer text-xl">{username}</a>
                  </li>
                  <li>
                    <a className="text-white cursor-pointer text-xl" onClick={Logout}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      class="block cursor-pointer text-xl py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      class="block cursor-pointer text-xl py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
