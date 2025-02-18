import axios from "axios";

const postingUserSignUpData = async (data) => {
  try {
    const userDataResponse = await axios.post(
      "http://localhost:5000/signIn",
      data
    );
    return userDataResponse.data;
  } catch (error) {
    throw error;
  }
};

export default postingUserSignUpData;
