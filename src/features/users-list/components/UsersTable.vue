<template>
  <div :class="$style.usersListTable">
    <v-data-table
      :headers="headers"
      :items="users"
      itemKey="id"
      :itemsPerPage="5"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.role | getEnumLabel }}</td>
          <td>{{ item.email }}</td>
          <td>
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
import { UserRole } from '@/models';
import { usersStoreHelper } from '@/store/users';
import { DELETE_USER, LOGOUT } from '@/store/users/actions';
import { parseEnum } from '@/utils';

/**
 * Users list table component.
 *
 * @emits edit
 */
export default {
  name: 'UsersTable',
  filters: {
    /**
     * Get user role label.
     * @returns {String} User role.
     */
    getEnumLabel(value) {
      return parseEnum(value, UserRole);
    },
  },
  props: {
    /**
     * Users array to display in table.
     */
    users: { type: Array, required: true },
  },
  data: () => ({
    /**
     * Table headers.
     */
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Role', value: 'role' },
      { text: 'Email', value: 'email' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  computed: {
    ...usersStoreHelper.mapState(['currentUser']),
  },
  methods: {
    ...usersStoreHelper.mapActions({
      deleteUser: DELETE_USER,
      logout: LOGOUT,
    }),

    /**
     * Delete passed user from database.
     * @param {Object} item User to delete.
     */
    deleteItem(item) {
      this.deleteUser(item.id);
      if (this.currentUser.id === item.id) {
        this.logoutUser();
      }
    },

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
.usersListTable {
  width: 100%;
  max-width: 900px;
  margin: 10px auto;
}
</style>
