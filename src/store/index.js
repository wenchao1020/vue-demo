import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  editApplyApp: {}, // 当前修改的应用申请
  rebuildImage: {}, // 当前需要重新构建的私有基础镜像
  editTemplate: {}, // 当前修改的应用模板
  editHost: {
    hostId: '',
    name: '',
    groups: '',
    ip: '',
    port: '',
    cpus: '',
    memTotal: '',
    description: ''
  } // 当前修改的主机
}

var getters = {
  editApplyApp: function (state) {
    return state.editApplyApp
  },
  rebuildImage: function (state) {
    return state.rebuildImage
  },
  editTemplate: function (state) {
    return state.editTemplate
  },
  editHost: function (state) {
    return state.editHost
  }
}

var mutations = {
  setEditApplyApp: function (state, editApplyApp) {
    state.editApplyApp = editApplyApp || {}
  },
  clearEditApplyApp: function (state) {
    state.editApplyApp = {}
  },
  setRebuildImage: function (state, rebuildImage) {
    state.rebuildImage = rebuildImage || {}
  },
  clearRebuildImage: function (state) {
    state.rebuildImage = {}
  },
  setEditTemplate: function (state, editTemplate) {
    state.editTemplate = editTemplate || {}
  },
  clearEditTemplate: function (state) {
    state.editTemplate = {}
  },
  setEditHost: function (state, editHost) {
    state.editHost = editHost || {}
  },
  clearEditHost: function (state) {
    state.editHost = {}
  }
}

var store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters
})
export default store
