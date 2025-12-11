document.addEventListener("DOMContentLoaded", function() {
  $('.quantity-buy-container.container-uniq-form-ds .product-form__quantity').before('<div class="show-quantity" style="display:none;"><p><i class="fa-solid fa-dolly"></i><span>Availability:</span><span class="stock"></span></p></div>');
  var variantSelect = $('.product-form__buy-buttons .shopify-product-form input[name="id"]').val();
  $changeVariantEvent(variantSelect);
});

$('.product-form__buy-buttons .shopify-product-form input[name="id"]').change(function() {
    var variantSelect = $(this).val();
    $changeVariantEvent(variantSelect);
});

function $changeVariantEvent(x){
  var $selectorVariant = $('.container-general-prices__ab-test-prices .variants-prices-script').find('span[data-variant-id=' + x + ']');
  var $id = $($selectorVariant).attr('data-variant-id');
  var $available = $($selectorVariant).attr('data-available');
  var $quantity = $($selectorVariant).attr('data-quantity');
  var $priceRegular = $($selectorVariant).attr('data-price-regular');
  var $priceCrossed = $($selectorVariant).attr('data-price-crossed');

  if ($available == 'false'){
    $('.product-form .show-quantity .stock').text('0 Items');
    $('.container-back-in-stock__klaviyo').show();
    $('.container-general-prices').addClass('hiden-prices-sold-out');
    setTimeout(function() {$('#StickyAddToCart .loader-button__text').html('Sold Out<b> - ' + $priceCrossed + '</b>');}, 500);
  } else {

    if($quantity <= 0){
      $('.product-form .show-quantity .stock').text('15 Items');
    } else if ($quantity == 1){
      $('.product-form .show-quantity .stock').text('1 Item');
    } else if ($quantity > 1){
      $('.product-form .show-quantity .stock').text($quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' Items');
    };
    
    $('.container-back-in-stock__klaviyo').hide();
    $('.container-general-prices').removeClass('hiden-prices-sold-out');
    setTimeout(function() {$('#StickyAddToCart .loader-button__text').html('Add to Cart<b> - ' + $priceCrossed + '</b>');}, 500);
  };
  
  $('.container-general-prices__ab-test-prices .container-prices .crossed-out-price .price').text($priceCrossed);
  $('.container-general-prices__ab-test-prices .container-prices .price-regular .price').text($priceRegular);

};