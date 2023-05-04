import {
  useState,
  useContext,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import { authClientApi } from "./services/authClientApi";

const clientContext = createContext({
  client: null,
});

const Store = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true); // add loading state

  useEffect(() => {
    authClientApi
      .details()
      .then((res) => {
        // if (res.status === 200||res.status===304||res.status === 204) {
        setClient(res);
        setLoading(false); // update loading state
        // }
      })
      .catch((err) => {
        console.log("err.response : ");
        console.log(err.response);
        setLoading(false); // update loading state
        setClient(err.response);
      });
  }, []);

  return {
    client,setClient,loading
  };
};

export const ProvideClient = ({ children }) => {
  const storeValue = Store();
  return (
    <clientContext.Provider value={storeValue}>
      {children}
    </clientContext.Provider>
  );
};

export const useClient = () => {
  return useContext(clientContext);
};
