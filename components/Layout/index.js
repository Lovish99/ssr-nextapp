import { useStore } from "@/client/context";
import { authConstants } from "@/client/context/constant";
import { getValue } from "@/utils/common";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import Navigation from "../Navigation";

const Layout = ({ children }) => {
  const [state, dispatch] = useStore();

  // useEffect(async () => {
  //   const authenticated = getValue(state, ["user", "authenticated"], false);
  //   if (!authenticated) {
  //     console.log("layout", authenticated);
  //     dispatch({ type: authConstants.LOGIN_REQUEST });
  //     const session = await getSession();
  //     if (session) {
  //       dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
  //     } else {
  //       dispatch({ type: authConstants.LOGIN_FAILURE, payload: session });
  //     }
  //   }
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const authenticated = getValue(state, ["user", "authenticated"], false);
      if (!authenticated) {
        console.log("layout", authenticated);
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const session = await getSession();
        if (session) {
          dispatch({ type: authConstants.LOGIN_SUCCESS, payload: session });
        } else {
          dispatch({ type: authConstants.LOGIN_FAILURE, payload: session });
        }
      }
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <div>
      <Navigation />

      {children}
    </div>
  );
};

export default Layout;
