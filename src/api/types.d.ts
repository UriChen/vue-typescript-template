export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ILoginParams {
  account: string
  password: string
}

export interface IGetPageParams {
  pageIndex: number
  pageSize: number
}

export interface IResponse {
  message: string
  success: number
}

export interface IUploadParams {
  file: any
  UpLoadType: string
}

export interface ILoginResponse extends IResponse{
  Utype: number
}
