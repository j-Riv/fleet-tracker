<template>
  <v-app id="register">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form>
                  <v-text-field
                    v-model="email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    label="E-mail"
                    data-vv-name="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="name"
                    v-validate="'required|max:50'"
                    :counter="50"
                    :error-messages="errors.collect('name')"
                    label="Name"
                    data-vv-name="name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    v-validate="'required|max:25'"
                    :counter="25"
                    :error-messages="errors.collect('password')"
                    label="Password"
                    data-vv-name="password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn class="mr-4" @click="submit">submit</v-btn>
                  <v-btn @click="clear">clear</v-btn>
                </form>
                <router-link class="login-link" to="/">Already have an account Signin</router-link>
              </v-card-text>
            </v-card>
            <p class="error-msg" v-if="isError">{{ getError }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default Vue.extend({
  name: 'Register',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      dictionary: {
        attributes: {
          email: 'E-mail Address',
        },
      },
    };
  },
  computed: mapGetters(['isError', 'getError']),
  mounted() {
    this.$validator.localize('en', this.dictionary);
  },
  methods: {
    ...mapActions(['signIn']),
    submit() {
      this.$validator.validate().then(valid => {
        if (valid) {
          const data = {
            email: this.email.toLowerCase(),
            displayName: this.name,
            password: this.password,
          };
          this.$store.dispatch('register', data);
        }
      });
    },
    clear() {
      this.email = '';
      this.name = '';
      this.password = '';
      this.$validator.reset();
    },
  },
});
</script>

<style lang="scss" scoped>
#register {
  .login-link {
    text-decoration: none;
    text-align: center;
  }
  .error-msg {
    text-align: center;
    color: #bc360a;
    margin: 10px auto;
    max-width: 200px;
  }
}
</style>
