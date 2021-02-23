// dependencies
import { Commit } from 'vuex';
import axios from 'axios';
import router from '../../router';
import hostname from './config';
import { RootState, VehiclesState } from '../../types/rootState';
import { Vehicle } from '../../types/vehicle';
import { Images } from '../../types/records';

// default state
const state: VehiclesState = {
  allVehicles: null,
  currentVehicle: null,
  addVehicleMsg: null,
  loading: false,
  vehicleType: 'all',
};

const sendToLogin = rootState => {
  rootState.auth.authenticated = '';
  localStorage.removeItem('token');
  router.push('/');
};

const getters = {
  allVehicles: (state: { allVehicles: Vehicle[] }) => state.allVehicles,
  currentVehicle: (state: { currentVehicle: Vehicle }) => state.currentVehicle,
  getAddVehicleMsg: (state: { addVehicleMsg: string }) => state.addVehicleMsg,
  vehiclesLoading: (state: { loading: boolean }) => state.loading,
  getVehicleType: (state: { vehicleType: string }) => state.vehicleType,
};

const actions = {
  async getVehicles({ commit, rootState }: { commit: Commit; rootState: RootState }) {
    commit('setVehiclesLoading', true);
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.get(hostname + '/api/vehicles/all', config);
      commit('setVehicles', response.data.allVehicles);
      setTimeout(() => {
        commit('setVehiclesLoading', false);
      }, 500);
    } catch (e) {
      commit('setVehicles', null);
      commit('setVehiclesLoading', false);
      sendToLogin(rootState);
    }
  },
  async addVehicle({ commit, rootState }: { commit: Commit; rootState: RootState }, data: Vehicle) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
      },
    };
    try {
      const response = await axios.post(hostname + '/api/vehicles/add', data, config);
      if (response.status === 201) {
        commit('setAddVehicleMsg', 'Vehicle Added');
      }
      return response;
    } catch (e) {
      commit('setAddVehicleMsg', 'Something went wrong.');
      sendToLogin(rootState);
    }
  },
  async getVehicle({ commit, rootState }: { commit: Commit; rootState: RootState }, id: string) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.get(hostname + '/api/vehicles/' + id, config);
      commit('setCurrentVehicle', response.data.vehicle);
      return true;
    } catch (e) {
      commit('setCurrentVehicle', null);
      sendToLogin(rootState);
    }
  },
  async getVehiclesByType({ commit, rootState }: { commit: Commit; rootState: RootState }, type: string) {
    commit('setVehiclesLoading', true);
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.get(hostname + '/api/vehicles/type/' + type, config);
      commit('setVehicleType', type);
      commit('setVehicles', response.data.vehicles);
      setTimeout(() => {
        commit('setVehiclesLoading', false);
      }, 500);
    } catch (e) {
      commit('setVehicles', null);
      commit('setVehiclesLoading', false);
      sendToLogin(rootState);
    }
  },
  async updateVehicle(
    { commit, rootState }: { commit: Commit; rootState: RootState },
    data: { id: string; vehicle_data: Vehicle }
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
      },
    };
    try {
      const response = await axios.put(hostname + '/api/vehicle/update/' + data.id, data.vehicle_data, config);
      if (response.status === 200) {
        commit('setAddVehicleMsg', response.data);
      }
      return response;
    } catch (e) {
      commit('setAddVehicleMsg', 'Something went wrong.');
      sendToLogin(rootState);
    }
  },
  async updateDefaultImage(
    { commit, rootState }: { commit: Commit; rootState: RootState },
    data: { id: string; formData: unknown }
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
      },
    };
    try {
      const response = await axios.put(hostname + '/api/vehicle/image/update/' + data.id, data.formData, config);
      if (response.status === 200) {
        commit('setAddVehicleMsg', response.data);
      }
      return response;
    } catch (e) {
      commit('setAddVehicleMsg', 'Something went wrong.');
      sendToLogin(rootState);
    }
  },
  async updatePinkSlip(
    { commit, rootState }: { commit: Commit; rootState: RootState },
    data: { id: string; formData: unknown }
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
      },
    };
    try {
      const response = await axios.put(hostname + '/api/vehicle/pinkslip/update/' + data.id, data.formData, config);
      if (response.status === 200) {
        commit('setAddVehicleMsg', response.data);
      }
      return response;
    } catch (e) {
      commit('setAddVehicleMsg', 'Something went wrong.');
      sendToLogin(rootState);
    }
  },
  selectVehicle({ commit, rootState }: { commit: Commit; rootState: RootState }, data: Vehicle) {
    try {
      commit('setCurrentVehicle', data);
    } catch (e) {
      sendToLogin(rootState);
    }
  },
  clearVehicleMsg({ commit, rootState }: { commit: Commit; rootState: RootState }) {
    try {
      commit('setAddVehicleMsg', null);
    } catch (e) {
      sendToLogin(rootState);
    }
  },
  async uploadImages(
    { commit, rootState }: { commit: Commit; rootState: RootState },
    data: {
      id: string;
      formData: Images;
    }
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post(hostname + '/api/vehicles/images/' + data.id, data.formData, config);
      if (response.status === 201) {
        commit('setAddVehicleMsg', 'Images Added');
      }
      return response;
    } catch (e) {
      commit('setAddVehicleMsg', 'Something went wrong.');
      sendToLogin(rootState);
    }
  },
};

const mutations = {
  setVehicleType: (state: { vehicleType: string }, vehicleType: string) => (state.vehicleType = vehicleType),
  setVehicles: (state: { allVehicles: Vehicle[] }, vehicles: Vehicle[]) => (state.allVehicles = vehicles),
  setCurrentVehicle: (state: { currentVehicle: Vehicle }, vehicle: Vehicle) => (state.currentVehicle = vehicle),
  setAddVehicleMsg: (state: { addVehicleMsg: string }, msg: string) => (state.addVehicleMsg = msg),
  setVehiclesLoading: (state: { loading: boolean }, loading: boolean) => (state.loading = loading),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
