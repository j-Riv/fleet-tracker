// dependencies
import { Commit, Dispatch } from 'vuex';
import axios from 'axios';
import hostname from './config';
import { RootState, UserState } from '../../types/rootState';
import { User } from '../../types/users';

// default state
const state: UserState = {
  dark: true,
  users: null,
};

const getters = {
  allUsers: (state: { users: User[] }) => state.users,
  getTheme: (state: { dark: boolean }) => state.dark,
};

const actions = {
  async getAllUsers({ commit, rootState }: { commit: Commit; rootState: RootState }) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.get(hostname + '/api/users/all', config);
      commit('setUsers', response.data.allUsers);
      return true;
    } catch (e) {
      commit('setUsers', null);
    }
  },
  async updateUser(
    { commit, dispatch, rootState }: { commit: Commit; dispatch: Dispatch; rootState: RootState },
    data
  ) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.post(hostname + '/api/user/update/' + data.id, data.formData, config);
      if (response.status === 200) {
        dispatch('getAllUsers');
        return response;
      }
    } catch (e) {
      commit('setUsers', null);
    }
  },
  setTheme({ commit }: { commit: Commit }, theme: boolean) {
    commit('setThemeColor', theme);
  },
};

const mutations = {
  setUsers: (state: { users: User[] }, users: User[]) => (state.users = users),
  setThemeColor: (state: { dark: boolean }) => (state.dark = !state.dark),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
