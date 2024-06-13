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
      <h1 className="mt-3 text-xl font-bold">All customer bodies of water</h1>
      <PoolsTable pools={pools} />
    </>
  );
};

export default Index;
