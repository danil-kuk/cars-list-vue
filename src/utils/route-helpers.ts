import { NavigationGuardNext, Route } from 'vue-router';

import { UserRole } from '@/models';
import { users, UsersState } from '@/store/users';

/**
 * Check if user has permission to access route.
 * @param to Route user is trying to access.
 */
export function checkUserPermission(to: Route, __: Route, next: NavigationGuardNext<Vue>): void {
  const state = users.state as UsersState;
  const currentUser = state.currentUser;
  if (!currentUser) {
    next({
      name: 'login',
      params: {
        redirect: to.path,
      },
    });
  } else if (currentUser && currentUser.role === UserRole.Admin) {
    next();
  } else {
    next({ name: 'forbidden' });
  }
}

/**
 * Prevent logged user access to login page.
 * If user is already logged redirect him to homepage.
 */
export function checkUserLogin(_: Route, __: Route, next: NavigationGuardNext<Vue>): void {
  const state = users.state as UsersState;
  if (state.currentUser) {
    next({ name: 'root' });
  } else {
    next();
  }
}
