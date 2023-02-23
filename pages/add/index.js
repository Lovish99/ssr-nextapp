import React, { useState } from "react";
import db from "../../util/firebase";
import { ref, onValue, getDatabase } from "firebase/database";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  let records = [];

  const dbRef = ref(getDatabase(db), "contacts");
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childsnapshot) => {
      let data = childsnapshot.val();
      records.push(data);
    });
  });

  return {
    props: {
      todos: records || null,
    },
  };
}

const Add = ({ todos }) => {
  const initialState = {
    name: "",
    email: "",
    contact: "",
    status: "",
  };
  const [state, setState] = useState(initialState);
  const { name, email, contact, status } = state;
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !status) {
      toast.error("Please provide value in each input field");
    } else {
      console.log(state);
      let stateVariables = { ...state, idd: `${todos.length + 1}` };
      console.log(stateVariables);
      db.database()
        .ref()
        .child("contacts")
        .push(stateVariables, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("list added Successfully");
          }
        });

      setTimeout(() => router.replace("/"), 500);
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
    </div>
  );
};

export default Add;
