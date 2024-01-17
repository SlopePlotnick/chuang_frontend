import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddFileView from "../views/AddFileView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserProfileView from "../views/UserProfileView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addfile",
    name: "addfile",
    component: AddFileView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/404",
    name: "404",
    component: NotFoundView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/userprofile",
    name: "userprofile",
    component: UserProfileView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
