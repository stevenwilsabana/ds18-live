/* Script cuando carga BOOTS */

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.classList.contains('boost-sd-container')) {

            setTimeout(function() {
              $('.boost-sd__product-item').each(function(){
                var $selector = $(this).find('.boost-sd__product-price');
                var $priceRegular = $(this).find('.boost-sd__product-price .boost-sd__format-currency:first-child span').text();
                var $priceRegularNumber = parseFloat($priceRegular.replace(/[^\d.]/g, ''));
                var $priceDiscount = ((100 - 15) / 100);
                var $priceOffertNumber = ($priceRegularNumber * $priceDiscount).toFixed(2);
                var $priceOffert = parseFloat($priceOffertNumber).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
                $($selector).after(
                  '<div class="boost-sd__product-price--ofert" style="display: none;">' +
                    '<p class="variant-a__with-prices"><span class="label">15% OFF</span><span class="offer">'+ $priceOffert +'</span><span class="regular">'+ $priceRegular +'</span></p>' +
                    '<div class="variant-b__without-prices"><p><span class="label">15% OFF</span><span class="price-regular">'+ $priceRegular +'</span></p><p class="text-offer">FINAL PRICE WILL BE REFLECTED IN THE CART.</p></div>' +
                  '</div>'
                );

                let labelsCustom = $(this).find('.boost-sd__product-label--customLabelByTag');
                if (labelsCustom.length > 0) {
                  labelsCustom.each(function(){
                    let textLabel = $(this).find('.boost-sd__product-label-text').text().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/^-+|-+$/g, '');
                    $(this).addClass('boost-sd__product-label--' + textLabel);
                  });
                };
                
              });
              if (typeof imagesCollectionPage === 'function') {imagesCollectionPage();} else {console.log('La función no existe.');};
            }, 1000);

            observer.disconnect();
            return;
          }
        }
      }
    }
  });
  
  const config = { childList: true, subtree: true };
  const targetNode = document.querySelector('.boost-sd__filter-block');
  observer.observe(targetNode, config);



/* Script cuando se cambian filtros en BOOTS */

  function $GloboLoad(mutationsList, $observerGlobo) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if ($(mutation.target).is('.boost-sd-container .boost-sd__product-list')) {
          
          $('.boost-sd__product-item').each(function(){
            var $selector = $(this).find('.boost-sd__product-price');
            var $conditional = $(this).find('.boost-sd__product-price--ofert');
            var $priceRegular = $(this).find('.boost-sd__product-price .boost-sd__format-currency:first-child span').text();
            var $priceRegularNumber = parseFloat($priceRegular.replace(/[^\d.]/g, ''));
            var $priceDiscount = ((100 - 15) / 100);
            var $priceOffertNumber = ($priceRegularNumber * $priceDiscount).toFixed(2);
            var $priceOffert = parseFloat($priceOffertNumber).toLocaleString('en-US', {style: 'currency',currency: 'USD'});
            if (!$conditional.length){
              $($selector).after(
                '<div class="boost-sd__product-price--ofert" style="display: none;">' +
                  '<p class="variant-a__with-prices"><span class="label">15% OFF</span><span class="offer">'+ $priceOffert +'</span><span class="regular">'+ $priceRegular +'</span></p>' +
                  '<div class="variant-b__without-prices"><p><span class="label">15% OFF</span><span class="price-regular">'+ $priceRegular +'</span></p><p class="text-offer">FINAL PRICE WILL BE REFLECTED IN THE CART.</p></div>' +
                '</div>'
              );
            };


            let labelsCustom = $(this).find('.boost-sd__product-label--customLabelByTag');
            if (labelsCustom.length > 0) {
              labelsCustom.each(function(){
                let textLabel = $(this).find('.boost-sd__product-label-text').text().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/^-+|-+$/g, '');
                $(this).addClass('boost-sd__product-label--' + textLabel);
              });
            };

            
          });
          if (typeof imagesCollectionPage === 'function') {imagesCollectionPage();} else {console.log('La función no existe.');};          
        }
      }
    }
  };
  
  const $observerGlobo = new MutationObserver($GloboLoad);
  const $configGlobo = { childList: true, subtree: true };
  $observerGlobo.observe(document.body, $configGlobo);