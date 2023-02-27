import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStore } from "@/client/context";
import { getValue } from "@/utils/common";
import { signOut } from "next-auth/react";
import { authConstants } from "@/client/context/constant";

const Navigation = (props) => {
  const [activeTab, setActiveTab] = useState("Home");

  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);

  const authenticated = getValue(state, ["user", "authenticated"], false);

  const router = useRouter();

  return (
    <div>
      <div className="header">
        <p className="logo"> Todo list</p>
        <div className="header-right">
          {authenticated && (
            <Link href={"/"}>
              <p
                className={`${activeTab === "Home" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("Home");
                }}
              >
                {user.name}
              </p>
            </Link>
          )}

          <Link href={"/"}>
            <p
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("Home");
              }}
            >
              Home
            </p>
          </Link>

          {authenticated && (
            <Link href={"/add"}>
              <p
                className={`${activeTab === "AddContact" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("AddContact");
                }}
              >
                Add Todo
              </p>
            </Link>
          )}

          <Link href={"/about"}>
            <p
              className={`${activeTab === "About" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("About");
              }}
            >
              About
            </p>
          </Link>

          {authenticated ? (
            // <Link

            // >
            <p
              className={`${activeTab === "SignUp" ? "active" : ""}`}
              onClick={() => {
                signOut({ redirect: false }).then((res) => {
                  dispatch({ type: authConstants.LOGIN_FAILURE });
                });
              }}
            >
              Logout
            </p>
          ) : (
            <>
              <Link href={"/signup"}>
                <p
                  className={`${activeTab === "SignUp" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("SignUp");
                  }}
                >
                  Sign Up
                </p>
              </Link>
              <Link href={"/login"}>
                <p
                  className={`${activeTab === "Login" ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab("Login");
                  }}
                >
                  login
                </p>
              </Link>
            </>
          )}
        </div>
      </div>

      <style>
        {`
   .header {
  overflow: hidden;
  background-color: #f1f1f1;
}

.header p {
  float: left;
  color: black;
  text-align: center;
  padding: 10px;
  text-decoration: none;
  font-size: 18px;
  line-height: 15px;
  border-radius: 4px;
}

.inputField {
  width: 40% !important;
  padding: 1px;
  margin-top: 5px;
  margin-right: 6px;
  border: none;
  font-size: 17px;
}

.header p.logo {
  font-size: 25px;
  font-weight: bold;
  color: #4284f5;
}

.header p.active {
  background-color: dodgerblue;
  color: white;
}

.header p:hover {
  background-color: #ddd;
  color: #5d6770;
}
.header-right {
   float: right; 
}

@media screen and (max-width: 500px) {
  .header p {
    float: none;
    display: block;
    text-align: left;
  }

  .header-right {
    float: none;
  }
}


    `}
      </style>
    </div>
  );
};

export default Navigation;
