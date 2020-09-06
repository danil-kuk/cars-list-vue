<template>
  <v-text-field
    v-model="keyword"
    appendIcon="mdi-magnify"
    label="Search"
    singleLine
    hideDetails
    :class="$style.searchBar"
  />
</template>

<script>
/**
 * Search bar component.
 *
 * @emits input
 */
export default {
  name: 'SearchBar',
  props: {
    /**
     * Searchbar input value.
     */
    value: { type: String, default: () => '' },
  },
  computed: {
    /**
     * Keyword to search by.
     */
    keyword: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" module>
.searchBar {
  width: 40%;
  margin: auto;
}
</style>
