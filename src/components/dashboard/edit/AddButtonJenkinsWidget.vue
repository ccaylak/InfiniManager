<template>
  <div>
    <!-- Add jenkins widget button -->
    <b-button variant="outline-light" v-b-modal.add-jenkins block>
      <span class="h4">Add jenkins widget</span>
    </b-button>
    <!-- Jenkins widget modal -->
    <b-modal id="add-jenkins" title="Add jenkins widget" centered hide-footer>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <!-- Title input -->
          <ValidationProvider
            name="Title"
            rules="required"
            v-slot="validationContext"
          >
            <b-input-group>
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><b-icon-tag-fill></b-icon-tag-fill
                ></span>
              </b-input-group-prepend>
              <b-form-input
                id="jenkins-title"
                placeholder="Title"
                type="text"
                v-model="jenkins.title"
                :state="getValidationState(validationContext)"
                aria-describedby="title-required"
              >
              </b-form-input>
              <b-form-invalid-feedback id="title-required">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </ValidationProvider>
          <!-- URL input -->
          <ValidationProvider
            name="Url"
            rules="required"
            v-slot="validationContext"
          >
            <b-input-group class="mt-3">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><b-icon-globe2></b-icon-globe2
                ></span>
              </b-input-group-prepend>
              <b-form-input
                id="jenkins-url"
                placeholder="URL"
                type="text"
                v-model="jenkins.url"
                :state="getValidationState(validationContext)"
                aria-describedby="url-required"
              >
              </b-form-input>
              <b-form-invalid-feedback id="url-required">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </ValidationProvider>
          <!-- Interval spinbutton -->
          <b-input-group class="mt-3">
            <b-input-group-prepend>
              <span class="input-group-text"
                ><b-icon-clock-fill></b-icon-clock-fill
              ></span>
            </b-input-group-prepend>
            <b-form-spinbutton
              id="jenkins-interval"
              v-model="jenkins.interval"
              min="1"
              max="60"
              placeholder="Interval in seconds"
            >
            </b-form-spinbutton>
          </b-input-group>
          <!-- Username input -->
          <ValidationProvider
            name="Username"
            rules="required"
            v-slot="validationContext"
          >
            <b-input-group class="mt-3">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><b-icon-person-fill></b-icon-person-fill
                ></span>
              </b-input-group-prepend>
              <b-form-input
                id="jenkins-username"
                type="text"
                v-model="jenkins.username"
                placeholder="Username"
                :state="getValidationState(validationContext)"
                aria-describedby="username-required"
              >
              </b-form-input>
              <b-form-invalid-feedback id="username-required">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </ValidationProvider>
          <!-- Password input -->
          <ValidationProvider
            name="Password"
            rules="required"
            v-slot="validationContext"
          >
            <b-input-group class="mt-3">
              <b-input-group-prepend>
                <span class="input-group-text"
                  ><b-icon-key-fill></b-icon-key-fill
                ></span>
              </b-input-group-prepend>
              <b-form-input
                id="jenkins-password"
                type="password"
                placeholder="Password"
                v-model="jenkins.password"
                :state="getValidationState(validationContext)"
                aria-describedby="password-required"
              >
              </b-form-input>
              <b-form-invalid-feedback id="password-required">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-input-group>
          </ValidationProvider>
          <!-- Ssl verification radiobutton -->
          <b-form-group class="text-center" label="SSL Verification?">
            <b-form-radio-group v-model="jenkins.selected" name="some-radios">
              <b-form-radio value="yes">Yes</b-form-radio>
              <b-form-radio value="no">No</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <!-- Submit button -->
          <b-button class="mt-3" type="submit" block>
            <span v-if="!loading">Create jenkins widget</span>
            <b-spinner
              v-if="loading"
              class="justify-content-center"
              label="Loading.."
              variant="light"
              small
            ></b-spinner>
          </b-button>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AddButtonJenkinsWidget",
  data() {
    return {
      jenkins: {
        selected: "no",
        title: "",
        interval: 1,
        url: "",
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return 0;
        }
      });
      this.loading = true;
      await this.$store.dispatch("addJenkins", {
        slug: this.$route.params.slug,
        jenkins: this.jenkins
      });
      this.loading = false;
      this.$nextTick(() => {
        this.$refs.form.reset();
        this.$bvModal.hide("add-jenkins");
        this.clearInput(this.jenkins);
      });
    }
  }
};
</script>
