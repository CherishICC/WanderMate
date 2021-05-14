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
      component: () => import('./views/Profile.vue'),
    },
    {
      path: '/userprofile',
      name: 'userprofile',
      component: () => import('./views/UserProfile.vue'),
    },
    {
      path: '/guideprofile',
      name: 'guideprofile',
      component: () => import('./views/GuideProfile.vue'),
    },
    {
      path: '/admin',
      name: 'guide',
      component: () => import('./views/UserList.vue'),
    },
    {
      path: '/admin/:id',
      name: 'guide-details',
      component: () => import('./views/AdminUserEdit.vue'),
    },
    {
      path: '/adminprofile/:id',
      name: 'profile-details',
      component: () => import('./views/AdminProfileEdit.vue'),
    },
    {
      path: '/user/:id',
      name: 'user-profile-edit',
      component: () => import('./views/UserProfileEdit.vue'),
    },
    {
      path: '/guide/:id',
      name: 'guide-profile-edit',
      component: () => import('./views/GuideProfileEdit.vue'),
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: () => import('./views/AddUser.vue'),
    },
    {
      path: '/package',
      name: 'package',
      component: () => import('./views/PackageList.vue'),
    },
    {
      path: '/package/:id',
      name: 'package-details',
      component: () => import('./views/EditPackage.vue'),
    },
    {
      path: '/addPackage',
      name: 'addPackage',
      component: () => import('./views/AddPackage.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/PackageList.vue'),
    },
    {
      path: '/tours',
      name: 'tours',
      component: () => import('./views/tours.vue'),
    },
    {
      path: '/mytours',
      name: 'mytours',
      component: () => import('./views/mybooking.vue'),
    },
    {
      path: '/booking/:id',
      name: 'mytours-details',
      component: () => import('./views/Booking.vue'),
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('./views/UserChat.vue'),
    },
    {
      path: '/guidechat',
      name: 'guidechat',
      component: () => import('./views/GuideChat.vue'),
    },
    {
      path: '/review/:id',
      name: 'review',
      component: () => import('./views/Review.vue'),
    },
    {
      path: '/writeblog',
      name: 'writeblog',
      component: () => import('./views/writeblog.vue'),
    },
    {
      path: '/allblogs',
      name: 'allblogs',
      component: () => import('./views/Blog.vue'),
    },
  ],
});
