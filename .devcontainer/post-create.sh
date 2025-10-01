# Configuración del Dev Container - Script de Inicialización

echo "🚀 Inicializando Dev Container..."

# Verificar Node.js
echo "📦 Node.js versión:"
node --version

# Verificar npm
echo "📦 npm versión:"
npm --version

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
  echo "📥 Instalando dependencias..."
  npm install
else
  echo "✅ Dependencias ya instaladas"
fi

# Mensaje de éxito
echo ""
echo "✅ Dev Container configurado correctamente!"
echo ""
echo "🎯 Comandos disponibles:"
echo "  npm run dev      - Iniciar servidor de desarrollo"
echo "  npm run build    - Crear build de producción"
echo "  npm run preview  - Previsualizar build"
echo "  npm run deploy   - Desplegar en GitHub Pages"
echo ""
echo "🌐 El servidor de desarrollo se ejecutará en http://localhost:5173"
echo ""
