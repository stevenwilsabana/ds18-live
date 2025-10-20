// Evento cuando carga la tienda.
$(document).ready(function() {
  $('.product-form .build-set-container .build-set__item').each(function(){

    // Eliminar Divs que no tienen variantes disponibles.
    var $productsAvailables = $(this).find('.container-variant__variants .variants-items');
    if ($productsAvailables.length === 0) {
      $(this).remove();
    };

    // Seleccionar el primer input de cada Div.    
    
    /*var input = $(this).find('.container-variant__variants .variants-items').first().find('input');
    input.prop('checked', true);*/

    var $variantItems = $(this).find('.container-variant__variants .variants-items');
    var input;

    if ($variantItems.hasClass('variants-items--not-include')) {
        input = $variantItems.filter('.variants-items--not-include').first().find('input');
    } else {
        input = $variantItems.first().find('input');
    }

    input.prop('checked', true);


    

    $pricesLine($(this));

    // Seleccionar todos los inputs de las variantes includes.
    var inputIncludes = $(this).find('.container-variant__variants--includes .variants-items input');
    if(inputIncludes){
      inputIncludes.each(function(){
        $(this).prop('checked', true);
      });
      $pricesLineIncludes($(this));
    };
    
  });

  imagenesChanges();
  $renderSummary();
  $summary();
  $totalPrice();

  $('.container-general-prices__regular-prices .price-list .price').show();
});

// Evento cuando cambia de variante.
$('.product-form .build-set-container .build-set__item .container-variant__variants input[type="radio"]').change(function() {
    imagenesChanges();
    $pricesLine($(this).closest('.build-set__item'));
    $summary();
    $totalPrice();
});



// Evento cuando agrega productos en el carrito.
$(document).on('click', '.container-button__add-to-cart #add-build-set', function() {

      var productosData = [];

      var $selectItems = $('.build-set-container .container-variant__variants input:checked');
      $($selectItems).each(function() {
          var $val = $(this).val();
          var $qty = $(this).attr('data-qty');
          if($val != 'offer_not_include'){
            var objeto = {
                id: $val,
                quantity: $qty
            };
            productosData.push(objeto);
          };
      });

      console.log(productosData);

      $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: {
            items: productosData
          },
          dataType: 'json',
          success: function() {
            console.log('Productos agregados al carrito con éxito');
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('Error al agregar los productos al carrito');
          }
        });
  
  });





// Función para cambiar imagenes.

function imagenesChanges() {

  const $buildSetItems = $('.product-form .build-set-container .build-set__item:not(.build-set__item--includes)');
  const $containerImagesBuildSet = $('#container-images-build-set');
  const $containerMainImagen = $('.product__media-item--build-set').first();
  const $imageZoomProductPage = $containerMainImagen.find('img.image-zoom-product-page');
  const $zoomImg = $containerMainImagen.find('img.zoomImg');
  const $thumbnail = $('.product__media-nav .product__thumbnail-list-inner button').first().find('img');


  let images = $buildSetItems.map(function() {
    const item = $(this).find('.container-variants__heading .heading').text().toUpperCase();
    const select = $(this).find('.container-variant__variants input[type="radio"]:checked + label .title').text().toUpperCase();
    return item + ": " + select;
  }).get().join(" | ");

  let $selectedImage = $containerImagesBuildSet.find(`[data-alt="${images}"]`);

  if ($selectedImage.length === 0) {
    const components = images.split(" | ").map(component => component.split(": ")[1]);
    $containerImagesBuildSet.find('[data-alt]').each(function() {
      const altText = $(this).attr('data-alt');
      const matches = components.reduce((acc, component) => acc + (altText.includes(component) ? 1 : 0), 0);
      if (!$selectedImage.length || matches > $selectedImage.data('matches')) {
        $selectedImage = $(this).data('matches', matches);
      }
    });
  }

  console.log(images);

  if ($selectedImage.length) {
    const urlImage = $selectedImage.attr('data-url-image');
    const urlZoom = $selectedImage.attr('data-url-zoom');
    const urlThumbnail = $selectedImage.attr('data-url-thumbnail');

    $imageZoomProductPage.attr('src', urlImage).attr('srcset', urlImage);
    $zoomImg.attr('src', urlZoom);
    $thumbnail.attr('src', urlThumbnail).attr('srcset', urlThumbnail);
  }
};






