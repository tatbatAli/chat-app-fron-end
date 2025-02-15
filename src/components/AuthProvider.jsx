import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Authentication() {
  const [token, setToken] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      const response = await axios.get("");
    };
  });
}
