<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="800">
      <v-card>
        <v-card-title class="headline">Update User</v-card-title>
        <v-card-text>Please fill out the form below to update {{ user.displayName }}.</v-card-text>
        <v-container>
          <v-layout>
            <v-flex>
              <form>
                <v-text-field
                  v-model="email"
                  v-validate="'email'"
                  :error-messages="errors.collect('email')"
                  label="E-mail"
                  data-vv-name="email"
                ></v-text-field>
                <v-text-field
                  v-model="name"
                  v-validate="'max:50'"
                  :counter="50"
                  :error-messages="errors.collect('name')"
                  label="Name"
                  data-vv-name="name"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  v-validate="'max:25'"
                  :counter="25"
                  :error-messages="errors.collect('password')"
                  label="Password"
                  data-vv-name="password"
                  type="password"
                ></v-text-field>
                <v-checkbox
                  v-model="admin"
                  :error-messages="errors.collect('admin')"
                  value="1"
                  label="Admin"
                  data-vv-name="admin"
                  type="checkbox"
                ></v-checkbox>
                <v-btn class="mr-4" @click="submit">update</v-btn>
                <v-btn @click="clear">clear</v-btn>
              </form>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default Vue.extend({
  name: 'UpdateUserModal',
  data: () => ({
    dialog: false,
    email: '',
    name: '',
    password: '',
    admin: false,
    dictionary: {
      attributes: {
        email: 'E-mail Address',
      },
    },
  }),
  props: ['display', 'user', 'userId'],
  computed: {
    ...mapGetters(['isError', 'getError']),
    show() {
      return this.display;
    },
  },
  mounted() {
    this.$validator.localize('en', this.dictionary);
  },
  methods: {
    ...mapActions(['updateUser']),
    submit() {
      this.$validator.validate().then(valid => {
        if (valid) {
          interface UserData {
            admin: boolean | number;
            email: string;
            displayName: string;
            password: string;
          }
          const formData: UserData = {
            email: '',
            displayName: '',
            password: '',
            admin: 0,
          };
          if (this.email !== '') formData.email = this.email;
          if (this.name !== '') formData.displayName = this.name;
          if (this.password !== '') formData.password = this.password;
          if (this.admin === false) {
            formData.admin = 0;
          } else {
            formData.admin = 1;
          }
          this.$store.dispatch('updateUser', { id: this.userId, formData }).then(response => {
            if (response.status === 200) {
              this.$emit('close');
            }
          });
        }
      });
    },
    clear() {
      this.email = '';
      this.name = '';
      this.password = '';
      this.$validator.reset();
    },
    close() {
      this.$emit('close');
    },
  },
});
</script>
