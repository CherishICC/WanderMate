import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      phone: user.phone,
      email: user.email,
      password: user.password,
      pref1: user.pref1,
      pref2: user.pref2,
    });
  }

  create(data) {
    return axios.post(API_URL + 'signup', data);
  }
}

export default new AuthService();
