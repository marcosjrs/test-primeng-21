import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

bootstrapApplication(App, {
  ...appConfig, providers: [
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
})
  .catch((err) => console.error(err));
