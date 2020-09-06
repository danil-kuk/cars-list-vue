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
            v-model="editedUser.name"
            label="Name"
            type="text"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="editedUser.email"
            label="Email"
            type="text"
            :rules="[rules.required]"
          />
          <v-select
            v-model="editedUser.role"
            :items="userRoles"
            label="User role"
            itemText="label"
            itemValue="value"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="editedUser.password"
            label="Password"
            type="password"
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
import { USER_ROLES } from '@/constants';
import { usersStoreHelper } from '@/store/users';
import { CREATE_NEW_USER, UPDATE_USER } from '@/store/users/actions';
import { required } from '@/utils';

/**
 * User editor component.
 *
 * @emits close
 */
export default {
  name: 'UserEditor',
  props: {
    /**
     * Item to edit. Is null by default.
     */
    itemToEdit: { type: [Object], default: () => null },

    /**
     * Is user editor form dialog opened.
     */
    showDialog: { type: Boolean, required: true },
  },
  data: () => ({
    /**
     * User roles array for select.
     */
    userRoles: USER_ROLES,

    /**
     * Form inputs validation rules.
     */
    rules: {
      required,
    },
  }),
  computed: {
    /**
     * Title of form depending on edited item (if it's new or not).
     * @returns {String} Form title.
     */
    formTitle() {
      return this.itemToEdit === null ? 'New user' : 'Edit user';
    },

    /**
     * Passed item to edit prop as new object.
     * @returns {Object} Edited user.
     */
    editedUser() {
      return { ...this.itemToEdit };
    },
  },
  methods: {
    ...usersStoreHelper.mapActions({
      createNewUser: CREATE_NEW_USER,
      updateUser: UPDATE_USER,
    }),

    /**
     * Validate form and send changes to database. Then dialog window will be closed.
     */
    save() {
      if (this.$refs.form.validate()) {
        this.sendChangesToDatabase(this.editedUser);
        this.close();
      }
    },

    /**
     * If passed item is new user it will be added to database.
     * If user has already existed it will upadate in database.
     * @param {Object} item User to create/update.
     */
    sendChangesToDatabase(item) {
      if (item.id) {
        this.updateUser(item);
      } else {
        this.createNewUser(item);
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
