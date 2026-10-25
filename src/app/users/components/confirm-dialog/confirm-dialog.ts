import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialog],
  providers: [ConfirmationService],
  template: `
    <p-confirmdialog [key]="dialogKey" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  readonly #confirmationService = inject(ConfirmationService);
  readonly confirmed = output<User>();
  readonly dialogKey = 'confirm-delete-dialog';

  confirm(user: User): void {
    this.#confirmationService.confirm({
      key: this.dialogKey,
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario "${user.name}"? Esta acción no se puede deshacer.`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: {
        severity: 'danger'
      },
      rejectButtonProps: {
        severity: 'secondary',
        text: true
      },
      accept: () => {
        this.confirmed.emit(user);
      }
    });
  }
}
