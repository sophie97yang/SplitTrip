import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {useHistory} from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
     <i className="fas fa-user-circle fa-2xl" />
      <button onClick={openMenu} className='profile-button'>
       {showMenu ? <i className="fas fa-angle-up fa-2xl" /> : <i className="fas fa-angle-down fa-2xl" />}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li id='user-info'>Hi {user.first_name}!</li>
            <li><button onClick={(e)=> {
              e.preventDefault();
              history.push('/trips');
              closeMenu();
            }}>Trips</button></li>

            <li><button onClick={(e)=> {
              e.preventDefault();
              history.push('/bookings');
              closeMenu();
            }}>Bookings</button></li>

            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <button onClick={(e)=> {
              e.preventDefault();
              history.push('/signup');
              closeMenu();
            }}>Sign Up</button>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
