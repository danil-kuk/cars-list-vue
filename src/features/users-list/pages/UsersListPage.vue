<template>
  <div class="users-list">
    <h1>Users list page</h1>
    <user-editor
      :showDialog="dialog"
      :itemToEdit="editedItem"
      @close="closeDialog"
    />
    <users-table
      :users="usersData"
      @edit="editItem"
    />
    <v-row>
      <v-btn
        color="primary"
        :class="$style.addNewUserButton"
        type="button"
        @click="addNewUser"
      >
        New User
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { usersStoreHelper } from '@/store/users';
import { GET_USERS } from '@/store/users/actions';
import { USERS_DATA } from '@/store/users/getters';

import UserEditor from '../components/UserEditor';
import UsersTable from '../components/UsersTable';

/**
 * Users list page.
 */
export default {
  name: 'UsersListPage',
  components: {
    UserEditor,
    UsersTable,
  },

  data: () => ({
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
    ...usersStoreHelper.mapGetters({
      usersData: USERS_DATA,
    }),
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    ...usersStoreHelper.mapActions({
      getUsers: GET_USERS,
    }),

    /**
     * Set passed item as edited and open user editor dialog window.
     * @param {Object} item Item to edit.
     */
    editItem(item) {
      this.editedItem = item;
      this.dialog = true;
    },

    /**
     * Set new user as edited and open user editor dialog window.
     */
    addNewUser() {
      this.editedItem = null;
      this.dialog = true;
    },

    /**
     * Close user editor dialog window.
     */
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" module>
.addNewUserButton {
  margin: auto;
  width: 100%;
  max-width: 300px;
}
</style>
