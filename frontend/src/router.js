import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      alias: "/guides",
      name: "guides",
      component: () => import("./components/GuidesList")
    },
    {
      path: "/guides/:id",
      name: "guides-details",
      component: () => import("./components/Guide")
    },
    {
      path: "/add-guide",
      name: "add-guide",
      component: () => import("./components/AddGuide")
    },
    {
        path: "/users",
        name: "users",
        component: () => import("./components/UsersList")
    },
    {
        path: "/users/:id",
        name: "users-details",
        component: () => import("./components/User")
      }
  ]
});
