import Vue from 'vue'
import Vuex from 'vuex'

import { v4 as uuidv4 } from 'uuid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedPlants: [],
    loadedLogs: [],
    focusedPlantId: null,
    loading: false,
  },
  mutations: {
    setLoadedPlants (state, payload) {
      state.loadedPlants = payload
    },
    createPlant (state, payload) {
      state.loadedPlants.push(payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadedLogs (state, payload) {
      state.loadedLogs = payload
    },
    addLog (state, payload) {
      state.loadedLogs.push(payload)
    },
    setFocusedPlant (state, payload) {
      state.focusedPlantId = payload
    }
  },
  actions: {
    loadPlants ({commit}) {
      commit('setLoading', true)
      const PLANTS = [
        { id: '51a73e58-44e3-4756-a60c-597451dbb588',
          added_at: 1626140625,
          updated_at: 1626140625,
          name: 'hosta',
          location: 'inside',
          latest_pic: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F06%2F10%2Ffrancee-hosta-purple-flowers-562666cc.jpg'
        },
        { id: '6175de1d-d79e-4606-841a-77c3e7ba734f',
          added_at: 1626140640,
          updated_at: 1626140640,
          name: 'peace lily',
          location: 'inside',
          latest_pic: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Froadrunnerflorist.com%2Fwp-content%2Fuploads%2F2014%2F10%2Fpeace-lily-sept..jpg'
        },
        { id: '0d1ec9f6-a8aa-4065-bf3b-039a090e68cb',
          added_at: 1626040625,
          updated_at: 1626040625,
          name: 'aloe',
          location: 'inside',
          latest_pic: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0267%2F1299%2F7940%2Fproducts%2F1600974242_1200x1200.jpg'
        },
      ]
      commit('setLoadedPlants', PLANTS)
      commit('setLoading', false)
    },
    createPlant({commit, getters}, payload) {
      const plant = {
        name: payload.name,
        latest_pic: payload.latest_pic,
        location: payload.location,
        created_by: getters.user.id,
      }
      // api request to create on server
      const d = new Date()
      commit('createPlant', {
        ...plant,
        created_at: d.getTime(),
        updated_at: d.getTime(),
        id: uuidv4(),
      })
    },
    loadLogs ({commit}) {
      commit('setLoading', true)
      const LOGS = [
        { id: '51a73e58-44e3-4756-a60c-597451dbb588', timestamp: 12318973912, msg: 'Looking good!', icon: 'mdi-emoticon-happy' },
        { id: '51a73e58-44e3-4756-a60c-597451dbb588', timestamp: 23489283472, msg: 'Looking good!', icon: 'mdi-emoticon-happy' },
        { id: '0d1ec9f6-a8aa-4065-bf3b-039a090e68cb', timestamp: 34534534522, msg: 'Looking good!', icon: 'mdi-emoticon-happy' },
      ]
      commit('setLoadedLogs', LOGS)
      commit('setLoading', false)
    },
    addLog({commit}, payload) {
      const log = {
        ...payload,
        timestamp: new Date().getTime()
      }
      commit('addLog', log)
    },
    focusPlant({commit}, payload) {
      commit('setFocusedPlant', payload)
    }
  },
  getters: {
    loadedPlants (state) {
      return state.loadedPlants.sort((A, B) => {
        return A.updated_at < B.updated_at
      })
    },
    loadedPlant (state) {
      return (id) => {
        return state.loadedPlants.find((plant) => {
          return plant.id === id
        })
      }
    },
    singlePlantLogs (state) {
      return (id) => {
        const filtered_logs = state.loadedLogs.filter((log) => {
          return log.id === id
        })
        return filtered_logs.sort((A, B) => {
          return A.timestamp < B.timestamp
        })
      }
    },
    focusedPlantId (state) {
      return state.focusedPlantId
    },
    user () {
      return 'kinglsey'
    },
  },
  modules: {
  }
})
