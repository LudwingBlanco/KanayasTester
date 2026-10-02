# Código de 5 dígitos

1. El cliente arma su pedido, escoge su mesa y toca **Generar mi código para el mesero**.
   Se guarda el pedido en Firebase (`pedidos/KAN-…`) con un campo `codigo5` y estado `pendiente`.
2. El mesero abre `mesero.html`, escribe los 5 números y revisa el pedido (mesa, platos, quitados, extras, notas).
3. Toca **Enviar a cocina**: el pedido pasa a `espera` y aparece en `cocina.html`. El resto del flujo
   (recibido, preparándose, listo, entregado, admin) no cambia.

Notas
- El código solo se busca entre pedidos *pendientes*; al enviarse a cocina queda libre para reutilizarse más adelante.
- Al crear un código se verifica que ningún otro pedido pendiente tenga el mismo.
- Reglas de Firestore: deben permitir leer y escribir en `pedidos` (las consultas por `codigo5` + `estado` no necesitan índices).
