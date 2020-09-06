<template>
  <div>
    <h2>Looks like you don't have permission to access this route :(</h2>
    <v-row>
      <v-btn
        :class="$style.returnButton"
        type="button"
        @click="returnToHomepage"
      >
        Return to Homepage
      </v-btn>
    </v-row>
  </div>
</template>

<script>
/**
 * Page to display if user tried to access forbidden route.
 */
export default {
  name: 'ForbiddenRoutePage',
  methods: {
    /**
     * Redirect user to homepage.
     */
    returnToHomepage() {
      this.$router.push({ name: 'root' });
    },
  },
};
</script>

<style lang="scss" module>
.returnButton {
  margin: auto;
  width: 100%;
  max-width: 400px;
}
</style>
