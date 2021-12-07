

class API {
  constructor() {

    this.rest = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true
    })
    this.rest.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  }

  async getListUsers(path) {
    return await this.rest.post(path);
  }

  async post(path) {
    return await this.rest.post(path);
  }

  async registration(path, data) {
    return await this.rest.post(path, { data })
  }

  async logIn(path, data) {
    return await this.rest.post(path,
      {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        data
      }
    )
  }
}



export default API;