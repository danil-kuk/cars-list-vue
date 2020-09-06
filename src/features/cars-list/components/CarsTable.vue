<template>
  <div :class="$style.carsListTable">
    <v-data-table
      :headers="filteredHeaders"
      :items="cars"
      itemKey="id"
      :itemsPerPage="5"
      :search="search"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.producer }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.bodyType | getEnumLabel }}</td>
          <td>{{ item.year }}</td>
          <td>{{ item.mileage }}</td>
          <td :title="item.description">
            {{ item.description }}
          </td>
          <td :title="item.created | toShortDateString">
            {{ item.created | toShortDateString }}
          </td>
          <td :title="item.updated | toShortDateString">
            {{ item.updated | toShortDateString }}
          </td>
          <td v-if="isAdmin">
            <v-icon
              small
              class="mr-2"
              @click="$emit('edit', item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { CarBodyType } from '@/models';
import { carsListStoreHelper } from '@/store/cars-list';
import { DELETE_CAR } from '@/store/cars-list/actions';
import { usersStoreHelper } from '@/store/users';
import { IS_ADMIN } from '@/store/users/getters';
import { dateToString, parseEnum } from '@/utils';

/**
 * Cars list table component.
 *
 * @emits edit
 */
export default {
  name: 'CarsTable',
  filters: {
    /**
     * Get car bodyType label.
     * @returns {String}
     */
    getEnumLabel(value) {
      return parseEnum(value, CarBodyType);
    },

    /**
     * Transform passed date to short date and time string.
     * @returns {String}
     */
    toShortDateString(value) {
      return dateToString(value);
    },
  },
  props: {
    /**
     * Cars array to display in table.
     */
    cars: { type: Array, required: true },

    /**
     * Keyword to search cars by.
     */
    search: { type: String, required: true },
  },
  data: () => ({
    /**
     * Table headers.
     */
    headers: [
      { text: 'Producer', value: 'producer' },
      { text: 'Model', value: 'model' },
      { text: 'Body type', value: 'bodyType' },
      { text: 'Year', value: 'year' },
      { text: 'Mileage', value: 'mileage' },
      { text: 'Description', value: 'description' },
      { text: 'Created', value: 'created' },
      { text: 'Updated', value: 'updated' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  computed: {
    ...usersStoreHelper.mapGetters({
      isAdmin: IS_ADMIN,
    }),

    /**
     * Change table headers depending on user role. Only Admin users can perform actions.
     */
    filteredHeaders() {
      if (!this.isAdmin) {
        return this.headers.filter((item) => item.value !== 'actions');
      } else return this.headers;
    },
  },
  methods: {
    ...carsListStoreHelper.mapActions({
      deleteCar: DELETE_CAR,
    }),

    /**
     * Delete passed car from database.
     * @param {Object} item Car to delete.
     */
    deleteItem(item) {
      this.deleteCar(item.id);
    },
  },
};
</script>

<style lang="scss" module>
.carsListTable {
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;

  & td {
    max-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
