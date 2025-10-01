# 🐳 Guía Rápida: Dev Container

## ¿Qué acabas de añadir?

Has añadido un **Dev Container** completo al proyecto que incluye:

✅ **Node.js 20 LTS** preinstalado
✅ **Git** y **GitHub CLI**
✅ **Todas las extensiones de VSCode** necesarias
✅ **npm install** automático
✅ **Puerto 5173** (Vite) auto-forward
✅ **Configuración perfecta** para React + Vite + Tailwind

---

## 🚀 Cómo Usarlo (3 pasos)

### 1️⃣ Instalar Docker Desktop

**Windows:**
```
https://www.docker.com/products/docker-desktop
```

**Mac:**
```
https://www.docker.com/products/docker-desktop
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install docker.io
```

### 2️⃣ Instalar Extensión en VS Code

1. Abre VS Code
2. Ve a Extensiones (Ctrl+Shift+X)
3. Busca: **"Dev Containers"**
4. Instala la extensión de Microsoft

### 3️⃣ Abrir en Dev Container

**Método 1:**
- Presiona `F1`
- Escribe: `Dev Containers: Reopen in Container`
- Espera 2-3 minutos (solo la primera vez)

**Método 2:**
- VSCode te mostrará un popup
- Click en **"Reopen in Container"**

---

## ✨ ¿Qué Obtienes?

### Entorno Completo Preconfigurado

```
🐳 Dev Container
├── Node.js 20 LTS ✅
├── npm 10.x ✅
├── Git ✅
├── GitHub CLI ✅
└── Dependencias del proyecto instaladas ✅
```

### Extensiones VSCode Instaladas

```
📦 Extensiones Automáticas
├── ESLint (linting)
├── Prettier (formateo)
├── Tailwind CSS IntelliSense
├── ES7+ React Snippets
├── Auto Rename Tag
├── Path Intellisense
├── TODO Highlight
└── GitHub Copilot (si tienes licencia)
```

### Configuración Lista

```
⚙️ Settings Aplicados
├── Formateo al guardar ✅
├── Prettier como formateador ✅
├── ESLint auto-fix ✅
├── Tailwind autocompletado ✅
└── Terminal bash por defecto ✅
```

---

## 💻 Uso Diario

Una vez dentro del Dev Container:

```bash
# Desarrollo
npm run dev          # Servidor en http://localhost:5173

# Build
npm run build        # Crear build de producción
npm run preview      # Preview del build

# Deploy
npm run deploy       # Desplegar a GitHub Pages
```

El puerto 5173 se abre automáticamente en tu navegador.

---

## 🎯 Ventajas vs Instalación Local

| Característica | Local | Dev Container |
|----------------|-------|---------------|
| Instalar Node.js | ❌ Manual | ✅ Incluido |
| Instalar extensiones | ❌ Manual | ✅ Automático |
| npm install | ❌ Manual | ✅ Automático |
| Versión consistente | ❌ Varía | ✅ Siempre igual |
| Configuración | ❌ Manual | ✅ Automática |
| Limpieza | ❌ Difícil | ✅ Borrar contenedor |
| Onboarding | ❌ 30+ min | ✅ 3 minutos |

---

## 🔄 Comandos Útiles

### En VS Code (dentro del contenedor)

```
F1 → Dev Containers: Rebuild Container
  (Reconstruir si cambias devcontainer.json)

F1 → Dev Containers: Reopen Folder Locally
  (Volver a modo local)

F1 → Dev Containers: Show Container Log
  (Ver logs del contenedor)
```

### En Terminal (dentro del contenedor)

```bash
node --version       # Ver versión de Node
npm --version        # Ver versión de npm
git --version        # Ver versión de Git
gh --version         # Ver versión de GitHub CLI
```

---

## 🐛 Solución de Problemas

### Problema: "Docker no está ejecutándose"

**Solución:**
1. Abre Docker Desktop
2. Espera a que se inicie completamente
3. Intenta de nuevo

### Problema: "El contenedor tarda mucho en construirse"

**Solución:**
- Es normal la primera vez (2-5 minutos)
- Descarga la imagen base de Node.js
- Instala todas las dependencias
- Las siguientes veces es instantáneo

### Problema: "npm install falla"

**Solución:**
```bash
# Dentro del contenedor
npm cache clean --force
npm install
```

### Problema: "No veo las extensiones"

**Solución:**
```
F1 → Dev Containers: Rebuild Container
```

---

## 📁 Archivos del Dev Container

```
.devcontainer/
├── devcontainer.json     # Configuración principal
├── README.md             # Documentación completa
└── post-create.sh        # Script de inicialización
```

### devcontainer.json

Define:
- Imagen Docker (Node.js 20)
- Extensiones a instalar
- Settings de VSCode
- Puertos a exponer (5173)
- Comandos post-creación

### README.md

Documentación completa:
- Cómo usar el Dev Container
- Características incluidas
- Troubleshooting
- Personalización

### post-create.sh

Script que se ejecuta después de crear el contenedor:
- Verifica Node.js y npm
- Muestra comandos disponibles
- Mensaje de bienvenida

---

## 🎓 Para Nuevos Desarrolladores

Si eres nuevo en el proyecto:

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Rafamg96/presupuesto_puertasautomaticas.git
   cd presupuesto_puertasautomaticas
   ```

2. **Abre VS Code**
   ```bash
   code .
   ```

3. **Acepta "Reopen in Container"**
   - Espera 2-3 minutos
   - ¡Listo para desarrollar!

4. **Ejecuta el proyecto**
   ```bash
   npm run dev
   ```

No necesitas instalar:
- ❌ Node.js
- ❌ npm
- ❌ Git
- ❌ Extensiones de VSCode

Todo está incluido. 🎉

---

## 💡 Tips Pro

### Tip 1: Terminal Compartido
Todos los terminales en VSCode están dentro del contenedor.

### Tip 2: Git Credentials
Tus credenciales de Git se comparten automáticamente.

### Tip 3: Archivos Persistentes
Todos los archivos persisten fuera del contenedor.

### Tip 4: Performance
El rendimiento es casi nativo en Mac/Linux, muy bueno en Windows con WSL2.

### Tip 5: Múltiples Proyectos
Puedes tener múltiples Dev Containers abiertos simultáneamente.

---

## 🌟 Próximos Pasos

1. ✅ **Abre en Dev Container**
2. ✅ **Ejecuta `npm run dev`**
3. ✅ **Desarrolla sin preocupaciones**
4. ✅ **Push a GitHub**
5. ✅ **Deploy automático**

---

## 📚 Recursos

- [Dev Containers Docs](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

---

## 🎉 ¡Disfruta tu entorno perfecto!

El Dev Container te da:
- ✅ Cero configuración manual
- ✅ Entorno reproducible
- ✅ Onboarding instantáneo
- ✅ Mismo entorno para todos
- ✅ Fácil limpieza

**¡Simplemente abre y desarrolla!** 🚀
