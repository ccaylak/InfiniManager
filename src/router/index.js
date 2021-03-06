import Vue from "vue";
import VueRouter from "vue-router";
import TheDashboardList from "@/components/dashboard/list/TheDashboardList";
import EditDashboardItem from "@/components/dashboard/edit/EditDashboardListItem";
import TheLogin from "@/components/header/TheLogin";
import PageNotFound from "@/components/PageNotFound";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: TheDashboardList },
  { path: "/dashboard/:slug", component: EditDashboardItem },
  { path: "/login", component: TheLogin },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
