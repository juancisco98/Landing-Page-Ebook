# 🤖 Project: Shopify High-End Landing Agent (SHLA)

## 🎯 Executive Summary
Este proyecto consiste en una Landing Page de alto rendimiento (Headless) vinculada a Shopify mediante Storefront API, con un enfoque obsesivo en UX, conversiones y animaciones de 60fps.

---

## 👥 Agents & Roles (Multi-Agent System)
Antigravity debe instanciar estos sub-procesos de Gemini 3.1 Flash para cada tarea:

* **`@architect`**: Responsable de la infraestructura Next.js 15 y la conexión segura con Shopify Storefront API. Define tipos de TypeScript y manejo de errores de red.
* **`@designer-ux`**: Especialista en Conversión (CRO). Aplica jerarquía visual, tipografía premium y diseño "Apple-style". Su meta es reducir la fricción hacia el checkout.
* **`@motion-engineer`**: Maestro de Framer Motion y GSAP. Implementa micro-interacciones, scroll-trigger reveals y transiciones fluidas en el carrito.
* **`@performance-bot`**: Auditor de Core Web Vitals. Optimiza imágenes, implementa "Priority Hints" y asegura un LCP < 1.2s.

---

## 🛠 Tech Stack & Skills
El agente debe invocar estas skills desde `skills.sh`:
- `shopify/storefront-api-v2026`
- `framer/motion-advanced-v5`
- `tailwind/shadcn-premium-ui`
- `agent/performance-auditor-v2`

---

## 📜 Behavior & Rules
1.  **Plan First**: Antes de cada commit, el agente debe emitir un bloque `<PLAN>` detallando los cambios.
2.  **No Ghost Code**: No dejar comentarios `// TODO` o funciones vacías. Todo el código debe ser funcional.
3.  **Type Safety**: Prohibido el uso de `any`. Toda respuesta de la API de Shopify debe estar tipada en `@/types/shopify.d.ts`.
4.  **Optimistic UI**: Las acciones de "Añadir al carrito" deben reflejarse instantáneamente en la UI antes de recibir confirmación del servidor.
5.  **Auto-Aprendizaje de Errores**: Cuando el usuario corrija un error cometido por el agente, este debe registrar la lección aprendida en `memory/errors-learned.md` con el patrón exacto del error y cómo evitarlo. En sesiones futuras, consultar ese archivo antes de implementar cambios similares. Nunca repetir el mismo error dos veces.

---

## 🏗 Project Architecture (Target)
```text
/
├── .env.local          # SHOPIFY_STORE_DOMAIN, SHOPIFY_ACCESS_TOKEN
├── /src
│   ├── /app            # Next.js App Router (Layouts & Pages)
│   ├── /components
│   │   ├── /ui         # Base Atomic Components (Shadcn)
│   │   ├── /shopify    # CartDrawer, ProductCard, CheckoutButton
│   │   └── /motion     # AnimatePresence wrappers, Reveal components
│   ├── /lib
│   │   └── /shopify    # client.ts, mutations.ts, queries.ts
│   ├── /hooks          # useCart.ts (Global State Management)
│   └── /styles         # globals.css (Tailwind + Custom Keyframes)
└── GEMINI.md           # This file