# Kanayas v4 — Pedidos con Firebase + QR corto

Esta versión cambia el sistema anterior para que el QR sea pequeño: **el QR solo contiene un código como `KAN-20261001-123`**. Los datos completos del pedido se guardan en Firebase Firestore.

## 1. Crear Firebase
1. Entra a Firebase Console y crea un proyecto para Kanayas.
2. Agrega una aplicación Web (`</>`).
3. Copia la configuración que Firebase muestra.
4. Abre `firebase-config.js` y reemplaza los valores `TU_...` por los reales.

## 2. Activar Firestore
En Firebase Console → Firestore Database → Create database.
Para una primera prueba puedes usar el modo de prueba. **Antes de producción cambia las reglas de seguridad** para no dejar la base abierta.

Colección usada por la web: `pedidos`. Cada pedido usa su código como ID del documento.

## 3. Cómo funciona
- Cliente arma el pedido.
- Pulsa `Generar QR para el mesero`.
- La web guarda el pedido en `pedidos/KAN-...`.
- El QR pequeño apunta a `mesero.html?pedido=KAN-...`.
- El mesero escanea el QR y Firebase devuelve el pedido completo.
- También puede escribir o pegar directamente `KAN-...`.

## 4. Importante
La web necesita internet para que cliente y mesero puedan consultar Firebase. La página del mesero necesita HTTPS para usar la cámara (localhost también funciona durante desarrollo).
