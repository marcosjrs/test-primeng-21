import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly #users = signal<User[]>([
    {
      id: 1,
      name: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      role: 'Frontend Architect',
      status: 'active',
      joinDate: '2023-03-15'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@example.com',
      role: 'Backend Tech Lead',
      status: 'active',
      joinDate: '2022-11-01'
    },
    {
      id: 3,
      name: 'Sophia Dupont',
      email: 'sophia.dupont@example.com',
      role: 'UI/UX Designer',
      status: 'pending',
      joinDate: '2024-01-20'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@example.com',
      role: 'DevOps Specialist',
      status: 'active',
      joinDate: '2023-08-10'
    },
    {
      id: 5,
      name: 'Lucia Morales',
      email: 'lucia.morales@example.com',
      role: 'QA Engineer',
      status: 'inactive',
      joinDate: '2021-06-18'
    },
    {
      id: 6,
      name: 'Markus Weber',
      email: 'markus.weber@example.com',
      role: 'Product Manager',
      status: 'active',
      joinDate: '2022-04-05'
    }
  ]);

  readonly users = this.#users.asReadonly();
}
