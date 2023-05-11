import axios from "axios";

const url = "http://localhost:8000";

export const productsController = {
  async addProduct(data) {
    return axios
      .post(`${url}/products/addProduct`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async updateProduct(data) {
    return axios
      .put(`${url}/products/updateProduct`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async getProductsByBrand(brandId) {
    return axios
      .post(`${url}/products/getByBrand`, brandId, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async getAll() {
    return axios.get(`${url}/products/getall`).catch((err) => {
      console.log(err);
      return err.response;
    });
  },
  async getProductById(id) {
    return axios
      .post(`${url}/products/getById`, id, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async addReview(data) {
    return axios
      .post(`${url}/products/addReview`, data, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async deleteReview(productId, reviewId) {
    return axios
      .delete(`${url}/products/deleteReview/${productId}/${reviewId}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },

  async setOnSale(data) {
    return axios
      .put(`${url}/products/setOnSale`, data, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async deleteProduct(id) {
    return axios
      .delete(`${url}/products/deleteProduct/${id}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async deleteProductByAdmin(id) {
    return axios
      .delete(`${url}/products/deleteProductAdmin/${id}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
};

export const clientController = {
  async getClients() {
    return await axios.get(`${url}/auth/getall`, { withCredentials: true });
  },
  async banClient(clientId) {
    return axios
      .post(`${url}/admin/banClient`, clientId, { withCredentials: true })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async updateClient(updatedData) {
    return axios
      .put(`${url}/client/updateClient`, updatedData, { withCredentials: true })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
};
export const ordersController = {
  async addOrder(data) {
    return axios
      .post(`${url}/orders/addOrders`, data, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async getOrdersByClient() {
    return axios
      .get(`${url}/orders/getOrdersByClient`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async cancelOrder(id) {
    return axios
      .delete(`${url}/orders/deleteOrder/${id}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
};
