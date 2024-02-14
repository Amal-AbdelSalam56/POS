import axios from "axios";

const instance = axios.create({
  baseURL: 'http://test.testm.online:4050/api/',
});

//   instance.interceptors.request.use(function(config){

//     store.dispatch(changeLoader(true))
// return config;

//   },function(error){

//     return Promise.reject(error)
//   })

//   instance.interceptors.response.use(function(response){
//     store.dispatch(changeLoader(false))
//     return response
//   },function(error){
//     return Promise.reject(error)
//   })




export default instance