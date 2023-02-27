import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { signup } from "@/client/request";
import { useStore } from "@/client/context";
import { getValue, validateAllOnce } from "@/utils/common";

const SignUp = ({ props }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [userState, setState] = useState(initialState);
  let { name, email, password } = userState;

  const router = useRouter();
  // const [state, dispatch] = useStore();
  // const user = getValue(state, ["user", null]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...userState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = userState;
    if (!name || !email || !password) {
      toast.error("please fill all the fields ");
      return;
    }

    const res = await fetch(
      "https://63f7496be8a73b486af48628.mockapi.io/user",
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });

    let user = {};

    Object.keys(res).map((id, index) => {
      if (res[id].email === email) {
        user = res[id];
      }
    });

    if (Object.keys(user).length > 0) {
      toast.error("please choose another email");
    } else {
      const payload = { name, email, password };

      const result = await fetch(
        "https://63f7496be8a73b486af48628.mockapi.io/user",
        {
          method: "POST",
          headers: { "content-type": "application/json" },

          body: JSON.stringify(payload),
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() => {
          toast.success("Ssuccessfully created account");
          setState(initialState);
          router.replace("/login");
        })
        .catch((error) => {
          errorHandler("Something went wrong", error);
          console.log(error);
        });
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
        <h1 style={{ alignItems: "center" }}>Sign Up</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password ..."
          value={password || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
      <style>
        {`
  input[type=text],
input[type=email],
input[type=password],
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

export default SignUp;
