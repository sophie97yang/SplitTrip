import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from '../SignupFormModal'
import "./LoginFormModal.css";
import logo from '../../assets/images/SplitTrip-logo.png';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history=useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handleDemo = async(e) => {
    e.preventDefault();
    const email='demo@gmail.com'
    const password='password'
    const data = await dispatch((login(email, password)));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  }

  return (
    <div id='login-modal' className='login-page'>
       <button onClick={closeModal} className='close-modal' id='update-trip-close'><i className="fa-solid fa-xmark fa-2xl"></i></button>
      <h1>Welcome back.</h1>
      {/* <p className='redirection'>Not a member yet? <OpenModalButton
              buttonText="Sign Up"
              onButtonClick={()=> {history.push('/')}}
              modalComponent={<SignupFormModal />}
            />
      </p> */}
      <div className="login-layout">
      <img src={logo} alt='logo' className="logo"></img>
      <form onSubmit={handleSubmit}>
      <h2>Log in to access the best of SplitTrip</h2>
      <div className='login-flex'>
        <label>
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email ? <p className='errors' id="login-errors-email">{errors.email}</p>: <p className='errors' id="login-errors-email"></p>}
        </div>
        <div className='login-flex'>
        <label>
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password ? <p className='errors'id="login-errors-pass">{errors.password}</p>: <p className='errors' id="login-errors-pass"></p>}
        </div>
        <div className="action-buttons" id='action-button-modal'>
        <button type="submit" className='action-button-ls' id='action-button-ls-modal-1'>Log In</button>
        <button onClick={handleDemo}className='action-button-ls' id='action-button-ls-modal-2'>Log in as Demo User</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
