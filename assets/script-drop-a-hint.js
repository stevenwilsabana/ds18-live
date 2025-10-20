$('.modal-drop-a-hint__overflow, .modal-drop-a-hint__content-close').click(function(){
  $('.modal-drop-a-hint').hide();
});

$(document).on("click",".drop-a-hint__button",function() {
  $('.modal-drop-a-hint').css('display','flex');
});


/* FUNCIÓN PARA CAMBIAR IMAGENES Y TEXTOS EN EL DROP A HINT */

function renderDropAHint(id){
  var $imagen = $('.content-all-variants [data-id="' + id + '"]').attr('data-image-url');
  var $product = $('.content-all-variants [data-id="' + id + '"]').attr('data-product');
  var $variant = $('.content-all-variants [data-id="' + id + '"]').attr('data-variant');
  $(".modal-drop-a-hint__content-product-imagen img").attr("src",$imagen);
  $(".variant-product-drop").text($variant);

  if($variant == 'Default Title'){
    $(".variant-product-drop").hide();
  }
  
};


/* FUNCIÓN PARA CARGAR DROP A HINT */

$(document).ready(function() {
  var $id = $('.product-form__buy-buttons .shopify-product-form input[name="id"]').val();
  renderDropAHint($id);
  $('.quantity-buy-container.container-uniq-form-ds .product-form__quantity').append('<div class="buttons-container-drop-a-hint"></div>');
  $('.buttons-container-drop-a-hint').append("<div class='drop-a-hint'><span class='drop-a-hint__button button button--full button--primary'>Drop a Hint</span></div>");  
});


/* FUNCIÓN CUANDO SE CAMBIA LA VARIANTE */

$('.product-form__buy-buttons .shopify-product-form input[name="id"]').on('change', function() {
    var $id = $(this).val();
    console.log('Load Variant: ' + $id);
    renderDropAHint($id);
});


/* ENVIO DE INFORMACIÓN A KLAVIYO */

window.addEventListener("klaviyoForms", function(e) {
  if (e.detail.type == 'submit' && e.detail.formId == 'XhjP5D') {
    var $urlProduct = window.location.href;
    var $ProductName = $('.modal-drop-a-hint__content-product-title .title-product-drop').text();
    var $ProductVariant = $('.modal-drop-a-hint__content-product-title .variant-product-drop').text();

    if($ProductVariant != 'Default Title'){
       var $nameProduct = $ProductName + ': ' + $ProductVariant;
    } else {
      var $nameProduct = $ProductName;
    };
    
    var $urlImgProduct = "https:" + $('.modal-drop-a-hint__content-product-imagen img').attr('src');
    _learnq.push(['track', 'Drop a Hint', {
      'RecipientName': e.detail.metaData.RecipientName,
      'RecipientEmail': e.detail.metaData.$email,
      'SenderName' : e.detail.metaData.senderName,
      'SenderEmail' : e.detail.metaData.senderEmail,
      'UrlProduct':  $urlProduct,
      'NameProduct': $nameProduct,
      'ImgProduct': $urlImgProduct
    }]);

    // alert('Form Submit');
  }
});