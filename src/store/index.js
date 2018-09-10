import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import seller from './modules/seller'
import task from './modules/task'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    seller,
    task
  },
  getters
})

export default store
