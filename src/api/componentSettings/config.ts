import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://cinemaguide.skillbox.cc',
  withCredentials: true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
})
