import axios from 'axios'

function logIn(formData: any, updateCookie) {
  return axios.post('/login', formData).then(() => {
    updateCookie();
  });
}

function getCookieData() {
  return axios.get(`/cookiedata`)
    .then(response => {
      return {
        username: response.data.username
      };
    })
    .catch(err => console.log(err));
}

function getUserInfo(username) {
  return axios.post('/getuserinfo', {username})
}

export default {
  logIn, getCookieData, getUserInfo
};

