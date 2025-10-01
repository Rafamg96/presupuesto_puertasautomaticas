# 🚀 Guía Rápida de Deployment

## Opción 1: GitHub Pages con GitHub Actions (Recomendado)

### Configuración inicial (solo una vez)

1. **Push tu código a GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configurar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: selecciona "GitHub Actions"

3. **El deployment es automático**
   - Cada vez que hagas push a `main`, se desplegará automáticamente
   - GitHub Actions construirá y desplegará la app

## Opción 2: Deploy manual con gh-pages

1. **Asegúrate de que vite.config.js está correctamente configurado**
   ```javascript
   base: '/presupuesto_puertasautomaticas/'
   ```

2. **Ejecuta el comando de deploy**
   ```bash
   npm run deploy
   ```

3. **Configura GitHub Pages (si no lo has hecho)**
   - Settings → Pages
   - Source: selecciona la rama `gh-pages`

## 🔗 URL de tu aplicación

Después del deployment, tu aplicación estará disponible en:

```
https://rafamg96.github.io/presupuesto_puertasautomaticas/
```

## ✅ Verificar el deployment

1. Espera 1-2 minutos después del deployment
2. Visita la URL de tu aplicación
3. Si ves errores 404:
   - Verifica que `base` en `vite.config.js` coincida con el nombre de tu repo
   - Verifica que GitHub Pages esté habilitado
   - Revisa la pestaña Actions en GitHub para ver errores

## 🐛 Solución de problemas

### Problema: Páginas en blanco
**Solución**: Verifica que el `base` en `vite.config.js` sea correcto

### Problema: Assets no cargan (CSS/JS)
**Solución**: Asegúrate de que `base` incluye las barras `/nombre-repo/`

### Problema: El deploy falla en GitHub Actions
**Solución**: Revisa los logs en la pestaña Actions de GitHub

## 📝 Comandos útiles

```bash
# Desarrollo local
npm run dev

# Build local para probar
npm run build
npm run preview

# Deploy manual
npm run deploy

# Ver el estado del repositorio
git status

# Push cambios
git add .
git commit -m "Descripción de cambios"
git push origin main
```

## 🔄 Actualizar la aplicación

Simplemente haz cambios en el código y:

```bash
git add .
git commit -m "Descripción de tus cambios"
git push origin main
```

GitHub Actions se encargará del resto automáticamente.

## 💡 Tips

- Prueba siempre en local con `npm run dev` antes de hacer push
- Usa `npm run preview` para verificar el build antes de deployar
- Revisa los logs de GitHub Actions si algo falla
- El primer deploy puede tardar unos minutos

## 📞 ¿Necesitas ayuda?

Si tienes problemas con el deployment:
1. Revisa los logs de GitHub Actions
2. Verifica la consola del navegador para errores
3. Asegúrate de que todos los archivos se subieron correctamente
