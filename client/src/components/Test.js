import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClient } from "../ClientContext";

function TestComp() {
  const navigate = useNavigate();
  const { client } = useClient();
  useEffect(() => {
    if (client!=null && client.status>400) {
      console.log("not logged in");
      navigate("/signin");
    }
    console.log(client?.data);
  }, [client]);
  return (
    <>
    {client && <h1>Client Email: {client.data.email} </h1>}
    </>
  );
}

export default TestComp;
