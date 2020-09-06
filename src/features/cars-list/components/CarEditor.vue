<template>
  <v-dialog
    v-model="showDialog"
    maxWidth="600px"
    @click:outside="close"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ formTitle }}
        </span>
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent="save"
        >
          <v-text-field
            v-model="editedCar.producer"
            label="Producer"
            type="text"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="editedCar.model"
            label="Model"
            type="text"
            :rules="[rules.required]"
          />
          <v-select
            v-model="editedCar.bodyType"
            :items="carBodyTypes"
            label="Body type"
            itemText="label"
            itemValue="value"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="editedCar.year"
            label="Year"
            type="number"
            :min="minYear"
            :max="maxYear"
            :rules="[rules.required, rules.between(minYear, maxYear)]"
          />
          <v-text-field
            v-model="editedCar.mileage"
            label="Mileage"
            type="number"
            min="0"
            step="100"
            :rules="[rules.required, rules.nonNegative]"
          />
          <v-textarea
            v-model="editedCar.description"
            label="Description"
            :rules="[rules.required]"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              type="button"
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { CAR_BODY_TYPES, CarDefaults } from '@/constants';
import { carsListStoreHelper } from '@/store/cars-list';
import { CREATE_NEW_CAR, UPDATE_CAR } from '@/store/cars-list/actions';
import { between, nonNegative, required } from '@/utils';

/**
 * Car editor component.
 *
 * @emits close
 */
export default {
  name: 'CarEditor',
  props: {
    /**
     * Item to edit. Is null by default.
     */
    itemToEdit: { type: [Object], default: () => null },

    /**
     * Is car editor form dialog opened.
     */
    showDialog: { type: Boolean, required: true },
  },
  data: () => ({
    /**
     * Min year of car production.
     */
    minYear: CarDefaults.MIN_YEAR,

    /**
     * Max year of car production.
     */
    maxYear: CarDefaults.MAX_YEAR,

    /**
     * Car body types array for select.
     */
    carBodyTypes: CAR_BODY_TYPES,

    /**
     * Form inputs validation rules.
     */
    rules: {
      required,
      nonNegative,
      between,
    },
  }),
  computed: {
    /**
     * Title of form depending on edited item (if it's new or not).
     * @returns {String} Form title.
     */
    formTitle() {
      return this.itemToEdit === null ? 'New Item' : 'Edit Item';
    },

    /**
     * Passed item to edit prop as new object.
     * @returns {Object}
     */
    editedCar() {
      return { ...this.itemToEdit };
    },
  },
  methods: {
    ...carsListStoreHelper.mapActions({
      createNewCar: CREATE_NEW_CAR,
      updateCar: UPDATE_CAR,
    }),

    /**
     * Validate form and send changes to database. Then dialog window will be closed.
     */
    save() {
      if (this.$refs.form.validate()) {
        this.sendChangesToDatabase(this.editedCar);
        this.close();
      }
    },

    /**
     * If passed item is new car it will be added to database.
     * If car has already existed it will upadate in database.
     * @param {Object} item Car to create/update.
     */
    sendChangesToDatabase(item) {
      item.updated = new Date();
      if (item.created) {
        this.updateCar(item);
      } else {
        item.created = new Date();
        this.createNewCar(item);
      }
    },

    /**
     * Close dialog window and reset editor form.
     */
    close() {
      this.$refs.form.reset();
      this.$emit('close');
    },
  },
};
</script>
