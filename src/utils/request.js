import axios from "axios";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 依據不同環境設置 baseURL，最終請求時的URL 為baseURL + 發送請求時寫的URL
  timeout: 5000, //請求超時

});
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


/**
 * 請求攔截器
 */

request.interceptors.request.use(
  (config) => {
    // // 添加全局 Header頭 token
    // let token = window.localStorage.getItem("token");
    // if (config.token === true) {
  
    //   config.headers.Authorization = 'Bearer ' +token;
    // }

    // // 顯示loading
    // if (config.loading === true) {
    //   showLoading();
    // }

    return config;
  },
  (err) => {
    // hideLoading() // 隱藏loading
    // //  全局錯誤提示
    // if (err.response && err.response.data && err.response.data.errorCose) {
    //   ElMessage.error(err.response.data.msg)
    // }

    return Promise.reject(err);
  }
);

/**
 * 響應攔截器
 */

request.interceptors.response.use(
  (res) => {
    // hideLoading() // 隱藏loading
    return res;
  },
  (err) => {
    // //  全局錯誤提示
    // if (err.response && err.response.data && err.response.data.errorCose) {
    //   ElMessage.error(err.response.data.msg)
    // }
    // hideLoading() // 隱藏loading

    return Promise.reject(err);
  }
);

export default request; //  導出自定義創建 axios
