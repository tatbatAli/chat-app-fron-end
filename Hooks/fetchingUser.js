import axios from "axios";

const fetchUser = async (username) => {
  try {
    const fetchingResponse = await axios.get("http://localhost:5000", {
      params: username,
    });
    return fetchingResponse;
  } catch (error) {
    throw error;
  }
};

export default fetchUser;
