import Axios from '../../http'
import _ from 'lodash'

var baseUrl = 'app/'

var API = {
  getList: (options = {}) => { // 获取列表
    return Axios({
      method: 'GET',
      url: baseUrl + 'list.do',
      params: _.pick(options, ['type', 'name', 'pageNo', 'pageSize'])
    })
  }
}

export default API
