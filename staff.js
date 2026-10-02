/* Utilidades compartidas del área de personal (mesero y cocina) */
const CLAVE_PERSONAL = "1234";          // ← contraseña del personal (cámbiala aquí)
const SESION_HORAS = 12;
const $ = (s, r = document) => r.querySelector(s);
const fmt = (n) => "$" + Number(n || 0).toLocaleString("es-CO");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
const ESTADOS = { pendiente: "Sin confirmar", espera: "En espera", recibido: "Recibido", preparando: "Preparándose", listo: "Listo para entrega", entregado: "Entregado" };
const ICONOS = { espera: "⏳", recibido: "📥", preparando: "🔥", listo: "✅", entregado: "🍽️" };
const hoy = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const tMs = (o) => o.confirmadoEn?.toMillis?.() ?? o.confirmadoMs ?? 0;   // hora de llegada a cocina
const mmss = (ms) => { const s = Math.max(0, Math.floor(ms / 1000)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
const itemsHtml = (items) => (items || []).map((i) => `<div class="it"><div class="q">${i.cantidad}×</div><div><div class="nm">${esc(i.nombre)}</div>
  ${(i.sin || []).length || (i.extras || []).length ? `<div class="chips">${(i.sin || []).map((x) => `<span class="chip sin">✗ SIN ${esc(x)}</span>`).join("")}${(i.extras || []).map((e) => `<span class="chip ext">+ ${esc(e.nombre)}</span>`).join("")}</div>` : ""}
  ${i.nota ? `<div class="nota"><b>Nota del cliente</b>${esc(i.nota)}</div>` : ""}</div></div>`).join("");

let audioCtx;
function beep(n = 2) {
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    for (let k = 0; k < n; k++) { const o = audioCtx.createOscillator(), g = audioCtx.createGain(), t = audioCtx.currentTime + k * 0.25;
      o.frequency.value = 880; o.connect(g); g.connect(audioCtx.destination); g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2); o.start(t); o.stop(t + 0.22); }
  } catch (e) {}
}
let toastT;
function toast(msg, good) { const t = $("#toast"); t.textContent = msg; t.classList.toggle("good", !!good); t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 3200); }

/* Contraseña: la pantalla se muestra hasta que se escribe la clave correcta */
function acceso(iniciar) {
  if (+localStorage.getItem("kanayas_acceso") > Date.now()) return iniciar();
  const g = document.createElement("div"); g.className = "gate";
  g.innerHTML = `<form class="gate-card"><h2>Área de personal</h2><p>Ingresa la contraseña para continuar.</p>
    <input type="password" inputmode="numeric" autocomplete="off" placeholder="••••" id="gateIn" autofocus><div class="gate-err" id="gateErr"></div>
    <button class="btn primary" type="submit">Entrar</button><a href="index.html" style="color:inherit;opacity:.6;font-size:.9rem">← Volver a la página</a></form>`;
  document.body.append(g);
  g.querySelector("form").onsubmit = (e) => { e.preventDefault();
    if (g.querySelector("#gateIn").value === CLAVE_PERSONAL) { localStorage.setItem("kanayas_acceso", Date.now() + SESION_HORAS * 3600000); g.remove(); iniciar(); }
    else { g.querySelector("#gateErr").textContent = "Contraseña incorrecta"; const c = g.querySelector(".gate-card"); c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake"); g.querySelector("#gateIn").value = ""; } };
}
const salir = () => { localStorage.removeItem("kanayas_acceso"); location.href = "index.html"; };

/* Pedidos enviados a cocina hoy, ordenados por llegada (los más antiguos primero) */
function escucharPedidos(cb) {
  if (!window.kanayasDb) { cb(null, new Error("Firebase no está configurado. Completa firebase-config.js")); return () => {}; }
  return kanayasDb.collection("pedidos").where("enviadoCocina", "==", true).where("dia", "==", hoy())
    .onSnapshot((s) => cb(s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => tMs(a) - tMs(b))), (e) => cb(null, e));
}
const cambiarEstado = (id, estado) => kanayasDb.collection("pedidos").doc(id).update({ estado, [estado + "Ms"]: Date.now() });
