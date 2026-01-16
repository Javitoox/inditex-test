# MobileStore - Prueba Técnica

Aplicación de e-commerce SPA (Single Page Application) desarrollada con **Next.js 16** e integración con API REST para la gestión de productos y carrito de compra.

## Requisitos Previos

- Node.js 18+
- npm o yarn

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd inditex-test

# Instalar dependencias
npm install
```

## Ejecución del Proyecto

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Build para Producción

```bash
npm run build
npm run start
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con hot-reload
- `npm run build` - Compila el proyecto para producción
- `npm run start` - Inicia el servidor de producción
- `npm test` - Ejecuta la suite de tests (Jest)
- `npm run lint` - Ejecuta TypeScript type checking y Prettier formatting

## Arquitectura

### Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Testing**: Jest + React Testing Library
- **Styling**: Tailwind CSS
- **State Management**: React Context (CartProvider)
- **API Client**: Fetch API con caché local
- **Notificaciones**: React Hot Toast

## Testing

Ejecutar tests:

```bash
npm test
```

## Validación del Código

```bash
# TypeScript type checking
npx tsc --noEmit

# Prettier formatting
npm run lint
```
