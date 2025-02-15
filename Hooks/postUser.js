import axios from "axios";

const postUser = async (username) => {
  try {
    const fetchingResponse = await axios.post("http://localhost:5000", {
      user: username,
    });
    return fetchingResponse;
  } catch (error) {
    throw error;
  }
};

export default postUser;
