import Axios from '../../http'
import _ from 'lodash'

var API = {
  getList: (options = {}) => { // 获取用户列表
    return Axios({
      method: 'GET',
      url: '/user/listpage.do',
      params: _.pick(options, ['pageSize', 'pageNo', 'name', 'sex'])
    })
  },
  editUser: (options = {}) => {  // 修改
    return Axios({
      method: 'POST',
      url: '/user/edit.do',
      data: options
    })
  },
  deleteUser: (options = {}) => { // 删除
    return Axios({
      method: 'GET',
      url: '/user/remove.do',
      params: _.pick(options, ['id'])
    })
  },
  deleteUserList: (options = {}) => { // 删除批量
    return Axios({
      method: 'GET',
      url: '/user/batchremove.do',
      params: options
    })
  },
  addUser: (options = {}) => { // 新增
    return Axios({
      method: 'POST',
      url: '/user/add.do',
      data: options
    })
  }
}

export default API
