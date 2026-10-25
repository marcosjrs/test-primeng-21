import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { UsersService } from '../../services/users.service';
import { UserStatus } from '../../models/user.model';

@Component({
  selector: 'app-users',
  imports: [TableModule, Tag, Button],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  readonly #usersService = inject(UsersService);
  protected readonly users = this.#usersService.users;

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
