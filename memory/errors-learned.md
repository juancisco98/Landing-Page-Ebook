# Errores Aprendidos — Auto-Memoria del Agente

Este archivo registra errores cometidos y corregidos por el usuario. Consultar SIEMPRE antes de implementar cambios similares.

---

## ❌ Error #1 — CSS z-index stacking context rompe visibilidad de secciones
**Fecha:** 2026-03-11
**Contexto:** Implementación de aurora background en página completa.

**Error cometido:** Se usó `position: fixed; z-index: 0` en la capa aurora DENTRO de un elemento `<main>` con `position: relative; z-index: 1`. Esto hizo que la aurora (z:0, posicionado) se pintara ENCIMA del contenido estático (no posicionado) dentro del mismo stacking context, haciendo desaparecer secciones visualmente.

**Regla aprendida:**
- Un elemento `position + z-index` crea un nuevo stacking context.
- Dentro de ese context, elementos posicionados con z:0 pintan DESPUÉS de elementos no posicionados (block-level), ocultando el contenido.
- **Solución correcta:** Colocar el layer de fondo FUERA del stacking context del contenido. Usar `layout.tsx` para elementos fixed de fondo, con `z-index: -1` y `body { background: transparent }` + `html { background: white }`.

**Patrón correcto:**
```tsx
// layout.tsx — aurora FUERA del contenido
<body>
  <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
    <div className="aurora-layer" />
  </div>
  {children}  {/* sin z-index en main */}
</body>
```
```css
html { background: white; }
body { background: transparent; }
```

---

## ❌ Error #2 — Tailwind arbitrary values no funcionan con gradientes complejos
**Fecha:** 2026-03-11
**Contexto:** Aurora background usando `[background-image:var(--aurora)]` con Tailwind JIT.

**Error cometido:** Se intentó usar Tailwind arbitrary values para definir un `repeating-linear-gradient` con `var()` CSS custom properties. El JIT escapa o no procesa correctamente estos valores, resultando en el efecto invisible.

**Regla aprendida:**
- Gradientes complejos con `var()` dentro de Tailwind arbitrary values `[...]` NO funcionan de forma confiable.
- **Solución correcta:** Definir el CSS complejo en `globals.css` como una clase regular, con colores hardcodeados en hex (no `var(--color-xxx)`).

**Patrón correcto:**
```css
/* globals.css — NO usar Tailwind arbitrary values para esto */
.aurora-layer {
  background-image: repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, ...);
}
```

---

## ❌ Error #3 — Llamadas a funciones con parámetros faltantes rompen el build de TypeScript
**Fecha:** 2026-03-11
**Contexto:** Build de Vercel fallando en la fase de type-check.

**Error cometido:** No se verificó que todas las llamadas a `addItem()` pasaran los 3 argumentos requeridos. Las llamadas en botones móviles de `ProductGrid.tsx` y en `AddToCartButton.tsx` solo pasaban 2 argumentos.

**Regla aprendida:**
- Antes de hacer `git push`, verificar que TODAS las call sites de una función tengan los argumentos correctos, no solo las que se modificaron recientemente.
- Cuando se cambia la firma de una función, buscar con Grep TODAS las ocurrencias en el proyecto.
- `next build` con TypeScript strict falla el deploy si hay argument count mismatch.

**Patrón correcto:**
```bash
# Antes de push, buscar todas las llamadas a funciones modificadas
grep -r "addItem(" src/
```

---

## ❌ Error #4 — Framer Motion JS animation bloquea scroll en móvil incluso con `pointerEvents: none`
**Fecha:** 2026-03-12
**Contexto:** FloatingEbooks — 5 libros con animación continua flotante en iOS/Android.

**Error cometido:** Se usaron múltiples patches de eventos (touchAction, pointerEvents, quitar whileHover) sin atacar la causa raíz: Framer Motion corre animaciones en el **main thread** de JavaScript mediante RAF/WAAPI. Esto satura el main thread en móvil, impidiendo respuesta fluida a los touch events. Adicionalmente, `overflow: hidden` en la sección crea un scroll container que iOS Safari usa para capturar touch events antes de que lleguen al scroll de la página.

**Las 3 causas raíz:**
1. **Main thread saturado**: 5 animaciones FM × 60fps ≈ 300 cálculos JS/segundo → main thread no puede procesar touch events con fluidez.
2. **iOS `overflow: hidden` scroll trap**: Crea un BFC/scroll container. iOS Safari intercepta touch events dentro de él antes de detectar el gesto de scroll.
3. **Bug iOS Safari + WAAPI**: Aunque `pointerEvents: none` evita que el elemento reciba eventos, el compositing layer del elemento WAAPI-animado puede interferir con el hit-testing de touch en iOS.

**Regla aprendida:**
- Para animaciones **continuas e infinitas** en móvil, usar siempre **CSS `@keyframes` puro** (compositor thread, 0 JS por frame).
- Nunca usar `overflow: hidden` en secciones que contienen animaciones si hay scroll de página → usar `overflow: clip` (no crea scroll container).
- Los patches de pointer events SOLO sirven para animaciones interactivas (FM con onClick/whileHover), nunca para animaciones puramente visuales.

**Patrón correcto:**
```tsx
// En useEffect (después del useMemo):
useEffect(() => {
  const styleEl = document.createElement('style');
  styleEl.id = 'my-anim-styles';
  styleEl.textContent = items.map((item, i) => `
    @keyframes float-${i} {
      0%   { transform: translate(${item.x0}px, ${item.y0}px) rotate(${item.r0}deg); }
      50%  { transform: translate(${item.x1}px, ${item.y1}px) rotate(${item.r1}deg); }
      100% { transform: translate(${item.x2}px, ${item.y2}px) rotate(${item.r2}deg); }
    }
  `).join('\n');
  document.head.appendChild(styleEl);
  return () => styleEl.remove();
}, [items]);

// En el JSX:
<div style={{
  animation: `float-${index} ${duration}s ease-in-out infinite alternate`,
  animationFillMode: 'both',
  pointerEvents: 'none',
}} />

// En la sección contenedora:
<section style={{ overflow: 'clip' as any, touchAction: 'pan-y' }} />
```
