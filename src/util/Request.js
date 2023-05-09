import axios from 'axios';

const URL = 'https://dashboard.render.com/'
    // const URL = 'http://localhost:4000/'
const user = JSON.parse(localStorage.getItem('user'));

export const userRequest = axios.create({
    baseURL: URL,
    headers: {
        Authorization: 'Bearer ' + user
    }
})