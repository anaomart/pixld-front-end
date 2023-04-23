import axios from 'axios';

const URL = 'https://share-me-n2qk.onrender.com'
const user = JSON.parse(localStorage.getItem('user'));

export const userRequest = axios.create({
    baseURL: URL,
    headers: {
        Authorization: 'Bearer ' + user
    }
})