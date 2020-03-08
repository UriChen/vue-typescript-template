export interface ILoginParams {
  username: string
  password: string
}

export interface IResponse {
  message: string
  success: number
}

export interface ILoginResponse extends IResponse{
  Utype: number
  token: string
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface IUserInfo {
  roles: string[]
}
