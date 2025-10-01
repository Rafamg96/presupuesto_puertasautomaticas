# Notas de Desarrollo

## Stack Tecnológico

- **React 18.2** - UI framework
- **Vite 4.4** - Build tool
- **TailwindCSS 3.3** - Utility-first CSS
- **jsPDF 2.5** - PDF generation
- **Lucide React** - Icon library

## Arquitectura

### Estructura de Componentes

```
App (root)
├── BudgetForm (formulario principal)
│   └── Usa priceCalculator para validaciones
└── BudgetPreview (vista previa)
    └── Usa pdfGenerator para exportar
```

### Flujo de Datos

1. Usuario completa `BudgetForm`
2. Al submit, `calculateBudget()` genera el presupuesto
3. Datos se pasan a `BudgetPreview`
4. Usuario puede exportar con `generatePDF()`
5. Opcional: Datos se guardan en localStorage

### Estado

- Estado local en `App.jsx` para controlar vista actual
- Estado del formulario en `BudgetForm.jsx`
- No hay estado global (no necesario para SPA simple)

## Funcionalidades Implementadas

### ✅ Formulario Completo
- Datos del cliente (nombre, email, teléfono)
- Tipo de puerta (6 opciones)
- Medidas (alto × ancho)
- Material (5 opciones)
- Nivel de automatización (3 niveles)
- Accesorios (7 opciones multi-select)
- Ubicación
- Urgencia
- Observaciones

### ✅ Cálculo Automático
- Precio base según tipo de puerta
- Precio de materiales según área y material
- Coste de automatización
- Suma de accesorios
- Mano de obra (según complejidad y área)
- Transporte (con recargo por urgencia)
- IVA (21%)
- Total

### ✅ Vista Previa
- Documento con formato profesional
- Logo y datos de empresa
- Información del cliente
- Descripción del proyecto
- Desglose detallado de costos
- Condiciones comerciales
- Diseño responsive

### ✅ Exportación a PDF
- PDF generado en el navegador
- Diseño profesional
- Todos los detalles incluidos
- Nombre de archivo descriptivo

### ✅ Funcionalidades Extra
- Guardado en localStorage (últimos 10)
- Botón de impresión
- Diseño responsive
- Validación de campos requeridos
- Número de presupuesto único

## Cálculos de Precio

### Fórmulas Implementadas

#### Materiales
```
precioMaterial = área × precioBasePorM² × multiplicadorMaterial
```

#### Mano de Obra
```
manoDeObra = precioBase × multiplicadorComplejidad + recargoÁrea
recargoÁrea = (área - 10) × 30 (si área > 10m²)
```

#### Total
```
subtotal = puertaBase + materiales + automatización + accesorios + manoDeObra + transporte
iva = subtotal × 0.21
total = subtotal + iva
```

## Decisiones de Diseño

### Por qué Vite
- Más rápido que Create React App
- HMR ultra-rápido
- Build optimizado
- Configuración simple

### Por qué TailwindCSS
- Desarrollo rápido
- Diseño consistente
- Fácil de personalizar
- Bundle pequeño (solo clases usadas)

### Por qué jsPDF
- Funciona 100% en el navegador
- No requiere backend
- Flexible y personalizable
- Licencia permisiva

### Por qué LocalStorage
- Persistencia simple sin backend
- Acceso instantáneo
- No requiere configuración
- Límite de 10 presupuestos para no llenar storage

## Optimizaciones

### Performance
- Componentes funcionales con hooks
- No hay re-renders innecesarios
- Build de producción minificado
- CSS purgado (solo clases usadas)

### UX
- Validación en tiempo real
- Feedback visual claro
- Botones grandes y táctiles
- Loading states implícitos

### SEO
- Meta tags básicos
- HTML semántico
- Accesibilidad básica (labels, alt text)

## Limitaciones Conocidas

1. **No hay base de datos**: Los datos no persisten entre dispositivos
2. **LocalStorage limitado**: Solo 10 presupuestos guardados
3. **No hay autenticación**: Cualquiera puede usar la app
4. **No hay envío de email**: PDF debe descargarse manualmente
5. **Sin historial avanzado**: No hay búsqueda o filtrado de presupuestos

## Mejoras Futuras (Opcional)

### Corto Plazo
- [ ] Selector de idioma (ES/EN)
- [ ] Más temas de color
- [ ] Plantillas de presupuesto
- [ ] Importar/exportar configuración

### Medio Plazo
- [ ] Comparador de presupuestos
- [ ] Gráficos de desglose
- [ ] Calculadora de descuentos
- [ ] Modo oscuro

### Largo Plazo
- [ ] Backend opcional con Supabase/Firebase
- [ ] Autenticación de usuarios
- [ ] Sincronización en la nube
- [ ] Envío de presupuestos por email
- [ ] Dashboard de estadísticas

## Testing

### Testing Manual Recomendado

1. **Formulario**
   - [ ] Todos los campos se rellenan correctamente
   - [ ] Validación funciona (campos requeridos)
   - [ ] Selección múltiple de accesorios
   - [ ] Toggle de urgencia

2. **Cálculos**
   - [ ] Precios se calculan correctamente
   - [ ] IVA es 21% del subtotal
   - [ ] Total = subtotal + IVA
   - [ ] Recargo por urgencia se aplica

3. **Vista Previa**
   - [ ] Todos los datos se muestran
   - [ ] Formato es profesional
   - [ ] Responsive en móvil

4. **PDF**
   - [ ] PDF se descarga correctamente
   - [ ] Contenido coincide con vista previa
   - [ ] Formato es profesional

5. **Impresión**
   - [ ] Vista de impresión es limpia
   - [ ] Botones se ocultan
   - [ ] Colores se mantienen

6. **LocalStorage**
   - [ ] Presupuestos se guardan
   - [ ] Solo se mantienen los últimos 10

## Configuración de Desarrollo

### Variables de Entorno

No se necesitan variables de entorno. Todo es estático.

### Puerto de Desarrollo

Por defecto: `http://localhost:5173`

Cambiar en `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000 // Tu puerto preferido
  }
})
```

## Deployment

### GitHub Pages

Ver `DEPLOYMENT.md` para instrucciones completas.

### Otras Opciones

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop de la carpeta `dist/`
- **Cloudflare Pages**: Push a GitHub + conectar repo
- **Servidor propio**: Subir carpeta `dist/` vía FTP

## Mantenimiento

### Actualizar Dependencias

```bash
npm outdated                # Ver paquetes desactualizados
npm update                  # Actualizar paquetes (minor/patch)
npm install <pkg>@latest    # Actualizar paquete específico
```

### Verificar Vulnerabilidades

```bash
npm audit                   # Ver vulnerabilidades
npm audit fix               # Reparar automáticamente
```

## Soporte

### Navegadores Soportados

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Dispositivos

- Desktop (1920×1080 y menores)
- Tablet (768×1024)
- Mobile (375×667 en adelante)

## Licencia

MIT - Ver `LICENSE` para más detalles.

## Contacto

Para preguntas o sugerencias, contacta al autor en GitHub: @Rafamg96
