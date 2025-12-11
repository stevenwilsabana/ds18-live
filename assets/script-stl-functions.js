document.addEventListener("DOMContentLoaded", function() {

  $('.product-stl__slider .container-images').each(function(){
    $(this).slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $(this).closest('.product-stl__slider').find('.back-arrow'),
      nextArrow: $(this).closest('.product-stl__slider').find('.next-arrow'),
      arrows: true,
      dots: true
    });
  });

  function normalizeImageSrc(src) {
    var url = src.split('?')[0];
    url = url.replace(/_(small|medium|large|grande|original|500x|1000x)\./, '.');
    return url;
  }

  
  function updateVariant($variantElement) {
    var $productStl = $variantElement.closest('.product-stl');
    var selectedOption = $variantElement.is('select') ? $variantElement.find('option:selected') : $variantElement;
    var imageId = selectedOption.data('image-id');
    var imageSrc = selectedOption.data('image');
    var price = selectedOption.data('price');
    var comparePrice = selectedOption.data('compare-price');
    var inventory = selectedOption.data('inventory');
    var continueSelling = selectedOption.data('continue-selling') === 'true';
  
    var $slider = $productStl.find('.product-stl__slider .container-images');
    var slideIndex = 0; // Índice por defecto si no se encuentra la imagen
  
    if (imageId) {
      // Buscar el índice del slide con el data-image-id correspondiente
      $slider.find('.product-stl__image').each(function(index) {
        var dataImageId = $(this).data('image-id');
        if (dataImageId == imageId) {
          slideIndex = index;
          return false; // Salir del each
        }
      });
    } else if (imageSrc) {
      // Fallback: buscar por src de la imagen
      $slider.find('.product-stl__image img').each(function(index) {
        var src = $(this).attr('src');
        if (normalizeImageSrc(src) == normalizeImageSrc(imageSrc)) {
          slideIndex = index;
          return false; // Salir del each
        }
      });
    }
  
    // Mover el slider al índice encontrado
    $slider.slick('slickGoTo', slideIndex);
  
    // Actualizar precios y disponibilidad como antes
    var $prices = $productStl.find('.prices');
    $prices.find('.regular').text(price);
    
    if (comparePrice && comparePrice !== price) {
      $prices.find('.offert').text(comparePrice);
    } else {
      $prices.find('.offert').text('');
    }
  
    var $quantityInput = $productStl.find('.quantity-input');
    if (continueSelling || inventory === null) {
      $quantityInput.attr('max', '');
    } else {
      $quantityInput.attr('max', inventory);
    }
  
    var currentQuantity = parseInt($quantityInput.val(), 10);
    var maxQuantity = $quantityInput.attr('max') ? parseInt($quantityInput.attr('max'), 10) : Infinity;
    if (currentQuantity > maxQuantity) {
      $quantityInput.val(maxQuantity);
    }
  }

  function formatMoney(amount) {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  function updateSummaryTotal() {
    var total = 0;
    var $itemsContainer = $('#summary-stl .container-summary .items');
    var $noItemsMessage = $('#summary-stl .container-summary .no-items');

    // Verificar si hay elementos en el resumen
    if ($itemsContainer.find('.item').length === 0) {
      $noItemsMessage.show();
    } else {
      $noItemsMessage.hide();
    }

    $itemsContainer.find('.item').each(function() {
      var $item = $(this);
      var itemTotalText = $item.find('.total p').text();
      var itemTotal = parseFloat(itemTotalText.replace(/[^0-9.-]+/g,""));
      total += itemTotal;
    });
    $('#summary-stl .total .result').text(formatMoney(total));
  }

  function updateItemTotal($item) {
    var quantity = parseInt($item.find('.quantity-input').val(), 10);
    var pricePerUnit = parseFloat($item.data('price'));

    var newTotalPrice = pricePerUnit * quantity;
    $item.find('.total p').text(formatMoney(newTotalPrice));

    updateSummaryTotal();
  }

  function initializeSummaryItem($item, selectedOption) {
    var variantId = $item.data('variant-id');

    var inventory = selectedOption.data('inventory');
    var continueSelling = selectedOption.data('continue-selling') === 'true';

    var $quantityInput = $item.find('.quantity-input');
    var $quantityDecrease = $item.find('.quantity-decrease');
    var $quantityIncrease = $item.find('.quantity-increase');

    if (continueSelling || inventory === null) {
      $quantityInput.attr('max', '');
    } else {
      $quantityInput.attr('max', inventory);
    }

    $quantityDecrease.on('click', function() {
      var currentVal = parseInt($quantityInput.val(), 10) || 1;
      var minVal = parseInt($quantityInput.attr('min'), 10) || 1;
      if (currentVal > minVal) {
        $quantityInput.val(currentVal - 1);
        updateItemTotal($item);
      }
    });

    $quantityIncrease.on('click', function() {
      var currentVal = parseInt($quantityInput.val(), 10) || 1;
      var maxVal = $quantityInput.attr('max') ? parseInt($quantityInput.attr('max'), 10) : Infinity;
      if (currentVal < maxVal) {
        $quantityInput.val(currentVal + 1);
        updateItemTotal($item);
      }
    });

    $quantityInput.on('input', function() {
      var currentVal = parseInt($quantityInput.val(), 10) || 1;
      var minVal = parseInt($quantityInput.attr('min'), 10) || 1;
      var maxVal = $quantityInput.attr('max') ? parseInt($quantityInput.attr('max'), 10) : Infinity;

      if (currentVal < minVal) {
        $quantityInput.val(minVal);
      } else if (currentVal > maxVal) {
        $quantityInput.val(maxVal);
      } else {
        $quantityInput.val(currentVal);
      }
      updateItemTotal($item);
    });

    $item.find('.remove button').on('click', function() {

      var containerVariantId = $item.data('container-id');
      var containerVariantIdAdditional = $item.data('variant-id');
      
      if(containerVariantId == "7052967641149"){
        
        // FUNCIÓN PARA ELIMINAR LA BOLITA QUE TIENE EXACTAMENTE EL MISMO SELECTOR DE PRODUCTO 👇
        var selectorVariantIdEspecial = $item.data('identifier');
        $('.shop-the-look__product-wrapper[data-product="' + selectorVariantIdEspecial + '"]').removeClass('selected-product');
        
      } else if(containerVariantId == '7054116814909'){

        // FUNCIÓN PARA ELIMINAR LA BOLITA SI EL PRODUCTO TIENE VARIANTES 👇
        var countItemsSimilar = $('#summary-stl .items .item[data-container-id="' + containerVariantId + '"]').length;
        if (countItemsSimilar <= 1) {
          $('.shop-the-look__product-wrapper[data-product-selector="' + containerVariantId + '"]').removeClass('selected-product');
        }
        
      } else if (containerVariantId == '7521673379901' || containerVariantId == '7531374903357'){
        
        $('#product-aditional-stl .shop-the-look__product-wrapper--additional[data-product-selector="' + containerVariantId + '"]').slideDown();
        $('#product-aditional-stl .shop-the-look__product-wrapper--additional[data-product-selector="' + containerVariantId + '"]').addClass('active-add-ons');
        
        checkActiveAddsOns();
        
      } else {

        // FUNCIÓN PARA ELIMINAR LA BOLITA DEL MISMO PRODUCTO SIN IMPORTAR SI ESTA MÁS DE UNA VEZ (PRODUCTO IGUAL EN LADOS DIFERENTES) 👇
        $('.shop-the-look__product-wrapper[data-product-selector="' + containerVariantId + '"]').removeClass('selected-product');  
      }

      
      $item.remove();
      updateSummaryTotal();
    });
  }

  function initializeProduct($productStl) {
    var $variantElement = $productStl.find('select, input[type="hidden"]');

    updateVariant($variantElement);

    if ($variantElement.is('select')) {
      $variantElement.on('change', function() {
        updateVariant($(this));
      });
    }

    var $quantityInput = $productStl.find('.quantity-input');
    var $quantityDecrease = $productStl.find('.quantity-decrease');
    var $quantityIncrease = $productStl.find('.quantity-increase');
    var $addToCart = $productStl.find('.add-product-stl');

    $productStl.on('click', '.quantity-decrease', function () {
      var $quantityInput = $(this).closest('.product-stl').find('.quantity-input');
      var currentVal = parseInt($quantityInput.val(), 10) || 1;
      var minVal = parseInt($quantityInput.attr('min'), 10) || 1;
      if (currentVal > minVal) {
        $quantityInput.val(currentVal - 1);
      }
    });

    $productStl.on('click', '.quantity-increase', function () {
      var $quantityInput = $(this).closest('.product-stl').find('.quantity-input');
      var currentVal = parseInt($quantityInput.val(), 10) || 1;
      var maxVal = $quantityInput.attr('max') ? parseInt($quantityInput.attr('max'), 10) : Infinity;
      if (currentVal < maxVal) {
        $quantityInput.val(currentVal + 1);
      }
    });

    $productStl.on('input', '.quantity-input', function () {
      var $quantityInput = $(this);
      var currentVal = parseInt($quantityInput.val(), 10) || 1;
      var minVal = parseInt($quantityInput.attr('min'), 10) || 1;
      var maxVal = $quantityInput.attr('max') ? parseInt($quantityInput.attr('max'), 10) : Infinity;
  
      if (currentVal < minVal) {
          $quantityInput.val(minVal);
      } else if (currentVal > maxVal) {
          $quantityInput.val(maxVal);
      } else {
          $quantityInput.val(currentVal);
      }
    });

    $productStl.on('click', '.add-product-stl', function (e) {

      e.preventDefault();

      var $button = $(this);
      var $productStl = $button.closest('.product-stl');
      var $variantElement = $productStl.find('select, input[type="hidden"]');
      var variantId = $variantElement.val();
      var quantity = parseInt($productStl.find('.quantity-input').val(), 10);

      var selectedOption = $variantElement.is('select') ? $variantElement.find('option:selected') : $variantElement;
      var imageSrc = selectedOption.data('image');
      var price = selectedOption.data('price');
      var priceValue = parseFloat(price.replace(/[^0-9.-]+/g,""));
      var title = $productStl.find('.title').text().trim();
      var variantTitle = selectedOption.text().trim();

      var notes = $productStl.find('.disclaimer').html();
      

      // Obtener el contenedor y agregar la clase
      
      var containerVariant = $(this).parents('.shop-the-look__product-wrapper');
      var containerVariantIdSelector = containerVariant.attr('data-product-selector');

      if(containerVariantIdSelector == '7052967641149'){
        
        // FUNCIÓN PARA SELECCIONAR SOLO UNA BOLITA DEL MISMO PRODUCTO 👇
        var selectorEspecialProduct = containerVariant.attr('data-product');
        $('.shop-the-look__product-wrapper[data-product="' + selectorEspecialProduct + '"]').addClass('selected-product');
        var $existingItem = $('#summary-stl .container-summary .items .item[data-identifier="' + selectorEspecialProduct + '"]');
        
      } else if (containerVariantIdSelector == '7054116814909'){

        // FUNCIÓN PARA SELECCIONAR BOLITAS QUE TIENEN PRODUCTOS CON VARIANTES 👇
        var selectorEspecialProduct = containerVariant.attr('data-product-selector') + '-' + variantId;
        $('.shop-the-look__product-wrapper[data-product-selector="' + containerVariantIdSelector + '"]').addClass('selected-product');
        var $existingItem = $('#summary-stl .container-summary .items .item[data-variant-id="' + variantId + '"]');


      } else {

        if (containerVariantIdSelector) {
            $('.shop-the-look__product-wrapper[data-product-selector="' + containerVariantIdSelector + '"]').addClass('selected-product');
        }
        
        if (variantId) {
            var $existingItem = $('#summary-stl .container-summary .items .item[data-variant-id="' + variantId + '"]');
        }
        
      }


      if(!containerVariantIdSelector){
        var productAdditionalContainer = $(this).parents('.shop-the-look__product-wrapper--additional');
        var productAdditionalSelector = productAdditionalContainer.attr('data-product-selector');
        if (productAdditionalSelector == '7521673379901'){
          $('.shop-the-look__product-wrapper--additional[data-product-selector="7521673379901"]').slideUp();
        } else if (productAdditionalSelector == '7531374903357'){
          $('.shop-the-look__product-wrapper--additional[data-product-selector="7531374903357"]').slideUp();
        }

        productAdditionalContainer.removeClass('active-add-ons');

        checkActiveAddsOns();

      }
      

      // Obtener el data-product
      var containerVariantId = containerVariant.attr('data-product-selector');
      

      if ($existingItem.length > 0) {
        // Actualizar la cantidad y el total del producto existente
        var $qtyInput = $existingItem.find('.quantity-input');
        var existingQty = parseInt($qtyInput.val(), 10);
        var newQty = existingQty + quantity;

        $qtyInput.val(newQty);
        updateItemTotal($existingItem);
      } else {
        // Crear un nuevo elemento en el resumen con data-container-id
        if(containerVariantIdSelector == '7052967641149' || containerVariantIdSelector == '7054116814909'){
          
          // FUNCIÓN PARA CREAR UN PRODUCTO EN EL SUMMARY QUE ES IGUAL O QUE TIENE VARIANTES DE PRODUCTO 👇
          var $item = $('<div class="item" data-identifier="'+ selectorEspecialProduct +'" data-variant-id="' + variantId + '" data-price="' + priceValue + '" data-container-id="' + containerVariantId + '"></div>');
        
        } else if (productAdditionalSelector == '7521673379901' || productAdditionalSelector == '7531374903357'){
          
          // FUNCIÓN PARA CREAR UN PRODUCTO ADD-ONS 👇
          var $item = $('<div class="item" data-variant-id="' + variantId + '" data-price="' + priceValue + '" data-container-id="' + productAdditionalSelector + '"></div>');  
        
        } else {
          // FUNCIÓN PARA CREAR UN PRODUCTO EN EL SUMMARY NORMAL 👇
          var $item = $('<div class="item" data-variant-id="' + variantId + '" data-price="' + priceValue + '" data-container-id="' + containerVariantId + '"></div>');  
        }
        

        var itemContent = '<div class="container-details-imagen">'+
                          '<div class="imagen"><img src="' + imageSrc + '"></div>' +
                          // '<div class="title"><p>' + title + ' - ' + variantTitle + '</p></div>' +
                          '<div class="title"><p>' + title +'</p>';

        if (notes && $.trim(notes) !== '') {
          itemContent += '<p class="disclaimer-content"><span>NOTES: </span>' + notes + '</p>';
        };
        
        itemContent += '</div>' +
                          '</div>' +
                          '<div class="container-details-qty">'+
                          '<div class="qty">' +
                            '<button type="button" class="quantity-decrease">-</button>' +
                            '<input type="number" class="quantity-input" value="' + quantity + '" min="1" max="" readonly>' +
                            '<button type="button" class="quantity-increase">+</button>' +
                          '</div>' +
                          '<div class="total"><p>' + formatMoney(priceValue * quantity) + '</p></div>' +
                          '</div>' +
                          '<div class="remove"><button type="button"><i class="fa-solid fa-trash"></i> Remove</button></div>';
        

        $item.html(itemContent);

        // Agregar el nuevo elemento al resumen
        $('#summary-stl .container-summary .items').append($item);

        // Inicializar controles de cantidad y botón de eliminar
        initializeSummaryItem($item, selectedOption);
      }

      // Actualizar el total general del resumen
      updateSummaryTotal();

      // Simular clic fuera de la sección o cerrar el modal
      closeModal($button);

      // Desplazar suavemente hacia #summary-stl
      if (isDesktop()) {
      } else {
        // Comportamiento en mobile
        // Desplazar suavemente hacia #summary-stl
        $('html, body').animate({
          scrollTop: $('#summary-stl').offset().top - 120
        }, 500);
      }
      
    });
  }

  function closeModal($triggerButton) {
    if (isDesktop()) {
      var $productWrapper = $triggerButton.closest('.shop-the-look__product-wrapper');
      var $desktopButton = $productWrapper.find('button[data-device="desktop"]');
      $desktopButton.trigger('click');
    } else {
      $('.popover__overlay').trigger('click');
    }
  }

  function isDesktop() {
    return window.innerWidth >= 1000;
  }


  // Inicializar productos al cargar la página
  $('.product-stl').each(function() {
    initializeProduct($(this));
  });

  $('#summary-stl .add-to-cart-global').on('click', function(e) {
    e.preventDefault();

    var buttonAddToCart = $(this).find('span');
    buttonAddToCart.text('ADDING...');

    var items = [];

    $('#summary-stl .container-summary .items .item').each(function() {
      var $item = $(this);
      var variantId = $item.data('variant-id');
      var quantity = parseInt($item.find('.quantity-input').val(), 10);

      items.push({
        id: variantId,
        quantity: quantity
      });
    });

    if (items.length > 0) {
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: JSON.stringify({ items: items }),
        dataType: 'json',
        contentType: 'application/json',
        success: function() {
          buttonAddToCart.text('ADD ITEMS TO CART');
        },
        error: function(xhr, status, error) {
          var response = JSON.parse(xhr.responseText);
          alert(response.description || 'Hubo un error al agregar los productos al carrito.');
        }
      });
    } else {
      buttonAddToCart.text('ADD ITEMS TO CART');
      alert('There are no products in the summary to add to the cart.');
    }
  });
});



function checkActiveAddsOns() {
  setTimeout(function() { 
    let hasActive = $('#product-aditional-stl .container-add-ons > .shop-the-look__product-wrapper--additional.active-add-ons').length > 0;
    if (hasActive) {
      // console.log('Al menos un elemento tiene la clase .active-add-ons');
      $('#product-aditional-stl').show();
    } else {
      // console.log('Ningún elemento tiene la clase .active-add-ons');
      $('#product-aditional-stl').hide();
    }
  }, 300);
}

