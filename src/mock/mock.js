import axios from 'axios'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
// MockAdapter是一个模拟后台get的请求，es6语法
import { LoginUsers, UsersList } from './data/user'
// 同样以LoginUsers, Users 的方式来接收，from的url
let _UsersList = UsersList

export default {
  /**
   * mock bootstrap
   */
  created () {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/test.do').reply(200, {
      code: '000000',
      message: '',
      result: _UsersList,
      status: 'OK'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 获取用户列表（分页）
    mock.onGet('/user/listpage.do').reply(config => {
      let { pageNo, name, pageSize, sex } = config.params
      console.log(config.params)
      let mockUsers = _UsersList.filter(user => {
        if (name && user.name.indexOf(name) === -1) {
          return false
        } else {
          if (sex && sex !== user.sex) return false
          return true
        }
      })
      let total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            userList: mockUsers
          }])
        }, 1000)
      })
    })

    // 删除用户
    mock.onGet('/user/remove.do').reply(config => {
      let { id } = config.params
      _UsersList = _UsersList.filter(u => u.id !== id)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    // 批量删除用户
    mock.onGet('/user/batchremove.do').reply(config => {
      let { ids } = config.params
      ids = ids.split(',')
      _UsersList = _UsersList.filter(u => !ids.includes(u.id))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }])
        }, 500)
      })
    })

    // 编辑用户
    mock.onPost('/user/edit.do').reply(config => {
      let { id, idCard, name, addr, age, birth, sex } = JSON.parse(config.data)
      _UsersList.some(u => {
        if (u.id === id) {
          u.idCard = idCard
          u.name = name
          u.addr = addr
          u.age = age
          u.birth = birth
          u.sex = sex
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }])
        }, 500)
      })
    })

    // 新增用户
    mock.onPost('/user/add.do').reply(config => {
      let { idCard, name, addr, age, birth, sex, desc } = JSON.parse(config.data)
      _UsersList.splice(0, 0, {
        id: Mock.Random.guid(),
        idCard: idCard,
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex,
        desc: desc
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }])
        }, 500)
      })
    })
  }
}
