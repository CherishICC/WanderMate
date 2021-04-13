import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/adminprofile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/userprofile',
      name: 'userprofile',
      // lazy-loaded
      component: () => import('./views/UserProfile.vue'),
    },
    {
      path: '/guideprofile',
      name: 'guideprofile',
      // lazy-loaded
      component: () => import('./views/GuideProfile.vue'),
    },
    {
      path: '/admin',
      name: 'guide',
      // lazy-loaded
      component: () => import('./views/UserList.vue'),
    },
    {
      path: '/admin/:id',
      name: 'guide-details',
      // lazy-loaded
      component: () => import('./views/AdminUserEdit.vue'),
    },
    {
      path: '/adminprofile/:id',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/AdminProfileEdit.vue'),
    },
    {
      path: '/user/:id',
      name: 'user-profile-edit',
      // lazy-loaded
      component: () => import('./views/UserProfileEdit.vue'),
    },
    {
      path: '/guide/:id',
      name: 'guide-profile-edit',
      // lazy-loaded
      component: () => import('./views/GuideProfileEdit.vue'),
    },
    {
      path: '/addUser',
      name: 'addUser',
      // lazy-loaded
      component: () => import('./views/AddUser.vue'),
    },
    {
      path: '/package',
      name: 'package',
      // lazy-loaded
      component: () => import('./views/PackageList.vue'),
    },
    {
      path: '/package/:id',
      name: 'package-details',
      // lazy-loaded
      component: () => import('./views/EditPackage.vue'),
    },
    {
      path: '/addPackage',
      name: 'addPackage',
      // lazy-loaded
      component: () => import('./views/AddPackage.vue'),
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/PackageList.vue'),
    },
    {
      path: '/tours',
      name: 'tours',
      // lazy-loaded
      component: () => import('./views/tours.vue'),
    },
    {
      path: '/mytours',
      name: 'mytours',
      // lazy-loaded
      component: () => import('./views/mybooking.vue'),
    },
    {
      path: '/booking/:id',
      name: 'mytours-details',
      // lazy-loaded
      component: () => import('./views/Booking.vue'),
    },
    {
      path: '/writeblog',
      name: 'writeblog',
      // lazy-loaded
      component: () => import('./views/writeblog.vue'),
    },
    {
      path: '/allblogs',
      name: 'allblogs',
      // lazy-loaded
      component: () => import('./views/Blog.vue'),
    },
  ],
});
