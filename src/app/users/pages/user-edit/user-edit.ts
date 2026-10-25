import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { UserFormComponent } from '../../components/user-form/user-form';

@Component({
  selector: 'app-user-edit',
  imports: [UserFormComponent, Button],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditPage {
  readonly #usersService = inject(UsersService);
  readonly #router = inject(Router);

  // Inyectado automáticamente por withComponentInputBinding() desde la ruta /users/:id/edit
  readonly id = input<string>();

  protected readonly user = computed<User | null>(() => {
    const rawId = this.id();
    if (!rawId) {
      return null;
    }
    const numericId = Number(rawId);
    return isNaN(numericId) ? null : this.#usersService.getUserById(numericId) ?? null;
  });

  protected onSave(updatedUser: User): void {
    this.#usersService.updateUser(updatedUser);
    this.navigateBack();
  }

  protected onCancel(): void {
    this.navigateBack();
  }

  protected navigateBack(): void {
    this.#router.navigate(['/users']);
  }
}
