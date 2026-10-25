# TestPrimeng21

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Estructura creada

```
src/app/users/
├── models/
│   └── user.model.ts                    # Interfaz User y tipos de estado
├── services/
│   └── users.service.ts                 # Servicio UsersService con Signals (providedIn: 'root')
├── components/
│   └── users/
│       ├── users.ts                     # Componente UsersComponent con OnPush e inject()
│       ├── users.html                   # Plantilla con p-table, paginación, tags de estado y acciones
│       └── users.scss                   # Estilos encapsulados
└── pages/
    └── users-list/
        ├── users-list.ts                # Página UsersListComponent (standalone, OnPush)
        ├── users-list.html              # Layout de la página con encabezado y <app-users />
        └── users-list.scss              # Estilos del contenedor de la página
```

## Detalle de los archivos

1. **Modelo**: `src/app/users/models/user.model.ts`
   - Define la interfaz `User` y el tipo `UserStatus` (`active`, `inactive`, `pending`).

2. **Servicio**: `src/app/users/services/users.service.ts`
   - Expone los usuarios mediante un Signal de solo lectura: `readonly users = this.#users.asReadonly()`.

3. **Componente de Tabla**: `src/app/users/components/users/users.ts` y `src/app/users/components/users/users.html`
   - Utiliza `<p-table [value]="users()" [paginator]="true" [rows]="5" ...>` de PrimeNG.
   - Incluye badges con `<p-tag>` de severidad dinámica según el estado del usuario (`success`, `warn`, `danger`).

4. **Página**: `src/app/users/pages/users-list/users-list.ts` y `src/app/users/pages/users-list/users-list.html`
   - Estructura la vista principal con título, acciones y el componente `<app-users />`.

5. **Rutas**: `src/app/app.routes.ts`
   - Se configuró la ruta `/users` con **lazy loading** (`loadComponent`) y redirección por defecto desde la raíz (`''` -> `'users'`).

