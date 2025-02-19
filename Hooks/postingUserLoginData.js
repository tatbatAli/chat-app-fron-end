import axios from "axios";

const postingUserLoginData = async (data) => {
  try {
    const loginResponse = await axios.get("http://localhost:5000/login", data);
    return loginResponse.data;
  } catch (error) {
    throw error;
  }
};

export default postingUserLoginData;
