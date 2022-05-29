import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import AuthContext from "../../context/auth";
import Layout from '../../component/layout/Layout';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

    const { loading, error, isAuthenticated, login, clearErrors } = useContext(AuthContext);
    
    useEffect(() => {
      
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push("/");
    }
        

  }, [isAuthenticated, error, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ username: email, password });
  };

  return (
    <Layout>
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2>Login</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="\S+@\S+\.\S+"
                    title="Your email is invalid"
                    required
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="loginButtonWrapper">
                <button type="submit" className="loginButton">
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </div>
              <p style={{ textDecoration: "none" }} className="signup">
                New to Internlancer? <Link href="/auth/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      </div>
      </Layout>
  );
};

export default Login;
