import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthContext from '../../context/auth';



const Header = () => {


  const { loading, user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <span style={{
            cursor:"pointer"
          }}>
            Internlancer
          </span>
        </Link>
        <div className="btnsWrapper">
          <Link href="/company/add">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="dropdown ml-3">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/company">
                  <a className="dropdown-item">My Jobs</a>
                </Link>

                <Link href="/me/applied">
                  <a className="dropdown-item">Jobs Applied</a>
                </Link>

                <Link href="/me">
                  <a className="dropdown-item">Profile</a>
                </Link>

                <Link href="/me/resume">
                  <a className="dropdown-item">Upload Resume</a>
                </Link>

                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/auth/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;