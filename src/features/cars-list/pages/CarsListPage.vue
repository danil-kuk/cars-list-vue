<template>
  <div class="cars-list">
    <h1>Cars list page</h1>
    <car-editor
      :showDialog="dialog"
      :itemToEdit="editedItem"
      @close="closeDialog"
    />
    <search-bar v-model="search" />
    <cars-table
      :cars="carsData"
      :search="search"
      @edit="editItem"
    />
    <template v-if="isAdmin">
      <v-row>
        <v-btn
          color="primary"
          :class="$style.addNewCarButton"
          type="button"
          @click="addNewCar"
        >
          New Item
        </v-btn>
      </v-row>
    </template>
  </div>
</template>

<script>
import { carsListStoreHelper } from '@/store/cars-list';
import { GET_CARS } from '@/store/cars-list/actions';
import { CARS_DATA } from '@/store/cars-list/getters';
import { usersStoreHelper } from '@/store/users';
import { IS_ADMIN } from '@/store/users/getters';

import CarEditor from '../components/CarEditor';
import CarsTable from '../components/CarsTable';
import SearchBar from '../components/SearchBar';

/**
 * Cars list page.
 */
export default {
  name: 'CarsListPage',
  components: {
    CarEditor,
    SearchBar,
    CarsTable,
  },

  data: () => ({
    /**
     * Keyword to search cars in list by.
     */
    search: '',

    /**
     * Is editor dialog window open.
     */
    dialog: false,

    /**
     * Item to edit in editor form.
     */
    editedItem: null,
  }),

  computed: {
    ...carsListStoreHelper.mapGetters({
      carsData: CARS_DATA,
    }),

    ...usersStoreHelper.mapGetters({
      isAdmin: IS_ADMIN,
    }),
  },

  mounted() {
    this.getCars();
  },

  methods: {
    ...carsListStoreHelper.mapActions({
      getCars: GET_CARS,
    }),

    /**
     * Set passed item as edited and open car editor dialog window.
     * @param {Object} item Item to edit
     */
    editItem(item) {
      this.editedItem = item;
      this.dialog = true;
    },

    /**
     * Set new car as edited and open car editor dialog window.
     */
    addNewCar() {
      this.editedItem = null;
      this.dialog = true;
    },

    /**
     * Close car editor dialog window.
     */
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" module>
.addNewCarButton {
  margin: auto;
  width: 100%;
  max-width: 400px;
}
</style>
