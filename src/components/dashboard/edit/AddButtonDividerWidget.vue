<template>
  <div>
    <!-- Add divider widget button -->
    <b-button variant="outline-light" v-b-modal.add-divider block>
      <span class="h4">Add widget divider</span>
    </b-button>
    <!-- Divider widget modal -->
    <b-modal id="add-divider" title="Add divider" centered hide-footer>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <!-- Divider widget title -->
          <ValidationProvider
            name="Name"
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
                id="divider-title"
                placeholder="Title"
                type="text"
                v-model="divider.title"
                :state="getValidationState(validationContext)"
                aria-describedby="title-required"
              ></b-form-input>
              <b-form-invalid-feedback id="title-required">
                {{ validationContext.errors[0] }}</b-form-invalid-feedback
              >
            </b-input-group>
          </ValidationProvider>
          <!-- Divider widget description -->
          <b-input-group class="mt-3">
            <b-input-group-prepend>
              <span class="input-group-text"><b-icon-info></b-icon-info></span>
            </b-input-group-prepend>
            <b-form-input
              id="divider-description"
              placeholder="Optional description"
              type="text"
              v-model="divider.description"
            ></b-form-input
          ></b-input-group>
          <!-- Submit button -->
          <b-button class="mt-3" type="submit" block>
            <span v-if="!loading">Create widget divider</span>
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
  name: "AddButtonDividerWidget",
  data() {
    return {
      divider: {
        title: "",
        description: ""
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
      await this.$store.dispatch("addDivider", {
        slug: this.$route.params.slug,
        divider: this.divider
      });
      this.loading = true;
      this.$nextTick(() => {
        this.$refs.form.reset();
        this.$bvModal.hide("add-divider");
        this.clearInput(this.divider);
      });
    }
  }
};
</script>
