// import {
//   errorHandler,
//   responseHandler,
//   validateAllOnce,
// } from "../../../utils/common";

// //import { dbConnect } from "../../../lib/db-connect";
// //import User from "../../../models/user";
// // import bcrypt from "bcrypt";
// // import { toast } from "react-toastify";
// //import { useRouter } from "next/router";

// export default async function handler(req, res) {
//   // const router = useRouter();

//   if (req.method !== "POST") {
//     // return error
//     errorHandler("Invalid Request Type", res);
//   } else {
//     // try {
//     const { name, email, password } = req.body;

//     validateAllOnce(req.body);

//     // const hashPassword = await bcrypt.hash(password, 8);
//     // const user = { ...req.body, password: hashPassword };

//     fetch("https://63f7496be8a73b486af48628.mockapi.io/user", {
//       body: JSON.stringify(req.body),
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then(() => {
//         responseHandler(userDoc, res, 201);
//       })
//       .catch((error) => {
//         errorHandler("Something went wrong", res);
//       });

//     // if (saveUser) {
//     //   // const userDoc = saveUser._doc;
//     //   // delete userDoc.password;

//     //   //router.replace("/");
//     // } else {

//     // }
//     // } catch (error) {
//     //   errorHandler(error, res);
//     // }
//   }
// }
