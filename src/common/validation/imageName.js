var regex = /^(?!.*--.*)[a-z][a-z0-9-]{0,31}$/

export default function (rule, value, callback) {
  if (!value) {
    callback(new Error('请填写镜像名称'))
  } else if (!regex.test(value)) {
    callback(new Error('镜像名称格式错误'))
  } else {
    callback()
  }
}
