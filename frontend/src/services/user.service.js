import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  // customer
  userBookingAll() {
    return axios.get(API_URL + `booking`, { headers: authHeader() });
  }
  userBooking(id) {
    return axios.get(API_URL + `booking/${id}`, { headers: authHeader() });
  }
  bookingfindByLocation(location) {
    return axios.get(API_URL + `booking?location=${location}`, {
      headers: authHeader(),
    });
  }
  bookingcreate(data) {
    console.log(authHeader(), data);
    return axios.post(API_URL + `booking`, data, { headers: authHeader() });
  }
  bookingupdate(id, data) {
    return axios.put(API_URL + `booking/${id}`, data, { headers: authHeader() });
  }
  // packages in user page
  userPackageListAll() {
    return axios.get(API_URL + `packagebooking`, { headers: authHeader() });
  }
  userPackageList(id) {
    return axios.get(API_URL + `packagebooking/${id}`, {
      headers: authHeader(),
    });
  }
  packagefindByLocation(location) {
    return axios.get(API_URL + `packagebooking?location=${location}`, {
      headers: authHeader(),
    });
  }

  // chat
  userChatAll() {
    return axios.get(API_URL + `chat`, { headers: authHeader() });
  }
  guideChatAll(to) {
    return axios.get(API_URL + `guidechat?to=${to}`, { headers: authHeader() });
  }
  userListAll() {
    return axios.get(API_URL + `userList`, { headers: authHeader() });
  }
  GetChatByreceiver(to) {
    // console.log(to);
    return axios.get(API_URL + `chat?to=${to}`, {
      headers: authHeader(),
    });
  }
  chatcreate(data) {
    return axios.post(API_URL + `chat`, data, { headers: authHeader() });
  }
  guidechatcreate(data) {
    return axios.post(API_URL + `guidechat`, data, { headers: authHeader() });
  }

  // blogs in user page
  bloggetAll() {
    return axios.get(API_URL + `blog`, { headers: authHeader() });
  }
  getblog(id) {
    return axios.get(API_URL + `blog/${id}`, { headers: authHeader() });
  }
  createblog(data) {
    return axios.post(API_URL + `blog`, data, { headers: authHeader() });
  }
  updateblog(id, data) {
    return axios.put(API_URL + `blog/${id}`, data, { headers: authHeader() });
  }
  deleteblog(id) {
    return axios.delete(API_URL + `blog/${id}`, { headers: authHeader() });
  }
  blogdeleteAll() {
    return axios.delete(API_URL + `blog`, { headers: authHeader() });
  }
  blogfindBylocation(location) {
    return axios.get(API_URL + `blog?location=${location}`, {
      headers: authHeader(),
    });
  }

  // guide
  packagegetbyusername(username) {
    return axios.get(API_URL + `package?username=${username}`, {
      headers: authHeader(),
    });
  }
  packagegetAll() {
    return axios.get(API_URL + `package`, { headers: authHeader() });
  }
  packageget(id) {
    return axios.get(API_URL + `package/${id}`, { headers: authHeader() });
  }
  packagecreate(data) {
    return axios.post(API_URL + `package`, data, { headers: authHeader() });
  }
  packageupdate(id, data) {
    return axios.put(API_URL + `package/${id}`, data, {
      headers: authHeader(),
    });
  }
  packagedelete(id) {
    return axios.delete(API_URL + `package/${id}`, { headers: authHeader() });
  }
  packagedeleteAll() {
    return axios.delete(API_URL + `package`, { headers: authHeader() });
  }
  packagefindByUsername(package_name) {
    return axios.get(API_URL + `package?package_name=${package_name}`, {
      headers: authHeader(),
    });
  }

  // user profile
  userget(id) {
    return axios.get(API_URL + `user/${id}`, { headers: authHeader() });
  }
  userupdate(id, data) {
    return axios.put(API_URL + `user/${id}`, data, { headers: authHeader() });
  }

  // guide profile
  guideget(id) {
    return axios.get(API_URL + `guide/${id}`, { headers: authHeader() });
  }
  guideupdate(id, data) {
    return axios.put(API_URL + `guide/${id}`, data, { headers: authHeader() });
  }

  // admin
  getAll() {
    return axios.get(API_URL + `admin`, { headers: authHeader() });
  }
  get(id) {
    return axios.get(API_URL + `admin/${id}`, { headers: authHeader() });
  }
  create(data) {
    return axios.post(API_URL + `admin`, data, { headers: authHeader() });
  }
  update(id, data) {
    return axios.put(API_URL + `admin/${id}`, data, { headers: authHeader() });
  }
  delete(id) {
    return axios.delete(API_URL + `admin/${id}`, { headers: authHeader() });
  }
  deleteAll() {
    return axios.delete(API_URL + `admin`, { headers: authHeader() });
  }
  findByUsername(username) {
    return axios.get(API_URL + `admin?username=${username}`, {
      headers: authHeader(),
    });
  }
}

const userService = new UserService();

export default userService;
