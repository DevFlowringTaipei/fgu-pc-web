import request from "@/utils/request";

// 登入
export function login(loginForm) {
  return request(
    {
      url: `/authorize`,
      method: "post",
      data:loginForm
    }
  );
}

// 註冊
export function signup(signupForm) {
  return request({
    url: "/user-info/registered",
    method: "post",
    data: signupForm,
  });
}

// 獲取用戶訊息
export function getUserInfo() {
  let token = window.localStorage.getItem("token");
  return request({
    url: `/user-info/current`,
    method: "get",
    headers: {
      'Authorization': 'Bearer '+token
    },
  },);
}

// 修改密碼 
export function updatePassword(dataForm) {
  let token = window.localStorage.getItem("token");
  return request({
    url: "/user-info/password/update",
    method: "post",
    data: dataForm,
    headers: {
      'Authorization': 'Bearer '+token
    },
  });
}


// 修改密碼 old
// export function updatePassword(dataForm) {
//   return request({
//     url: "/user-info/password/update",
//     method: "post",
//     params: dataForm,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     transformRequest: [
//         (params) => {
//           let result = ''
//           for (let key in params) {
//             result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
//           }
//           return result.slice(0, result.length - 1)
//         }
//       ],

//     // params: JSON.stringify(dataForm),
//   },{token:true});
// }

//登出
export function logout(token) {
  return request({
    url: `/user/logout`,
    method: "post",
    data: {
      token,
    },
  });
}

