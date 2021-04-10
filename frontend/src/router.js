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
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue'),
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
      component: () => import('./views/User.vue'),
    },
    {
      path: '/addUser',
      name: 'addUser',
      // lazy-loaded
      component: () => import('./views/AddUser.vue'),
    },
    {
      path: '/package',
      name: 'package-details',
      // lazy-loaded
      component: () => import('./views/PackageList.vue'),
    },
    {
      path: '/package/:id',
      name: 'package',
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

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
