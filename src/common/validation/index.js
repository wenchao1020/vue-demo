/* 身份证号 */

export function idCardReg (rule, value, callback) {
  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  if (value.length === 0) {
    callback(new Error('身份证号码不能为空'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}
