import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { getSession, signIn } from "next-auth/react";
import { useStore } from "@/client/context";
import { authConstants } from "@/client/context/constant";
import { getValue } from "@/utils/common";

const Login = ({ props }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [userState, setUserState] = useState(initialState);
  const { email, password } = userState;
  const router = useRouter();
  const [state, dispatch] = useStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserState({ ...userState, [name]: value });
  };

  // const user = getValue(state, ["user", null]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email, password };
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
    });

    if (!result.error) {
      const session = await getSession();
      console.log("10");
      console.log(session);
      console.log("10");
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
      router.replace("/");

      toast.success("Login Successfully");
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: result.error,
      });
      toast.error(result.error);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <h1 style={{ alignItems: "center" }}>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="status">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your Password ..."
          value={password || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
      <style>
        {`
  input[type=password],
input[type=email],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

    `}
      </style>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const user = getValue(ctx.req.cookies, ["next-auth.session-token"]);

  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;
