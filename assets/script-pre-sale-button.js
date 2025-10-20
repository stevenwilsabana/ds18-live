$(document).ready(function() {
  const targetNodesPreOrder = document.querySelectorAll('product-payment-container[data-selector="product-main-form"] .loader-button__text');

  // Crea un setInterval para verificar y cambiar el texto cada cierto tiempo
  const intervalPreOrder = setInterval(function() {
    targetNodesPreOrder.forEach(function(targetNode) {
      // Cambia el texto solo si es necesario
      if (targetNode.textContent !== 'PRE-ORDER') {
        targetNode.textContent = 'PRE-ORDER';
      }
    });
  }, 500); // Cambia cada medio segundo si es necesario

  // Detenemos el intervalo después de 10 segundos (ajusta si es necesario)
  setTimeout(function() {
    clearInterval(intervalPreOrder); // Detenemos la reaplicación después de un tiempo
  }, 10000); // 10 segundos debería ser suficiente para asegurar que todos los scripts hayan terminado de modificar el botón
});
