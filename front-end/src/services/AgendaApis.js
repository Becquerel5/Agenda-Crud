import axios from 'axios';
//let API_URL = "http://localhost:8080/api/agenda/save";


let API_URL = "http://localhost:8080/api/agenda";

function create(agenda) {
    return axios
    .post(API_URL + "/save", agenda);
   
}

function deleteAgenda(id) {
    return axios
    .delete(API_URL + "/" +id);
    
}

function update(id, info) {
    return axios
    .put(API_URL + "/" +id, info);
    
}

/* function fetch(agenda) {
    return axios
    .put(API_URL + "/getall" ,agenda);
    
} */

export default{
   create,
   deleteAgenda,
   update,
   fetch
}