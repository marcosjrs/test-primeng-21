import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/pages/users-list/users-list').then((m) => m.UsersListComponent)
  },
  {
    path: 'users/:id/edit',
    loadComponent: () =>
      import('./users/pages/user-edit/user-edit').then((m) => m.UserEditPage)
  }
];
