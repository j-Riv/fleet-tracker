<template>
  <v-app id="login">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
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
                    v-model="password"
                    v-validate="'required|max:25'"
                    :counter="25"
                    :error-messages="errors.collect('password')"
                    label="Password"
                    data-vv-name="password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-checkbox
                    v-model="remember"
                    :error-messages="errors.collect('remember')"
                    value="1"
                    label="Remember Me"
                    data-vv-name="remember"
                    type="checkbox"
                  ></v-checkbox>
                  <v-btn class="mr-4" @click="submit">Login</v-btn>
                  <v-btn @click="clear">clear</v-btn>
                </form>
                <router-link class="login-link" to="/register">Don't have an account? Register</router-link>
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
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    remember: false,
    dictionary: {
      attributes: {
        email: 'E-mail Address',
      },
    },
  }),
  computed: mapGetters(['isError', 'getError', 'getEmail']),
  mounted() {
    this.$validator.localize('en', this.dictionary);
    // get and set saved email if it exists
    this.email = this.getEmail ? this.getEmail : '';
  },
  methods: {
    ...mapActions(['signIn']),
    submit() {
      // this.$validator.validateAll()
      this.$validator.validate().then(valid => {
        if (valid) {
          const data = {
            email: this.email.toLowerCase(),
            password: this.password,
            remember: this.remember,
          };
          this.$store.dispatch('signIn', data);
        }
      });
    },
    clear() {
      this.email = '';
      this.password = '';
      this.$validator.reset();
    },
  },
});
</script>

<style lang="scss">
#login {
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
