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
    addPlant({commit}, payload) {
      commit('createPlant', {
        ...payload,
        id: uuidv4(),
        added_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      })
    },
    deletePlant({commit}, payload) {
      commit('deletePlant', payload)
    },
    createPlant({commit, getters}) {
      // plant data to server api - mock in state now
      const newPlant = getters.loadedPlant('new')
      newPlant.id = uuidv4()
      commit('createPlant', {
        ...newPlant,
        id: uuidv4(),
        added_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      })
      // clear plant id='new' data
      newPlant.id = 'new',
      newPlant.name = '',
      newPlant.updated_at = null,
      newPlant.location = '',
      newPlant.latest_pic = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZqqJYrgFspbx-gGFudtl4wHaHa%26pid%3DApi&f=1'
      // reset state
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
