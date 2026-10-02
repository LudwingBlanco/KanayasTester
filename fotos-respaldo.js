/* Si una foto no carga, se oculta y se ve el recuadro "Foto próxima". */
window.FOTOS = {};
function imgFallback(i){ if(i.id==='mImg'){ i.style.visibility='hidden'; } else { i.remove(); } }
