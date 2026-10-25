import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('test-primeng-21');
}
