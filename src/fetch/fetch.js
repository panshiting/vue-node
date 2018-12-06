import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// axios.defaults.timeout = 5000
axios.defaults.baseURL = ''

// download url
const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    return {...config, data: {reqBody: config.data}}
  },
  error => {
    return error
  })
// http response 服务器响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.headers && (response.headers['content-type'].toLocaleLowerCase() === 'application/x-msdownload' ||
      response.headers['content-type'].toLocaleLowerCase() === 'application/vnd.ms-excel;charset=utf-8' ||
      response.headers['content-type'].toLocaleLowerCase() === 'application/msexcel;charset=utf-8' ||
      response.headers['content-type'].toLocaleLowerCase() === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      downloadUrl(response.request.responseURL)
      return {respHeader: {resultCode: 0, message: ''}}
    } else {
      return response.data
    }
  },
  error => { // 错误处理
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          store.dispatch('FedLogOut')
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    return Promise.reject(error)
  })

// const preDefinedError = {
//     404: '请求地址不存在',
//     500: '服务器发生错误',
//     401: '用户未认证'
// }

// const queryParameters = (data) => Object.keys(data)
//   .map(key => [key, data[key]].map(encodeURIComponent).join('='))
//   .join('&')
/**
 * 与后台交互
 * @param url 请求地址
 * @param options 参数 data head config 配置
 * @param messageHide 提示信息是否显示
 */
const fetch = (url, options = {}, messageHide = false) => {
  const requestHeaders = options.header || {'content-type': 'application/json'}
  const {suburl, ...params} = options
  return new Promise(async (resolve, reject) => {
    axios({
      url: url + (suburl || ''),
      method: 'post',
      header: requestHeaders,
      ...params
    }).then(function (res) {
      const {respHeader, respBody} = res
      if (respHeader && respHeader.resultCode === 0) {
        resolve(respBody || respHeader.message)
      } else {
        !messageHide && Message.error(respHeader.message)
        reject(res)
      }
    }).catch(function (e) {
      Message.error(e.message)
      reject(e)
    })
  })
}
export default fetch
