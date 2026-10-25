import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

export type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';

export interface ConfirmDialogOptions {
  header?: string;
  message?: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptSeverity?: ButtonSeverity;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialog],
  providers: [ConfirmationService],
  template: `
    <p-confirmdialog [key]="dialogKey()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent<T = unknown> {
  readonly #confirmationService = inject(ConfirmationService);

  readonly dialogKey = input<string>('app-confirm-dialog');
  readonly header = input<string>('¿Estás seguro?');
  readonly message = input<string>('Esta acción no se puede deshacer.');
  readonly icon = input<string>('pi pi-exclamation-triangle');
  readonly acceptLabel = input<string>('Confirmar');
  readonly rejectLabel = input<string>('Cancelar');
  readonly acceptSeverity = input<ButtonSeverity>('danger');
  readonly payload = input<T | undefined>(undefined);

  readonly confirmed = output<T>();
  readonly rejected = output<T | undefined>();

  confirm(payload?: T, customOptions?: ConfirmDialogOptions): void {
    const targetPayload = payload !== undefined ? payload : this.payload();
    this.#confirmationService.confirm({
      key: this.dialogKey(),
      header: customOptions?.header ?? this.header(),
      message: customOptions?.message ?? this.message(),
      icon: customOptions?.icon ?? this.icon(),
      acceptLabel: customOptions?.acceptLabel ?? this.acceptLabel(),
      rejectLabel: customOptions?.rejectLabel ?? this.rejectLabel(),
      acceptButtonProps: {
        severity: customOptions?.acceptSeverity ?? this.acceptSeverity()
      },
      rejectButtonProps: {
        severity: 'secondary',
        text: true
      },
      accept: () => {
        this.confirmed.emit(targetPayload as T);
      },
      reject: () => {
        this.rejected.emit(targetPayload);
      }
    });
  }
}
