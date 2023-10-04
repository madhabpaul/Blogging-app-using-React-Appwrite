import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import authSlice, { logout } from "../../store/authSlice";
function LogoutButton() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authSlice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default LogoutButton;