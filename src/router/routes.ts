import type { RouteRecordRaw } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../layouts/Layout.vue"),
    meta: { title: "Base" },
    children: [
      {
        path: "",
        name: "HomeView",
        component: () => import("../views/HomeView.vue"),
        meta: { title: "Home" },
      },
      {
        path: "about",
        name: "AboutView",
        component: () => import("../views/AboutView.vue"),
        meta: { title: "About" },
      },
    ],
  },
  {
    path: "/app",
    name: "AppLayout",
    component: () => import("../layouts/AppLayout.vue"),
    meta: { title: "App" },
    children: [
      {
        path: "",
        name: "AppView",
        component: () => import("../views/AppView.vue"),
        meta: { title: "App Home", authReqired: true },
      },
      {
        path: "",
        name: "AppLoader",
        component: () => import("../views/AppLoader.vue"),
        meta: { title: "App Loader" },
      },
      {
        path: "task",
        name: "TasksView",
        component: () => import("../views/TasksView.vue"),
        meta: { title: "Scripts", authReqired: true },
      },
      {
        path: "result",
        name: "ResultView",
        component: () => import("../views/ResultView.vue"),
        meta: { title: "Results", authReqired: true },
      },
      {
        path: "ssh",
        name: "SSHView",
        component: () => import("../views/SSHView.vue"),
        meta: { title: "SSH", authReqired: true },
      },
    ],
  },
] as RouteRecordRaw[];
