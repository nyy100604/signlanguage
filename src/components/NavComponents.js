import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { BsPersonGear } from "react-icons/bs";
import { GiVideoConference } from "react-icons/gi";



const NavComponents = ({ needIcon }) => {
  const go = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
   
  
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (path) => {
      // 導航到選擇的路徑
      navigate(path);
    };
  
    return (
      <div className="dropdown">
        <div className="film-icon-container">
         <GiVideoConference
          className="hover:drop-shadow-md cursor-pointer element-class" 
          onClick={handleToggle}
        />
              {isOpen && (
          <ul className="dropdown-menu">
            <li
              className="dropdown-menu-item"
              onClick={() => handleOptionClick('/learning/1')}
            >
              單元1
            </li>
            <li
              className="dropdown-menu-item"
              onClick={() => handleOptionClick('/learning/2')}
            >
              單元2
            </li>
            <li
              className="dropdown-menu-item"
              onClick={() => handleOptionClick('/learning/3')}
            >
              單元3
            </li>
          </ul>
        )}
      </div>
      </div>
    );
  };

  return (
    <header className="bg-[#124c8a] sticky top-0 z-50 font-bold text-2xl px-[1rem] py-[1rem] hover:drop-shadow-xl text-white">
      <div className="flex flex-col items-center justify-center max-w-full h-[4.5rem] md:flex md:flex-row md:justify-between md:max-w-[1022px] md:mx-[auto]">
        <div className="cursor-pointer">
          <span
            className="flex items-center"
            onClick={() => {
              go("/select");
            }}
          >
            <img src="./logo.jpg" alt="Logo" className="mr-1" style={{ width: "100px", height: "100px" }} />
            AI手語助學網站
          </span>
        </div>
        <div className="flex w-[300px] justify-evenly mt-2 md:my-0 cursor-pointer">
          {needIcon && (
            <>
              <ImHome
                className="hover:drop-shadow-md element-class"
                onClick={() => {
                  go("/select");
                }}
              />
               <DropdownMenu />
              <BsPersonGear
                className="hover:drop-shadow-md element-class"
                onClick={() => {
                  go("/practice");

                }}
              />
              <HiArrowRightOnRectangle
               className="hover:drop-shadow-md element-class"
               onClick={() => {
                  handleLogout();
                  go("/signIn");
                }}
             />
            
            </>
          )}
         
         
        </div>
      </div>
    </header>
  );
};

export default NavComponents;
