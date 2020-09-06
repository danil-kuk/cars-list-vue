<template>
  <v-app id="app">
    <app-navigation-toolbar />
    <router-view />
  </v-app>
</template>

<script>
import AppNavigationToolbar from '@/components/AppNavigationToolbar';

/** Vue App component. */
export default {
  components: {
    AppNavigationToolbar,
  },
};
</script>
