import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { User, UserStatus } from '../../models/user.model';

interface StatusOption {
  label: string;
  value: UserStatus;
}

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, InputText, Select, Button, Message],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  readonly user = input<User | null>(null);
  readonly save = output<User>();
  readonly cancel = output<void>();

  readonly statusOptions: StatusOption[] = [
    { label: 'Activo', value: 'active' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'Inactivo', value: 'inactive' }
  ];

  readonly form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    role: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    status: new FormControl<UserStatus>('active', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.form.patchValue({
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          status: currentUser.status
        });
      }
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const current = this.user();
    if (!current) {
      return;
    }

    const formValues = this.form.getRawValue();
    const updatedUser: User = {
      ...current,
      name: formValues.name,
      email: formValues.email,
      role: formValues.role,
      status: formValues.status
    };

    this.save.emit(updatedUser);
  }

  protected onCancel(): void {
    this.cancel.emit();
  }
}
