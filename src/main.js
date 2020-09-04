import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store/store";

import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, regex, email } from "vee-validate/dist/rules";

extend("required", required);
extend("regex", regex);
extend("email", email);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    clearInput(dataObject) {
      Object.keys(dataObject).forEach(input => {
        dataObject[input] = "";
      });
    }
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
