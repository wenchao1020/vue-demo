import Mock from 'mockjs'
import store from '@/store'
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: 'password',
    name: '管理员'
  }
]

const UsersList = []

for (let i = 0; i < 26; i++) {
  UsersList.push(Mock.mock({
    id: Mock.Random.guid(),
    idCard: Mock.Random.id(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    sex: Mock.Random.string('01', 1),
    desc: Mock.Random.cparagraph(2),
    birth: function () {
      return `${this.idCard.substring(6, 10)}-${this.idCard.substring(10, 12)}-${this.idCard.substring(12, 14)}`
    }
  }))
}
store.commit('setUserList', UsersList)

export { LoginUsers, UsersList }
