var regex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/

export default function (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入IP地址'))
  } else if (!regex.test(value)) {
    callback(new Error('IP地址不合法'))
  } else {
    callback()
  }
}
