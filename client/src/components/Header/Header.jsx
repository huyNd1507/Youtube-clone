import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../image/web.png";

import "./Header.scss";

const Header = ({ setShow, show }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [showNavbar, setShowNavbar] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShow(!show);
  };

  const showNavbarUser = () => {
    setShowNavbar(!showNavbar);
  };

  const handleSearchChange = (e) => {
    setText(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    navigate(`/search?type=video&q=${text}`);
  };

  return (
    <header className="header">
      <div className="logo left">
        <i className="bx bx-menu box-icon" onClick={toggleMenu}></i>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>

      <div className="search center">
        <form onSubmit={handelSubmit}>
          <input
            value={text}
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button>
            <i className="bx bx-search box-icon"></i>
          </button>
        </form>
      </div>

      <div className="icons right">
        {currentUser ? (
          <>
            <Link to="/upload">
              <i className="bx bx-cloud-upload  box-icon"></i>
            </Link>
            <i
              className="bx bxs-user-circle box-icon"
              onClick={showNavbarUser}
            ></i>
            <div
              className={showNavbar ? "user-login toogle" : "user-login"}
              onClick={showNavbarUser}
            >
              <ul>
                <li>{currentUser?.name}</li>
                <li>{currentUser?.email}</li>
                <li>
                  <Link to={`/channel/${currentUser._id}`}>Quản lí kênh</Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
