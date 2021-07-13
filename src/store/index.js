import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedPlants: [],
    loading: false,
  },
  mutations: {
    setLoadedPlants (state, payload) {
      state.loadedPlants = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
  },
  actions: {
    loadPlants ({commit}) {
      commit('setLoading', true)
      const PLANTS = [
        {id: 1, name: 'hosta', latest_pic: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg'},
        {id: 2, name: 'rasta', latest_pic: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg'},
        {id: 3, name: 'basta', latest_pic: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg'},
      ]
      commit('setLoadedPlants', PLANTS)
      commit('setLoading', false)
    },
  },
  getters: {
    loadedPlants (state) {
      return state.loadedPlants.sort((A, B) => {
        return A.id > B.id
      })
    }
  },
  modules: {
  }
})
