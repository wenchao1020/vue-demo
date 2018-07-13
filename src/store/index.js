import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  userList: [] // 用户列表
}

var getters = {
  getUserList: state => state.userList
}

var mutations = {
  setUserList: function (state, list) {
    state.userList = [...list]
  }
}

var store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
export default store
