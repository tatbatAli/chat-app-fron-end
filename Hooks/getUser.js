import React from "react";
import fetchUser from "./fetchUser";

const getUser = async (setUsers) => {
  try {
    const data = await fetchUser();
    console.log(data);
    if (data) {
      setUsers(data);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log("err fetching user", error);
  }
};

export default getUser;
