$(document).on("click","button#favorites",function() {
    // console.log('Botón #favorites clickeado');

    const shadowHost = $('.gw-widget-placeholder-RC-wrapper .gw-widget-placeholder-RC > div')[0];

    if (!shadowHost) {
        // console.log('❌ Shadow host no encontrado');
        return;
    }
    // console.log('✅ Shadow host encontrado:', shadowHost);

    // Función para buscar el botón dentro del shadow-root
    const clickShadowButton = () => {
      const shadowButton = shadowHost.shadowRoot.querySelector('.gw-drawer-open-btn'); // Usamos querySelector nativo
  
      if (shadowButton) {
          // console.log('✅ Botón dentro del shadow-root encontrado:', shadowButton);
          shadowButton.click(); // Ejecutamos click() con JavaScript puro
          // console.log('🚀 Botón dentro del shadow-root clickeado');
          return true;
      }
  
      // console.log('❌ Botón dentro del shadow-root NO encontrado, esperando...');
      return false;
  };


    // Intentar hacer click inmediatamente si ya está cargado
    if (clickShadowButton()) return;

    // console.log('⏳ Botón aún no está disponible, activando MutationObserver...');

    const observer = new MutationObserver(() => {
        // console.log('🔄 Mutación detectada en el shadow-root...');
        if (clickShadowButton()) {
            // console.log('✅ Botón encontrado tras mutación, desconectando observer');
            observer.disconnect();
        }
    });

    // Observar cambios dentro del shadow-root
    observer.observe(shadowHost.shadowRoot, { childList: true, subtree: true });
});






const observerOuter = new MutationObserver(() => {
    const outerShadowHost = document.querySelector('.gw-wl-drawer-widget-placeholder');

    if (outerShadowHost) {
        // console.log('✅ Outer shadow-root encontrado, activando observer para el inner-shadow-root.');

        // Ahora observamos el primer shadow-root hasta que el segundo shadow-root se cargue
        const observerInner = new MutationObserver(() => {
            const innerShadowHost = outerShadowHost.shadowRoot?.querySelector('.gw-wl-widget-container');

            if (innerShadowHost) {
                // console.log('✅ Inner shadow-root encontrado, aplicando estilos.');

                // Insertar estilos en el segundo shadow-root
                const style = document.createElement('style');
                style.textContent = `
                    .gw-wl-item {
                      align-items: center!important;
                    }
                
                    .gw-wl-item .gw-wl-item-content .gw-wl-item-content__footer .gw-wl-item-content__price-block {
                        display: none !important;
                    }

                    .gw-wl-item .gw-wl-item-content .gw-wl-item-content__footer .gw-wl-add-to-cart-btn {
                        margin-top: 10px!important;
                    }
                `;
                innerShadowHost.shadowRoot.appendChild(style);
                // console.log('✅ Estilos insertados dentro del shadow-root anidado.');

                // Desconectar el observer del inner-shadow
                observerInner.disconnect();
            }
        });

        // Observar cambios dentro del primer shadow-root
        observerInner.observe(outerShadowHost.shadowRoot, { childList: true, subtree: true });

        // Una vez que encontramos el outerShadowHost, ya no necesitamos observar el documento
        observerOuter.disconnect();
    }
});

// Observar el `document.body` en busca de `.gw-wl-drawer-widget-placeholder`
observerOuter.observe(document.body, { childList: true, subtree: true });
