import Vue from 'vue';
import VueRouter from 'vue-router';
import { requireAuth, requireAuthAdmin, isLoggedOut } from '../utils/auth';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      beforeEnter: isLoggedOut,
      meta: {
        auth: true,
        title: 'Login',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      beforeEnter: isLoggedOut,
      meta: {
        auth: true,
        title: 'Register',
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/Users.vue'),
      beforeEnter: requireAuthAdmin,
      meta: {
        auth: true,
        title: 'Users',
      },
    },
    {
      path: '/vehicles',
      name: 'All Vehicle',
      component: () => import('../views/Vehicles.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'All Vehicles',
      },
    },
    {
      path: '/vehicles/:vehicleId',
      name: 'View Vehicle',
      component: () => import('../views/Vehicle.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'Vehicle',
      },
    },
    {
      path: '/vehicles/edit/:vehicleId',
      name: 'Edit Vehicle',
      component: () => import('../views/UpdateVehicle.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'Edit Vehicle',
      },
    },
    {
      path: '/vehicles/:vehicleId/event/create',
      name: 'Create Event',
      component: () => import('../views/EventCreate.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'Create Event',
      },
    },
    {
      path: '/vehicles/:vehicleId/maintenance/all',
      name: 'All Maintenance',
      component: () => import('../views/Maintenance.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'All Maintenance',
      },
    },
    {
      path: '/vehicles/:vehicleId/repairs/all',
      name: 'All Repairs',
      component: () => import('../views/Repairs.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'All Repairs',
      },
    },
    {
      path: '/vehicles/:vehicleId/maintenance/record/:recordId',
      name: 'Maintenance Record',
      component: () => import('../views/MaintenanceRecord.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'Maintenance Record',
      },
    },
    {
      path: '/vehicles/:vehicleId/repairs/record/:recordId',
      name: 'Repair Record',
      component: () => import('../views/RepairRecord.vue'),
      beforeEnter: requireAuth,
      meta: {
        auth: true,
        title: 'Repair Record',
      },
    },
    {
      path: '/policy',
      name: 'Privacy Policy',
      component: () => import('../views/Policy.vue'),
      meta: {
        auth: true,
        title: 'Privacy Policy',
      },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Calendar.vue'),
      meta: {
        auth: true,
        title: 'Calendar',
      },
    },
    {
      path: '/*',
      name: 'Everything Else',
      component: () => import('../views/Vehicles.vue'),
      meta: {
        auth: true,
        title: 'All Vehicles',
      },
    },
  ],
});
