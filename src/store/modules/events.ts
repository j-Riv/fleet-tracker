// dependencies
import { Commit, Dispatch } from 'vuex';
import axios from 'axios';
import hostname from './config';
import { RootState, EventsState } from '../../types/rootState';
import { MaintenanceEvent, RepairEvent, Event, Files } from '../../types/records';

// default state
const state: EventsState = {
  event: null,
  data: null,
  eventLink: null,
  addEventMsg: null,
  maintenanceRecords: null,
  repairRecords: null,
  record: null,
  recordsLoading: false,
  loading: false,
  eventError: false,
};

const getters = {
  getEventData: (state: { event: MaintenanceEvent | RepairEvent }) => state.event,
  getItems: (state: { data: unknown }) => state.data,
  getEventLink: (state: { eventLink: string }) => state.eventLink,
  getAddEventMsg: (state: { addEventMsg: string }) => state.addEventMsg,
  getMaintenance: (state: { maintenanceRecords: MaintenanceEvent[] }) => state.maintenanceRecords,
  getRepairs: (state: { repairRecords: RepairEvent[] }) => state.repairRecords,
  currentRecord: (state: { record: RepairEvent | MaintenanceEvent }) => state.record,
  recordsLoading: (state: { loading: boolean }) => state.loading,
  isEventError: (state: { eventError: boolean }) => state.eventError,
};

const actions = {
  setEvent({ commit }: { commit: Commit }, data: MaintenanceEvent | RepairEvent) {
    commit('setEvent', data);
  },
  setData({ commit }: { commit: Commit }, data: unknown) {
    commit('setItems', data);
  },
  setEventLink({ commit, dispatch }: { commit: Commit; dispatch: Dispatch }, link: string) {
    commit('setLink', link);
    dispatch('eventError', false);
  },
  async getMaintainenceRecords({ commit, rootState }: { commit: Commit; rootState: RootState }) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.get(hostname + '/api/vehicles/events/maintenance/all', config);
      commit('setMaintenance', response.data.records);
    } catch (e) {
      commit('setMaintenance', null);
    }
  },
  async getRepairRecords({ commit, rootState }: { commit: Commit; rootState: RootState }) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.get(hostname + '/api/vehicles/events/repairs/all', config);
      commit('setRepair', response.data.records);
    } catch (e) {
      commit('setRepair', null);
    }
  },
  async getRecord({ commit, rootState }: { commit: Commit; rootState: RootState }, data: { id: string; type: string }) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.get(hostname + '/api/vehicles/events/' + data.type + '/id/' + data.id, config);
      commit('setRecord', response.data.record);
      return true;
    } catch (e) {
      commit('setRecord', null);
    }
  },
  async createEvent(
    { commit, dispatch, rootState }: { commit: Commit; dispatch: Dispatch; rootState: RootState },
    data: Event
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
      },
    };
    // check event type
    let url;
    if (data.type === 'Maintenance') {
      url = hostname + '/api/vehicles/events/maintenance/create';
    } else {
      url = hostname + '/api/vehicles/events/repairs/create';
    }
    try {
      const response = await axios.post(url, data, config);
      if (response.status === 201) {
        commit('setAddEventMsg', 'Event Added to DB');
        dispatch('getVehicle', data.vehicle_id);
      }
      return response;
    } catch (e) {
      commit('setAddEventMsg', 'Something went wrong.');
    }
  },
  async updateEvent(
    { commit, rootState }: { commit: Commit; rootState: RootState },
    data: { type: string; id: string; formData: Event }
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
      },
    };
    try {
      const response = await axios.put(
        hostname + '/api/vehicles/events/' + data.type + '/update/' + data.id,
        data.formData,
        config
      );
      if (response.status === 200) {
        commit('setAddEventMsg', 'Event Updated');
      }
      return response;
    } catch (e) {
      commit('setAddEventMsg', 'Something went wrong.');
    }
  },
  async uploadFiles(
    { commit, rootState }: { commit: Commit; rootState: RootState },
    data: { type: string; id: string; formData: Files }
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: {
        authorization: token,
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post(
        hostname + '/api/vehicles/events/' + data.type + '/files/' + data.id,
        data.formData,
        config
      );
      if (response.status === 201) {
        commit('setAddVehicleMsg', 'Images Added');
      }
      return response;
    } catch (e) {
      commit('setAddVehicleMsg', 'Something went wrong.');
    }
  },
  eventError({ commit }: { commit: Commit }, error: boolean) {
    commit('setEventError', error);
  },
  resetEvent({ commit }: { commit: Commit }) {
    commit('setAddEventMsg', null);
    commit('setLink', null);
  },
};

const mutations = {
  setEvent: (state: { event: MaintenanceEvent | RepairEvent }, event: MaintenanceEvent | RepairEvent) =>
    (state.event = event),
  setItems: (state: { data: unknown }, data: unknown) => (state.data = data),
  setLink: (state: { eventLink: string }, link: string) => (state.eventLink = link),
  setAddEventMsg: (state: { addEventMsg: string }, msg: string) => (state.addEventMsg = msg),
  setMaintenance: (state: { maintenanceRecords: MaintenanceEvent[] }, records: MaintenanceEvent[]) =>
    (state.maintenanceRecords = records),
  setRepair: (state: { repairRecords: RepairEvent[] }, records: RepairEvent[]) => (state.repairRecords = records),
  setRecord: (state: { record: MaintenanceEvent | RepairEvent }, record: MaintenanceEvent | RepairEvent) =>
    (state.record = record),
  setRecordsLoading: (state: { loading: boolean }, loading: boolean) => (state.loading = loading),
  setEventError: (state: { eventError: boolean }, error: boolean) => (state.eventError = error),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
