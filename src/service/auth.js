import http from "./config"

const auth = {
  sign_up : (data) => http.post('/auth/register', data),
  verify_code : (data) => http.post('/auth/verify', data)
}

export default auth