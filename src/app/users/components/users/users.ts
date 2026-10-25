import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UsersService } from '../../services/users.service';
import { User, UserStatus } from '../../models/user.model';

@Component({
  selector: 'app-users',
  imports: [TableModule, Tag, Button, Menu],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  readonly #usersService = inject(UsersService);
  protected readonly users = this.#usersService.users;
  protected readonly selectedUser = signal<User | null>(null);

  protected readonly actionMenuItems: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        const user = this.selectedUser();
        if (user) {
          this.editUser(user);
        }
      }
    },
    {
      label: 'Borrar',
      icon: 'pi pi-trash',
      command: () => {
        const user = this.selectedUser();
        if (user) {
          this.deleteUser(user);
        }
      }
    }
  ];

  protected openRowMenu(event: MouseEvent, menu: Menu, user: User): void {
    this.selectedUser.set(user);
    menu.toggle(event);
  }

  protected editUser(user: User): void {
    console.log('Editar usuario:', user);
  }

  protected deleteUser(user: User): void {
    this.#usersService.deleteUser(user.id);
  }

  protected getSeverity(status: UserStatus): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warn';
      case 'inactive':
        return 'danger';
    }
  }
}

