var $basePriceShow = $basePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

function $constructor(){

  $('.product-form__buy-buttons').prepend(
      
    '<div class="purchase-summary">'+
      '<div class="purchase-summary__container">'+
        '<h3>Purchase Summary</h3>' +

        '<div class="summary-total">' +
          '<p>Total</p>' +
        '</div>' +
      
        '<div class="summary-tub">' +
          '<p>'+ $productBase +'</p>' +
          '<p class="tub__total">' + $basePriceShow + '</p>' +
        '</div>' +

        '<div class="summary-additional"></div>' +

        '<div class="summary-total-general">' +
    
          '<div class="summary-total-general--continer-line summary-total-general--continer-line__total-tub">' +
            '<p>Total Price</p>' +
            '<p class="summary-total-general--total__tub"></p>' +
          '</div>' +

        '</div>' +

      '</div>' +
    
    '</div>'
  );


  $( ".shopify-block.shopify-app-block .product-personalizer > .pplr-wrapper" ).each(function() {

      var $productIdPhoto = $('.shopify-block.shopify-app-block .product-personalizer').attr('data-id');

      // Variantes de para el texto del Label.
      var $nameLabelText = $(this).find('label.pplrlabel').text();
      var $nameLabel = $.trim($nameLabelText);
      var $nameClass = $nameLabel.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');

      // Texto del Label.
      $(this).find('label.pplrlabel').text("");
      $(this).find('label.pplrlabel').prepend('<span class="name-label-item" data-name-item="'+ $nameLabel +'">' + $nameLabel + ':</span>');
      $(this).find('label.pplrlabel').append('<div class="total-variant-precios-total"><div class="variante"></div><div class="total">Total: </div></div>');

      // Agrupación de variantes.
      $(this).append('<div class="container-variants-pprl"></div>');
      var $generalContentVariant = $(this).find('.container-variants-pprl');
      var $variantsContent = $(this).find('.pplr-drop-item');
      $($variantsContent).each(function() {
        $($generalContentVariant).append($(this));

        var $nameVarText = $(this).attr('data-value');
        var $nameVar = $.trim($nameVarText);
        var $nameVarHandelize = $nameVar.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        
        var $nameImagenPPRL = "VARIANT: " + $nameLabel + " | " + $nameVar;
        var $nameImagenClassPPRL = $nameImagenPPRL.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');

        if($nameVarHandelize == 'i-don-t-need'){
          $(this).prepend('<img src="https://cdn.shopify.com/s/files/1/0018/0142/0861/files/photo-pprl-i-don-t-need.jpg" data-imagen-variant-pprl="'+ $nameImagenClassPPRL +'">');  
        } else {
          $(this).prepend('<img data-imagen-variant-pprl="'+ $nameImagenClassPPRL +'">');  
        };

        
      });

      // Generación de campos en el Summary Purchase.
      $('.product-form__buy-buttons .purchase-summary .summary-additional').append(
        '<div class="summary-additional__row">' +
            '<p class="summary-additional__' + $nameClass + '">'+ $nameLabel +'</p>' +
            '<p class="summary-additional__' + $nameClass + '-type"></p>' +
            '<p class="summary-additional__' + $nameClass + '-price"></p>' +
        '</div>'
      );
    
  });

  
  // Imagenes en Variantes.
  var $validationImages = $(".shopify-section--main-product product-media div[data-selector-media-alt*='VARIANT:']");
  if($validationImages.length > 1){
      $($validationImages).each(function() {
        var $namePhoto = $(this).attr('data-selector-media-alt').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        var $srcImagen = $(this).attr('data-selector-source');
        $('.shopify-block.shopify-app-block .product-personalizer > .pplr-wrapper .pplr-drop-item img[data-imagen-variant-pprl="' + $namePhoto + '"]').attr('src',$srcImagen);
      });
  };
  

  $trigger();
  $TotalPrices();
  
};

function $trigger(){

  $( ".shopify-block.shopify-app-block .product-personalizer > .pplr-wrapper" ).each(function() {

    var $nameLabel = $(this).find('label.pplrlabel .name-label-item').attr('data-name-item');
    var $nameClass = $nameLabel.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');

    var $variantSelect = $(this).find('.container-variants-pprl .pplr-drop-item.active').attr('data-value');
    
    var $valuePriceVariant = parseFloat($(this).find('input').attr('data-pplr_price'));
    var $valueShow = $valuePriceVariant.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    $(this).find('label.pplrlabel .total-variant-precios-total .variante').replaceWith('<div class="variante"> + ' + $valueShow + ' </div>');

    $('.summary-additional__' + $nameClass + '-type').replaceWith('<p class="summary-additional__' + $nameClass + '-type">' + $variantSelect + '</p>');
    $('.summary-additional__' + $nameClass + '-price').replaceWith('<p class="summary-additional__' + $nameClass + '-price">' + $valueShow + '</p>');

    if($valuePriceVariant > 0){
      $('.summary-additional__' + $nameClass).addClass('tag-up-title');
      $('.summary-additional__' + $nameClass + '-type').addClass('tag-up-label');
      $('.summary-additional__' + $nameClass + '-price').addClass('tag-up-price');
    } else {
      $('.summary-additional__' + $nameClass).removeClass('tag-up-title');
      $('.summary-additional__' + $nameClass + '-type').removeClass('tag-up-label');
      $('.summary-additional__' + $nameClass + '-price').removeClass('tag-up-price');
    };

  });

};

function $TotalPrices(){

  var TotalPrice = $basePrice;

  $( ".shopify-block.shopify-app-block .product-personalizer > .pplr-wrapper" ).each(function() {
    var $valuePrice = parseFloat($(this).find('input').attr('data-pplr_price'));
    TotalPrice += $valuePrice
  });

  var TotalPriceGeneral = TotalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  $('.purchase-summary .summary-total-general--total__tub').replaceWith('<p class="summary-total-general--total__tub">'+ TotalPriceGeneral +'</p>');

};

window.addEventListener('pplrAppInitiated' , function(e) {
    $constructor();
});

$(document).on("click",".product-personalizer > .pplr-wrapper .pplr-drop-item",function() {
    $trigger();
    $TotalPrices();
});