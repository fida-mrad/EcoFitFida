import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:3000/",
// //   responseType: "json",
// });
const url = "http://localhost:3000";

export const authClientApi = {
    async login(credentials) {
        return await axios.post(`${url}/auth/login`, credentials, {
            withCredentials: true,
        });
    },
    async details() {
        return await axios
            .get(`${url}/auth/get`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
            .catch((err) => {
                console.log(err);
                return err.response;
            });
    },
    async logout() {
        return await axios.get(`${url}/auth/logout`, {withCredentials: true}
        )
            ;
    },
    async Register (data){
        return await axios.post(`${url}/auth/register` , data)
    },

};