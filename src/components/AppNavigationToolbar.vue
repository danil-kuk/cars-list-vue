<template>
  <nav>
    <v-toolbar>
      <router-link
        :to="{ name: 'root' }"
        :class="$style.toolbarTitle"
      >
        <v-toolbar-title>Vue app</v-toolbar-title>
      </router-link>
      <v-spacer />
      <span
        v-if="currentUserName"
        :class="$style.helloMessage"
      > Hello, {{ currentUserName }} </span>

      <v-btn
        :to="{ name: 'cars' }"
        text
        type="button"
      >
        Cars
      </v-btn>
      <v-btn
        v-if="isAdmin"
        :to="{ name: 'users' }"
        text
        type="button"
      >
        Users
      </v-btn>
      <v-btn
        v-if="!currentUserName"
        :to="{ name: 'login' }"
        text
        color="primary"
        type="button"
      >
        Login
      </v-btn>
      <v-btn
        v-else
        text
        color="primary"
        type="button"
        @click="logoutUser"
      >
        Logout
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import { usersStoreHelper } from '@/store/users';
import { LOGOUT } from '@/store/users/actions';
import { IS_ADMIN } from '@/store/users/getters';

/**
 * App navigation toolbar.
 */
export default {
  name: 'AppNavigationToolbar',
  computed: {
    ...usersStoreHelper.mapState(['currentUser']),
    ...usersStoreHelper.mapGetters({
      isAdmin: IS_ADMIN,
    }),

    /**
     * Get current user name.
     */
    currentUserName() {
      if (!this.currentUser) {
        return '';
      }
      return this.currentUser.name;
    },
  },
  methods: {
    ...usersStoreHelper.mapActions({
      logout: LOGOUT,
    }),

    /**
     * Logout user and redirect to Homepage.
     */
    logoutUser() {
      this.logout();
      this.$router.push({ name: 'root' });
    },
  },
};
</script>

<style lang="scss" module>
.toolbarTitle {
  text-decoration: none;
}

.helloMessage {
  margin-right: 1rem;
}
</style>
