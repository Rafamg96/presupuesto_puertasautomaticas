# Configuración del Dev Container

Este proyecto incluye una configuración de Dev Container para Visual Studio Code que proporciona un entorno de desarrollo completo y consistente.

## 🐳 ¿Qué es un Dev Container?

Un Dev Container es un entorno de desarrollo completo dentro de un contenedor Docker que incluye:
- Node.js 20 LTS
- Todas las herramientas necesarias
- Extensiones de VSCode preinstaladas
- Configuración lista para usar

## 📋 Requisitos Previos

1. **Docker Desktop** instalado y ejecutándose
   - Windows: [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop)
   - Mac: [Docker Desktop para Mac](https://www.docker.com/products/docker-desktop)
   - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

2. **Visual Studio Code** instalado

3. **Extensión Dev Containers** para VSCode
   - Busca "Dev Containers" en el marketplace de VSCode
   - O instala desde: [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## 🚀 Cómo Usar

### Método 1: Abrir en Dev Container

1. Abre VS Code en la carpeta del proyecto
2. Presiona `F1` o `Ctrl+Shift+P` (Windows/Linux) / `Cmd+Shift+P` (Mac)
3. Escribe: `Dev Containers: Reopen in Container`
4. Espera a que el contenedor se construya (solo la primera vez)
5. ¡Listo! El entorno está configurado automáticamente

### Método 2: Desde el Prompt

Cuando abras el proyecto, VSCode te preguntará:
```
"Folder contains a Dev Container configuration file. Reopen folder to develop in a container?"
```

Haz clic en **"Reopen in Container"**

## ✨ Características Incluidas

### Node.js y Herramientas
- ✅ Node.js 20 LTS
- ✅ npm/npx
- ✅ Git
- ✅ GitHub CLI

### Extensiones VSCode Preinstaladas
- ✅ ESLint - Linting de JavaScript
- ✅ Prettier - Formateo de código
- ✅ Tailwind CSS IntelliSense - Autocompletado de Tailwind
- ✅ ES7+ React Snippets - Snippets para React
- ✅ Auto Rename Tag - Renombrado automático de tags HTML
- ✅ Path Intellisense - Autocompletado de rutas
- ✅ TODO Highlight - Resaltado de TODOs
- ✅ GitHub Copilot (si tienes licencia)
- ✅ TypeScript Next - Soporte TypeScript

### Configuración Automática
- ✅ Formateo al guardar
- ✅ Prettier como formateador por defecto
- ✅ ESLint con corrección automática
- ✅ Autocompletado de Tailwind CSS
- ✅ Puerto 5173 (Vite) auto-forward

### Post-Instalación Automática
- ✅ `npm install` se ejecuta automáticamente
- ✅ Dependencias listas al abrir el contenedor

## 🎯 Comandos Disponibles

Una vez dentro del Dev Container, puedes usar:

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Build
npm run build        # Crear build de producción
npm run preview      # Previsualizar build

# Deploy
npm run deploy       # Desplegar en GitHub Pages

# Gestión de paquetes
npm install <paquete>   # Instalar nuevo paquete
npm update              # Actualizar paquetes
npm outdated            # Ver paquetes desactualizados
```

## 🔧 Configuración del Dev Container

### Archivo: `.devcontainer/devcontainer.json`

```json
{
  "name": "Presupuestos Puertas Automáticas",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye",
  "forwardPorts": [5173],
  "postCreateCommand": "npm install"
}
```

### Características Destacadas

#### 1. Imagen Base
```json
"image": "mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye"
```
- Node.js 20 LTS
- Debian Bullseye
- Herramientas de desarrollo preinstaladas

#### 2. Port Forwarding
```json
"forwardPorts": [5173]
```
- El puerto 5173 (Vite) se hace accesible automáticamente
- Puedes acceder a `http://localhost:5173` desde tu navegador

#### 3. Post-Create Command
```json
"postCreateCommand": "npm install"
```
- Instala todas las dependencias automáticamente
- Solo se ejecuta la primera vez

## 🐛 Solución de Problemas

### El contenedor no se construye

**Solución:**
1. Verifica que Docker Desktop esté ejecutándose
2. Intenta: `Dev Containers: Rebuild Container`
3. Si persiste, elimina contenedores antiguos:
   ```bash
   docker system prune -a
   ```

### El puerto 5173 no es accesible

**Solución:**
1. Verifica que el servidor esté ejecutándose: `npm run dev`
2. Ve a la pestaña "Ports" en VSCode
3. Asegúrate de que el puerto 5173 esté visible

### npm install falla

**Solución:**
1. Dentro del contenedor, ejecuta:
   ```bash
   npm cache clean --force
   npm install
   ```

### Extensiones no aparecen

**Solución:**
1. Reconstruye el contenedor: `Dev Containers: Rebuild Container`
2. O instala manualmente desde la pestaña de extensiones

## 💡 Ventajas del Dev Container

### ✅ Entorno Consistente
- Todos los desarrolladores usan el mismo entorno
- No hay conflictos de versiones de Node.js
- Configuración idéntica en todos los equipos

### ✅ Configuración Instantánea
- No necesitas instalar Node.js localmente
- Todas las herramientas preconfiguradas
- Dependencias instaladas automáticamente

### ✅ Aislamiento
- No contamina tu sistema local
- Múltiples proyectos con diferentes versiones de Node
- Fácil de limpiar (eliminar el contenedor)

### ✅ Onboarding Rápido
- Nuevos desarrolladores productivos en minutos
- Sin seguir guías de instalación complejas
- "Clone y desarrolle" inmediatamente

## 🔄 Personalización

### Cambiar Versión de Node.js

Edita `.devcontainer/devcontainer.json`:

```json
"image": "mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye"
```

Opciones:
- `1-18-bullseye` - Node.js 18
- `1-20-bullseye` - Node.js 20 (actual)
- `1-21-bullseye` - Node.js 21

### Añadir Extensiones

Añade al array `extensions`:

```json
"extensions": [
  "dbaeumer.vscode-eslint",
  "tu-extension-aqui"
]
```

### Añadir Comandos Post-Create

```json
"postCreateCommand": "npm install && npm run build"
```

### Features Adicionales

Añade features de Dev Containers:

```json
"features": {
  "ghcr.io/devcontainers/features/docker-in-docker:2": {}
}
```

## 📚 Recursos

- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Dev Container Specification](https://containers.dev/)
- [Dev Containers Images](https://github.com/devcontainers/images)
- [Dev Container Features](https://containers.dev/features)

## 🔐 Seguridad

El Dev Container:
- ✅ Usa imágenes oficiales de Microsoft
- ✅ Se ejecuta con usuario no-root (`node`)
- ✅ Aislado del sistema host
- ✅ Actualizable fácilmente

## 🎯 Comandos Útiles del Dev Container

```bash
# Reconstruir contenedor
F1 > Dev Containers: Rebuild Container

# Abrir en contenedor
F1 > Dev Containers: Reopen in Container

# Reabrir localmente
F1 > Dev Containers: Reopen Folder Locally

# Ver logs del contenedor
F1 > Dev Containers: Show Container Log

# Detalles del contenedor
F1 > Dev Containers: Show Container Configuration Info
```

## 🚀 Workflow Recomendado

1. **Abrir proyecto** en Dev Container
2. **Ejecutar** `npm run dev`
3. **Desarrollar** con hot-reload
4. **Commit** cambios
5. **Push** a GitHub
6. **Deploy** automático vía GitHub Actions

## ✨ Tips y Trucos

### Tip 1: Terminal Integrado
El terminal de VSCode ya está dentro del contenedor. Todo lo que ejecutes usa el entorno del contenedor.

### Tip 2: Git Credentials
Tus credenciales de Git se comparten automáticamente con el contenedor.

### Tip 3: Persistencia
Las dependencias npm persisten entre reinicios del contenedor.

### Tip 4: Multiple Terminales
Puedes abrir múltiples terminales, todos dentro del contenedor.

---

¡Disfruta de un entorno de desarrollo perfecto! 🎉
