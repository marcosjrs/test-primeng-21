import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { UsersComponent } from '../../components/users/users';

@Component({
  selector: 'app-users-list',
  imports: [UsersComponent, Button],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {}
