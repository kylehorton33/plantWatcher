import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';

Vue.use(Vuex)
const API = "http://localhost:5000";

export default new Vuex.Store({
  state: {
    loadedPlants: [],
    loadedLogs: [],
    focusedPlantId: null,
    loading: false,
    editMode: false,
    singlePlant: null,
  },
  mutations: {
    setLoadedPlants (state, payload) {
      state.loadedPlants = payload
    },
    setSinglePlant (state, payload) {
      state.singlePlant = payload
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
    },
    enterEditMode (state) {
      state.editMode = true
    },
    exitEditMode (state) {
      state.editMode = false
    },
    deletePlant (state, payload) {
      state.loadedPlants = state.loadedPlants.filter((plant) => {
        return plant.uuid !== payload
      })
    },
    deleteLog (state, payload) {
      state.loadedLogs = state.loadedLogs.filter((log) => {
        return log.uuid !== payload
      })
    }
  },
  actions: {
    loadPlants ({commit}) {
      commit('setLoading', true)
      axios.get(API + '/plants')
        .then((res) => {
          commit('setLoadedPlants', res.data)
        })
        .catch((err) => console.log(err))
      commit('setLoading', false)
    },
    loadSinglePlant ({commit}, payload) {
      commit('setLoading', true)
      axios.get(API + '/plants/'+payload)
        .then((res) => {
          commit('setSinglePlant', res.data)
        })
        .catch((err) => console.log(err))
      commit('setLoading', false)
    },
    addPlant({commit}, payload) {
      const newPlant = {
        ...payload,
      }
      axios.post(API + '/plants', newPlant)
        .then((res) => {
          commit('createPlant', res.data )
        })
        .catch((err) => console.log(err))
    },
    deletePlant({commit}, payload) {
      axios.delete(API + '/plants/'+payload)
        .then(() => {
          commit('deletePlant', payload)
        })
        .catch((err) => console.log(err))
    },
    loadLogs ({commit}) {
      commit('setLoading', true)
      axios.get(API + '/logs')
        .then((res) => {
          commit('setLoadedLogs', res.data)
        })
        .catch((err) => console.log(err))
      
      commit('setLoading', false)
    },
    addLog({commit}, payload) {
      const newLog = {
        ...payload,
      }
      axios.post(API + '/logs', newLog)
        .then((res) => {
          commit('addLog', res.data)
        })
        .catch((err) => console.log(err))
    },
    deleteLog({commit}, payload) {
      axios.delete(API + '/logs/'+payload)
        .then(() => {
          commit('deleteLog', payload)
        })
        .catch((err) => console.log(err))
    },
  },
  getters: {
    loadedPlants (state) {
      return state.loadedPlants.sort((A, B) => {
        return A.updated_at < B.updated_at
      })
    },
    singlePlant (state) {
      return state.singlePlant
    },
    loadedPlant (state) {
      return (id) => {
        return state.loadedPlants.find((plant) => {
          return plant.uuid === id
        })
      }
    },
    singlePlantLogs (state) {
      return (id) => {
        const filtered_logs = state.loadedLogs.filter((log) => {
          return log.plant_id === id
        })
        return filtered_logs.sort((A, B) => {
          return A.timestamp < B.timestamp
        })
      }
    },
    focusedPlantId (state) {
      return state.focusedPlantId
    },
    editMode (state) {
      return state.editMode
    },
    user () {
      return 'kinglsey'
    },
  },
  modules: {
  }
})
