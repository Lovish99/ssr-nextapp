import React from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/client/context";
import { getValue } from "@/utils/common";

export async function getServerSideProps() {
  const res = await fetch(
    "https://63f7496be8a73b486af48628.mockapi.io/contact",
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
      todos: res,
    },
  };
}

export default function Home({ todos }) {
  const [data, setData] = useState(todos);

  const [selected, setSelected] = useState("Please Select");

  const [state, dispatch] = useStore();

  const authenticated = getValue(state, ["user", "authenticated"], false);

  const handleChange = async (e) => {
    setSelected(e.target.value);
    const url = new URL("https://63f7496be8a73b486af48628.mockapi.io/contact");

    url.searchParams.append("sortBy", e.target.value);

    await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReset = async () => {
    await fetch("https://63f7496be8a73b486af48628.mockapi.io/contact", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
      });

    setSelected("Please Select");
  };

  const onDelete = async (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      await fetch(`https://63f7496be8a73b486af48628.mockapi.io/contact/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      await fetch("https://63f7496be8a73b486af48628.mockapi.io/contact", {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error);
        });

      toast.success("Contact deleted Successfully");
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      {authenticated ? (
        <>
          <div
            style={{
              margin: "0 25%",
            }}
          >
            <label>Sort By: </label>
            <select
              value={selected}
              className="dropdown"
              name="colValue"
              onChange={handleChange}
            >
              <option>Please Select</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="contact">Contact</option>
              <option value="status">Status</option>
            </select>
            <button className="btn btn-reset" onClick={handleReset}>
              Reset
            </button>
          </div>
          <br />

          {Object.keys(data).length === 0 ? (
            <div
              style={{
                margin: "0 25%",
              }}
            >
              <div style={{ margin: "20px 0px", fontSize: "40px" }}>
                {" "}
                No Todo Found
              </div>
              <div> Please Click here to add ToDo</div>
              <Link href={`/add`}>
                <button className="btn btn-edit">Click Here</button>
              </Link>
            </div>
          ) : (
            <table style={{ marginTop: "20px" }} className="styled-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Contact</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(data).map((id, index) => {
                  return (
                    <tr key={data[id].id}>
                      <th scope="row">{index + 1}</th>
                      <td>{data[id].name}</td>
                      <td>{data[id].email}</td>
                      <td>{data[id].contact}</td>
                      <td>{data[id].status}</td>
                      <td>
                        <Link href={`/update/${data[id].id}`}>
                          <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button
                          className="btn btn-delete"
                          onClick={() => {
                            onDelete(data[id].id);
                          }}
                        >
                          Delete
                        </button>
                        <Link href={`/view/${data[id].id}`}>
                          <button className="btn btn-view">View</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <div>
          <h1>Welcome , Please Login</h1>
        </div>
      )}

      <style>
        {`

.styled-table {
  border-collapse: collapse;
  margin: auto;
  font-size: 0.9em;
  font-family: sans-serif;
  max-width: 800px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.btn {
  border: none;
  color: white;
  padding: 5px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.btn-edit {
  background-color: #008cba;
}

.btn-delete {
  background-color: #f44336;
}

.btn-view {
  background-color: #e7e7e7;
  color: black;
}

.dropdown {
  width: 20%;
  margin: 5px;
}

.btn-reset {
  background-color: darkolivegreen;
  color: black;
}

.btn-active {
  background-color: #808c4a;
  color: black;
}

.btn-inactive {
  background-color: #445f61;
  color: black;
}

    `}
      </style>
    </div>
  );
}
