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
src/app/
├── shared/
│   └── components/
│       └── confirm-dialog/
│           └── confirm-dialog.ts        # Componente genérico y reutilizable de confirmación (PrimeNG)
└── users/
    ├── models/
    │   └── user.model.ts                # Interfaz User y tipos de estado
    ├── services/
    │   └── users.service.ts             # Servicio UsersService con Signals (providedIn: 'root')
    ├── components/
    │   ├── users/
    │   │   ├── users.ts                 # Componente UsersComponent con OnPush e inject()
    │   │   ├── users.html               # Plantilla con p-table, paginación, tags de estado y acciones
    │   │   └── users.scss               # Estilos encapsulados
    │   └── user-form/
    │       ├── user-form.ts             # Formulario reactivo de edición con validaciones y PrimeNG
    │       ├── user-form.html           # Plantilla con pInputText, p-select y mensajes de error
    │       └── user-form.scss           # Estilos responsivos del formulario
    └── pages/
        ├── users-list/
        │   ├── users-list.ts            # Página UsersListComponent (standalone, OnPush)
        │   ├── users-list.html          # Layout de la página con encabezado y <app-users />
        │   └── users-list.scss          # Estilos del contenedor de la página
        └── user-edit/
            ├── user-edit.ts             # Página UserEditPage (obtiene id vía route input binding)
            ├── user-edit.html           # Layout de edición con <app-user-form /> y estado not-found
            └── user-edit.scss           # Estilos de la página de edición
```

## Detalle de los archivos

1. **Componente Compartido**: `src/app/shared/components/confirm-dialog/confirm-dialog.ts`
   - Diálogo genérico `<T = unknown>` configurable vía `input()` (título, mensaje, botones, severidad) y con sobrescritura dinámica en `confirm()`.

2. **Modelo**: `src/app/users/models/user.model.ts`
   - Define la interfaz `User` y el tipo `UserStatus` (`active`, `inactive`, `pending`).

3. **Servicio**: `src/app/users/services/users.service.ts`
   - Expone los usuarios mediante un Signal de solo lectura: `readonly users = this.#users.asReadonly()`.
   - Métodos: `getUserById(id)`, `updateUser(user)`, `deleteUser(id)`.

4. **Componente de Tabla**: `src/app/users/components/users/users.ts` y `src/app/users/components/users/users.html`
   - Utiliza `<p-table [value]="users()" [paginator]="true" [rows]="5" ...>` de PrimeNG.
   - Incluye badges con `<p-tag>` y menú contextual (`<p-menu>`) para editar (navega a `/users/:id/edit`) y confirmar borrado con `<app-confirm-dialog>`.

5. **Componente de Formulario de Edición**: `src/app/users/components/user-form/`
   - Formulario reactivo (`FormGroup`) con validaciones para nombre, email, rol y estado.
   - Utiliza `pInputText`, `p-select` y `p-message` de PrimeNG.
   - Sincroniza con el input `user()` mediante `effect()` y emite eventos `save` y `cancel`.

6. **Página de Listado**: `src/app/users/pages/users-list/users-list.ts` y `src/app/users/pages/users-list/users-list.html`
   - Estructura la vista principal con título, acciones y el componente `<app-users />`.

7. **Página de Edición**: `src/app/users/pages/user-edit/user-edit.ts` y `src/app/users/pages/user-edit/user-edit.html`
   - Captura el parámetro de ruta `id` mediante `withComponentInputBinding()`.
   - Deriva el usuario reactivamente con `computed()` y enlaza el formulario `<app-user-form />`.

8. **Rutas**: `src/app/app.routes.ts`
   - Se configuraron las rutas con **lazy loading** (`loadComponent`):
     - `/users`: Listado de usuarios.
     - `/users/:id/edit`: Edición del usuario por ID.
     - Redirección por defecto desde la raíz (`''` -> `'users'`).

