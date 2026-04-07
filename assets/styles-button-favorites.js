if (typeof wishlistEnhancerLoaded === 'undefined') {
  const wishlistEnhancerLoaded = true;

  const wishlistTargetSelector = '.product-payment-container .gw-wl-add-to-wishlist-placeholder';
  const wishlistButtonClass = 'button.gw-btn.whislists-b2b.gw-btn--block';

  const observer = new MutationObserver((mutations) => {
    const hostElements = document.querySelectorAll(wishlistTargetSelector);

    hostElements.forEach((hostElement) => {
      if (hostElement.shadowRoot) {
        const shadow = hostElement.shadowRoot;
        const innerElement = shadow.querySelector(wishlistButtonClass);

        if (innerElement && !shadow.querySelector('style[data-injected="wishlist-style"]')) {
          const styleTag = document.createElement('style');
          styleTag.setAttribute('data-injected', 'wishlist-style');
          styleTag.textContent = `
            ${wishlistButtonClass} {
              width: 100%!important;
              padding: 0!important;
              font-weight: 600!important;
              font-size: 14px!important;
              max-height: 49px!important;
              min-height: 49px!important;
              display: flex!important;
              justify-content: center!important;
              border-radius: 5px!important;
              border: #de2a2a solid 1px!important;
              font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
              text-transform: uppercase!important;
              color: #de2a2a!important;
              background: transparent!important;
              cursor: pointer!important;
            }
          `;
          shadow.appendChild(styleTag);
          console.log('✅ Estilo aplicado en shadowRoot:', hostElement);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
