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
        path: "instant",
        name: "InstantView",
        component: () => import("../views/InstantView.vue"),
        meta: { title: "Instant Scripts", authReqired: true },
      },
      {
        path: "startup",
        name: "StartupView",
        component: () => import("../views/StartupView.vue"),
        meta: { title: "Startup Scripts", authReqired: true },
      },
      {
        path: "cron",
        name: "CronView",
        component: () => import("../views/CronView.vue"),
        meta: { title: "Cron Scripts", authReqired: true },
      },
      {
        path: "result",
        name: "ResultView",
        component: () => import("../views/ResultView.vue"),
        meta: { title: "Results", authReqired: true },
      },
      {
        path: "error",
        name: "ErrorView",
        component: () => import("../views/ErrorView.vue"),
        meta: { title: "Errors", authReqired: true },
      },
    ],
  },
] as RouteRecordRaw[];
