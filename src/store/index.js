import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

Vue.use(Vuex)

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
        return plant.id !== payload
      })
    },
    deleteLog (state, payload) {
      state.loadedLogs = state.loadedLogs.filter((log) => {
        return log.id !== payload
      })
    }
  },
  actions: {
    loadPlants ({commit}) {
      commit('setLoading', true)
      axios.get('http://localhost:3000/plants')
        .then((res) => {
          commit('setLoadedPlants', res.data)
        })
        .catch((err) => console.log(err))
      commit('setLoading', false)
    },
    loadSinglePlant ({commit}, payload) {
      commit('setLoading', true)
      axios.get('http://localhost:3000/plants/'+payload)
        .then((res) => {
          commit('setSinglePlant', res.data)
        })
        .catch((err) => console.log(err))
      commit('setLoading', false)
    },
    addPlant({commit}, payload) {
      const newPlant = {
        ...payload,
        id: uuidv4(),
        added_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      }
      axios.post('http://localhost:3000/plants', newPlant)
        .then(() => {
          commit('createPlant', newPlant )
        })
        .catch((err) => console.log(err))
    },
    deletePlant({commit}, payload) {
      axios.delete('http://localhost:3000/plants/'+payload)
        .then(() => {
          commit('deletePlant', payload)
        })
        .catch((err) => console.log(err))
    },
    loadLogs ({commit}) {
      commit('setLoading', true)
      axios.get('http://localhost:3000/logs')
        .then((res) => {
          commit('setLoadedLogs', res.data)
        })
        .catch((err) => console.log(err))
      
      commit('setLoading', false)
    },
    addLog({commit}, payload) {
      const newLog = {
        ...payload,
        id: uuidv4(),
        timestamp: new Date().getTime()
      }
      axios.post('http://localhost:3000/logs', newLog)
        .then(() => {
          commit('addLog', newLog)
        })
        .catch((err) => console.log(err))
    },
    deleteLog({commit}, payload) {
      axios.delete('http://localhost:3000/logs/'+payload)
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
          return plant.id === id
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
