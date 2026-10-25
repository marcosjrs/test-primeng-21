import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UsersService } from '../../services/users.service';
import { User, UserStatus } from '../../models/user.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-users',
  imports: [TableModule, Tag, Button, Menu, ConfirmDialogComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  readonly #usersService = inject(UsersService);
  readonly #router = inject(Router);
  private readonly confirmDialog = viewChild<ConfirmDialogComponent<User>>(ConfirmDialogComponent);

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
          this.requestDelete(user);
        }
      }
    }
  ];

  protected openRowMenu(event: MouseEvent, menu: Menu, user: User): void {
    this.selectedUser.set(user);
    menu.toggle(event);
  }

  protected editUser(user: User): void {
    this.#router.navigate(['/users', user.id, 'edit']);
  }

  protected requestDelete(user: User): void {
    this.confirmDialog()?.confirm(user, {
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario "${user.name}"? Esta acción no se puede deshacer.`,
      acceptLabel: 'Sí, eliminar',
      acceptSeverity: 'danger'
    });
  }

  protected deleteUser(user: User | unknown): void {
    if (user && typeof user === 'object' && 'id' in user) {
      this.#usersService.deleteUser((user as User).id);
    }
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