// Precio en las lineas de las variantes.

function $pricesLine(x){
  var $PriceLoad = parseFloat($(x).find('.container-variant__variants input:checked').attr('data-price')) / 100;
  $(x).find('.container-variant__label .price-value').text($PriceLoad.toLocaleString("en-US", {style: "currency", currency: "USD"}));
};

function $pricesLineIncludes(x){  
  var $inputchecked = $(x).find('.container-variant__variants input:checked');
  var $priceLineGlobal = 0;
  $($inputchecked).each(function(){
    var total = parseFloat($(this).attr('data-price')) / 100;
    $priceLineGlobal += total
  });
  $(x).find('.container-variant__label .price-value').text($priceLineGlobal.toLocaleString("en-US", {style: "currency", currency: "USD"}));
};


// Se muestra el Summary.

function $renderSummary(){
  $('.product-form .build-set-container').after(
    '<div class="summary">' +
      '<div class="summary-container">' +
        '<h3>Purchase Summary</h3>' +
        '<div class="summary-content">' +
          '<div class="item-summary item-summary--heading"><p class="heading">Parts</p><p class="sku">Sku</p><p class="price">Total</p></div>' +
          '<div class="item-summary item-summary--total"><p class="heading">Total Price</p><p class="price price--total"></p></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
};


// Cambios en el Summary.

function $summary(){
  $('.product-form .summary .summary-content .summary-global').remove();
  $('.product-form .summary .summary-content .item-summary--heading').after('<div class="summary-global"></div>');
  $('.product-form .build-set-container .build-set__item').each(function(){

    var $skuIncludes = $(this).find('.container-variant__variants--includes input:checked').attr('data-sku');
    var $heading = $(this).find('.container-variant__label .heading').text();

    if($skuIncludes){
      var $inputchecked = $(this).find('.container-variant__variants--includes input:checked');
      var $priceTotal = 0;
      $($inputchecked).each(function(){
        var total = parseFloat($(this).attr('data-price')) / 100;
        $priceTotal += total
      });
      var $sku = 'All';
      var $price = $priceTotal.toLocaleString("en-US", {style: "currency", currency: "USD"});
    } else {
      var $sku = $(this).find('.container-variant__variants input:checked').attr('data-sku');
      var $price = (parseFloat($(this).find('.container-variant__variants input:checked').attr('data-price')) / 100).toLocaleString("en-US", {style: "currency", currency: "USD"});
    };
    
    var $html = '<div class="item-summary"><p class="heading">'+ $heading +'</p><p class="sku">'+ $sku +'</p><p class="price">'+ $price +'</p></div>';
    $('.product-form .summary .summary-content .summary-global').append($html);
  });
};



// Función para calcular el precio total global.

function $totalPrice() {
  let TotalPrice = 0;
  
  $('.product-form .build-set-container .build-set__item').each(function() {
    
    const $pricesDirect = $(this).find('.container-variant__variants:not(.container-variant__variants--includes) input:checked');
    const $pricesIncluded = $(this).find('.container-variant__variants--includes input:checked');

    $pricesDirect.each(function() {
      TotalPrice += parseFloat($(this).attr('data-price') || 0);
    });

    $pricesIncluded.each(function() {
      TotalPrice += parseFloat($(this).attr('data-price') || 0);
    });
  });

  const TotalPriceGlobal = (TotalPrice / 100).toLocaleString("en-US", {style: "currency", currency: "USD"});
  $('.container-general-prices__regular-prices .price-list .price').text(TotalPriceGlobal);
  $('.product-form .summary .summary-content .item-summary--total .price--total').text(TotalPriceGlobal);
}
