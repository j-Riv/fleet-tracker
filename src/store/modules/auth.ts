// dependencies
import { Commit } from 'vuex';
import axios from 'axios';
import router from '../../router';
import hostname from './config';
import { RootState, AuthState } from '../../types/rootState';

// default state
const state: AuthState = {
  email: localStorage.getItem('rememberEmail'),
  authenticated: localStorage.getItem('token'),
  errorMessage: null,
  error: false,
  message: null,
  googleAuth: false,
  user: null,
  admin: false,
};

const getters = {
  getEmail: (state: { email: string }) => state.email,
  isAuth: (state: { authenticated: string }) => state.authenticated,
  getError: (state: { errorMessage: string }) => state.errorMessage,
  isError: (state: { error: boolean }) => state.error,
  getMessage: (state: { message: string }) => state.message,
  isGoogleAuth: (state: { googleAuth: boolean }) => state.googleAuth,
  currentUser: (state: { user: string }) => state.user,
  isAdmin: (state: { admin: boolean }) => state.admin,
};

const actions = {
  async register({ commit }: { commit: Commit }, formData: { email: string; name: string; password: string }) {
    try {
      const response = await axios.post(hostname + '/api/register', formData);
      if (response.status === 200) {
        commit('setMessage', 'User Created');
        router.push('/');
      }
    } catch (e) {
      commit('setError', 'Email in use');
      commit('showError', true);
    }
  },
  async signIn({ commit }: { commit: Commit }, formData: { email: string; password: string; remember: boolean }) {
    const data = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post(hostname + '/api/signin', data);
      commit('setAuth', response.data.token);
      localStorage.setItem('token', response.data.token);
      commit('setCurrentUser', response.data.user);
      commit('setAdmin', response.data.user.admin);
      if (formData.remember) {
        localStorage.setItem('rememberEmail', formData.email);
      }
      router.push('/vehicles');
    } catch (e) {
      commit('setError', 'Invalid login credentials');
      commit('showError', true);
    }
  },
  async getCurrentUser({ commit, rootState }: { commit: Commit; rootState: RootState }) {
    const token = rootState.auth.authenticated;
    const config = {
      headers: { authorization: token },
    };
    try {
      const response = await axios.post(hostname + '/api/user', { token }, config);
      const user = response.data.currentUser;
      commit('setCurrentUser', user);
      commit('setAdmin', user.admin);
    } catch (e) {
      commit('setCurrentUser', null);
    }
  },
  signOut({ commit }: { commit: Commit }) {
    localStorage.removeItem('token');
    commit('setAuth', null);
    commit('setCurrentUser', null);
    commit('setAdmin', false);
    router.push('/');
  },
  authenticateUser({ commit }: { commit: Commit }, auth: boolean) {
    commit('setGoogleAuth', auth);
  },
};

const mutations = {
  setAuth: (state: { authenticated: string }, auth: string) => (state.authenticated = auth),
  setError: (state: { errorMessage: string }, error: string) => (state.errorMessage = error),
  showError: (state: { error: boolean }, visibility: boolean) => (state.error = visibility),
  setMessage: (state: { message: string }, msg: string) => (state.message = msg),
  setGoogleAuth: (state: { googleAuth: string }, auth: string) => (state.googleAuth = auth),
  setCurrentUser: (state: { user: string }, user: string) => (state.user = user),
  setAdmin: (state: { admin: boolean }, admin: boolean) => (state.admin = admin),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
