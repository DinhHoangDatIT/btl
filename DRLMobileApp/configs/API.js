import axios from "axios";



// URL của backend server
const BASE_URL = 'https://hoangdat100203.pythonanywhere.com/';


export const endpoints = {
    'activities': '/activities/',
    'classes': '/classes/',
    'regulations': '/regulations/',
    'activity-details' : (activityId) => `/activities/${activityId}`
}   

export default axios.create({
    baseURL: BASE_URL
})