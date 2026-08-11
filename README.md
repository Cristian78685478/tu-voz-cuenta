# Tu Voz Cuenta - panel de aprobación con Neon + Vercel

Este paquete mantiene la web estática y añade una API de Vercel conectada a Neon.

## Variables de entorno en Vercel

Añade estas variables en **Production** y **Preview**:

- `DATABASE_URL`: cadena de conexión de Neon.
- `ADMIN_PASSWORD`: la clave privada para entrar al panel.

También se aceptan `POSTGRES_URL` o `POSTGRES_URL_NON_POOLING` si ya las tienes configuradas.

## Base de datos

1. Abre Neon > SQL Editor.
2. Pega el contenido de `schema.sql`.
3. Pulsa **Run**.

## Despliegue

Sube este proyecto a Vercel o conecta el repositorio.
Vercel detectará `api/` como funciones serverless.

## Flujo

- El formulario público guarda cada caso como `pendiente`.
- `/api/admin/login` crea una cookie de sesión HttpOnly.
- El panel obtiene los casos pendientes.
- **Aprobar** cambia el estado a `publicado`.
- **Rechazar** cambia el estado a `rechazado`.
- La portada carga los casos publicados desde Neon.

No pongas `ADMIN_PASSWORD` ni `DATABASE_URL` dentro de `index.html` ni en JavaScript del navegador.
