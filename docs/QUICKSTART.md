# ⚡ Inicio Rápido

## 🎯 Para empezar inmediatamente

Si solo quieres usar la aplicación sin instalar nada, visita:

**https://rafamg96.github.io/presupuesto_puertasautomaticas/**

¡Ya está funcionando online!

---

## 💻 Para desarrolladores: Instalación local

### 1️⃣ Instalar Node.js

Si no tienes Node.js instalado:

1. Visita: https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador
4. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

### 2️⃣ Clonar e instalar

```bash
# Clonar el repositorio
git clone https://github.com/Rafamg96/presupuesto_puertasautomaticas.git

# Entrar a la carpeta
cd presupuesto_puertasautomaticas

# Instalar dependencias
npm install
```

### 3️⃣ Ejecutar en local

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:5173**

---

## 🚀 Desplegar tu propia versión

### Opción A: GitHub Pages (Gratis)

1. **Fork** este repositorio en GitHub
2. Ve a Settings → Pages
3. Source: GitHub Actions
4. Tu app estará en: `https://TU-USUARIO.github.io/presupuesto_puertasautomaticas/`

### Opción B: Vercel (Gratis, más rápido)

1. Visita: https://vercel.com
2. Importa tu repositorio
3. Deploy automático
4. Tu app estará lista en segundos

### Opción C: Netlify (Gratis)

1. Visita: https://netlify.com
2. Drag & drop la carpeta `dist/` después de ejecutar `npm run build`
3. Tu app estará online inmediatamente

---

## 📝 ¿Qué sigue?

- Lee `README.md` para documentación completa
- Lee `CUSTOMIZATION.md` para personalizar precios y datos
- Lee `DEPLOYMENT.md` para deployment detallado
- Lee `DEVELOPMENT.md` para detalles técnicos

---

## ❓ Problemas comunes

### "npm no se reconoce como comando"

**Solución**: Instala Node.js desde https://nodejs.org/

### "Error al instalar dependencias"

**Solución**: 
```bash
npm cache clean --force
npm install
```

### "La página se ve en blanco después del deploy"

**Solución**: Verifica que el `base` en `vite.config.js` coincida con el nombre de tu repositorio.

### "Los archivos CSS/JS no cargan"

**Solución**: Asegúrate de que `base` en `vite.config.js` sea correcto:
```javascript
base: '/nombre-de-tu-repositorio/'
```

---

## 🆘 ¿Necesitas ayuda?

1. Revisa los archivos de documentación
2. Busca en Issues de GitHub
3. Crea un nuevo Issue con tu problema

---

¡Disfruta creando presupuestos profesionales! 🎉
