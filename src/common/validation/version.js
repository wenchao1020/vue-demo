var regex = /^\d{1,5}\.\d{1,5}(\.\d{1,10})?$/

export default function (rule, value, callback) {
  if (!value) {
    callback(new Error('请输入应用版本'))
  } else if (!regex.test(value)) {
    callback(new Error('应用版本号不合法'))
  } else {
    callback()
  }
}
