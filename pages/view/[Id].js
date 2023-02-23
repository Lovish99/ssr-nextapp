import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

//page is created on run time not on build time
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
      contactDetails: res || null,
    },
  };
}

const Details = ({ contactDetails }) => {
  const router = useRouter();
  const { Id } = router.query;

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Detail</p>
        </div>
        <div className="container">
          <strong>Id:</strong>
          <span>{Id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{contactDetails.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{contactDetails.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{contactDetails.contact}</span>
          <br />
          <br />
          <Link href={"/"}>
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
      <style>
        {`
  .card {
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px red solid;
  align-content: center;
  margin: 0 auto;
}

.card-header {
  height: 30%;
  background: #5d6770;
  color: white;
  text-align: center;
}

.card-header p {
  font-size: 20px;
}
.container {
  padding: 4px 16px;
}


    `}
      </style>
    </div>
  );
};

export default Details;
