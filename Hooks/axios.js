import axios from "axios";

const fetchData = async (messages) => {
  try {
    const response = await axios.post("http://localhost:5000", {
      messages: messages,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchData;
