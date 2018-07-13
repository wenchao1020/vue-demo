/* 全局http处理 */
import { Notification, Loading } from 'element-ui'
import axios from 'axios'

// 设置超时时间 默认10s;
axios.defaults.timeout = 10 * 1000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://123.com/'

axios.interceptors.request.use(function (config) {
  config.url = '' + config.url
  config.noLoading = config.noLoading || false
  config.onTimeout = function (request) {
    request.cancel()
  }
/*  if (typeof config.data === 'object') {
    let ret = ''
    for (let it in config.data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(config.data[it]) + '&'
    }
    config.data = ret.length ? ret.substr(0, ret.length - 1) : ret
  } */
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    config.cache = false
  }
  layer.closeAll('loading')
  if (!config.noLoading) {
    Loading.service({ fullscreen: true })
    // layer.load(2, {shade: 0.2, area: ['32px', '64px']})
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  Loading.service().close()
  if (response.data.code === '500800') {
    window.location.href = response.data.result + '&t=' + new Date().getTime()
  // 全局错误信息的提示
  } else if (response.data.status === 'ERROR') {
    Notification({
      message: response.data.message,
      customClass: 'warn',
      duration: 3000,
      offset: 44
    })
    return Promise.reject(response.data)
  }
  return response.data
}, function (error) {
  switch (error.request.status) {
    case 403:
      {
        Notification({
          message: '无权访问指定资源！',
          customClass: 'error',
          duration: 0,
          offset: 44
        })
        // layer.closeAll('loading')
        break
      }
  }
  Notification({
    message: '响应出错！',
    customClass: 'error',
    duration: 0,
    offset: 44
  })
  console.error('响应出错:')
  console.error(error)
  // layer.closeAll('loading')
  return Promise.reject(error)
})

export default axios
