import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

 
  // customer
  userPackageListAll()
  {
    return axios.get(API_URL + `package-booking`, { headers: authHeader() });
  }
  userPackageList(id)
  {
    return axios.get(API_URL + `package-booking/${id}`, { headers: authHeader() });
  }
  packagefindByLocation(location)
  {
    return axios.get(API_URL + `package-booking?location=${location}`, { headers: authHeader()});
  }


  // guide
  packagegetAll()
  {
    return axios.get(API_URL + `package`, { headers: authHeader() });
  }
  packageget(id)
  {
    return axios.get(API_URL + `package/${id}`, { headers: authHeader() });
  }
  packagecreate(data)
  {
    return axios.get(API_URL + `package`, {headers: authHeader()},data);
  }
  packageupdate(id,data) {
    return axios.put(API_URL + `package/${id}`, { headers: authHeader()},data);
  }
  packagedelete(id) {
    return axios.delete(API_URL + `package/${id}`, { headers: authHeader()});
  }
  packagedeleteAll() {
    return axios.delete(API_URL + `package`, { headers: authHeader()} );
  }
  packagefindByUsername(package_name)
  {
    return axios.get(API_URL + `package?package_name=${package_name}`, { headers: authHeader()});
  }



  // admin
  getAll() {
    return axios.get(API_URL + `admin`, { headers: authHeader() });
  }
  get(id) {
    return axios.get(API_URL + `admin/${id}`, { headers: authHeader() });
  }
  create(data) {
    return axios.post(API_URL + `admin`, { headers: authHeader()},data);
  }
  update(id,data) {
    return axios.put(API_URL + `admin/${id}`, { headers: authHeader()},data);
  }
  delete(id) {
    return axios.delete(API_URL + `admin/${id}`, { headers: authHeader()});
  }
  deleteAll() {
    return axios.delete(API_URL + `admin`, { headers: authHeader()} );
  }
  findByUsername(username)
  {
    return axios.get(API_URL + `admin?username=${username}`, { headers: authHeader()});
  }
}


const userService = new UserService();

export default userService;