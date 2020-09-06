<template>
  <div>
    <h1>Login page</h1>
    <v-form
      ref="form"
      :class="$style.loginForm"
      @submit.prevent="login"
    >
      <v-card elevation="0">
        <v-card-title>Sign in</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="[rules.required, rules.email]"
            @click="hideError"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[rules.required]"
            @click="hideError"
          />
          <span
            v-if="error"
            :class="$style.errorMessage"
          >Invalid email or password!</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            dark
            :class="$style.loginButton"
            type="submit"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { usersStoreHelper } from '@/store/users';
import { LOGIN } from '@/store/users/actions';
import { email, required } from '@/utils';

/**
 * Login page component.
 */
export default {
  name: 'LoginPage',
  data: () => ({
    /**
     * User email.
     */
    email: '',

    /**
     * Show error if user login failed.
     */
    error: false,

    /**
     * User password.
     */
    password: '',

    /**
     * Form inputs validation rules.
     */
    rules: {
      required,
      email,
    },
  }),
  computed: {
    ...usersStoreHelper.mapState(['currentUser']),

    /**
     * Url to redirect user after login.
     * @returns {String} Url.
     */
    redirectUrl() {
      return this.$route.params.redirect;
    },
  },
  methods: {
    ...usersStoreHelper.mapActions({
      loginUser: LOGIN,
    }),
    /**
     * Validate form, check user credentials and login.
     */
    login() {
      if (this.$refs.form.validate()) {
        this.loginUser({
          email: this.email,
          password: this.password,
        }).then(() => this.redirectLoggedUserOrShowError());
      }
    },

    /**
     * Redirect current user to homepage or show login failed error.
     */
    redirectLoggedUserOrShowError() {
      if (this.currentUser) {
        this.$router.push(this.redirectUrl || { name: 'root' }, null, () => {
          this.$router.push({ name: 'forbidden' });
        });
      } else {
        this.error = true;
      }
    },

    /**
     * Hide login failed error.
     */
    hideError() {
      this.error = false;
    },
  },
};
</script>

<style lang="scss" module>
.loginForm {
  margin: auto;
  width: 100%;
  max-width: 700px;
}

.loginButton {
  width: 100%;
  max-width: 300px;
}

.errorMessage {
  color: #ff0000;
}
</style>
