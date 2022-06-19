import axios from "axios";
const APIURL = "http://localhost:3001/";


export const apiPost = (payload, ext) => {
    axios.post(`${APIURL}${ext}`, payload)
    .catch(err => console.error(err))
}


export default { apiPost }