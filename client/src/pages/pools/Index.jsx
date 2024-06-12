import React, { useEffect, useState } from "react";
import axios from "axios";

import PoolsTable from "../../components/PoolsTable";

const Index = () => {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pools")
      .then((response) => {
        setPools(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <PoolsTable pools={pools} />
    </>
  );
};

export default Index;
