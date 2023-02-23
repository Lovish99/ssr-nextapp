import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `https://63f7496be8a73b486af48628.mockapi.io/contact/${query.Id}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });

  return {
    props: {
      todos: res || null,
    },
  };
}

const Update = ({ todos }) => {
  const initialState = {
    name: todos.name || "",
    email: todos.email || "",
    contact: todos.contact || "",
    status: todos.status || "",
  };

  const [state, setState] = useState(initialState);
  const { name, email, contact, status } = state;

  const router = useRouter();

  const { Id } = router.query;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !status) {
      toast.error("Please provide value in each input field");
    } else {
      fetch(`https://63f7496be8a73b486af48628.mockapi.io/contact/${Id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(state),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        router.replace("/");
      }, 1000);
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

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact No ..."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Your Status ..."
          value={status || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
      <style>
        {`
  input[type=text],
input[type=email],
input[type=number],
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

export default Update;
