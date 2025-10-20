$( document ).ready(function() {
  
  function $pricesOffer(x){
    var sumTotal = 0;
    var allProducts = 0;
    var qtySelect = $(x).find('.container-product-item.active-add-to-cart').length;

    var totalSelectSection = $(x).find('.container-product-item .variants-product-stl select');
    $(totalSelectSection).each(function( index ) {
      var $val = '.class-' + $( this ).val();
      var $priceTotal = $($val).data('total');
      allProducts += Number($priceTotal);
    });

    var selectSection = $(x).find('.container-product-item.active-add-to-cart .variants-product-stl select');
    $(selectSection).each(function( index ) {
      var $val = '.class-' + $( this ).val();
      var $priceTotal = $($val).data('total');
      sumTotal += Number($priceTotal);
    });

    
    if( qtySelect <= 0 ){
      var total = (sumTotal/100);
      var offer = total * (1);
      var discount = '0% Off';
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__discount').addClass('remove-discount');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-total').addClass('price-total-only');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-offert').addClass('remove-price-offert');
      $(x).find('.add-to-cart-stl .disclaimer').addClass('remove-disclaimer');
      $(x).find('.add-to-cart-stl button.add-all').addClass('remove-button-add-to-cart');
    } else if( qtySelect > 0 && qtySelect <=1){
      var total = (sumTotal/100);
      var offer = total * (1);
      var discount = '0% Off';
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__discount').addClass('remove-discount');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-total').addClass('price-total-only');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-offert').addClass('remove-price-offert');
      $(x).find('.add-to-cart-stl .disclaimer').addClass('remove-disclaimer');
      $(x).find('.add-to-cart-stl button.add-all').removeClass('remove-button-add-to-cart');
    } else if( qtySelect > 1 && qtySelect <=2 ){
      var total = (sumTotal/100);
      var offer = total * (1 - 0.10);
      var discount = '10% Off';
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__discount').removeClass('remove-discount');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-total').removeClass('price-total-only');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-offert').removeClass('remove-price-offert');
      $(x).find('.add-to-cart-stl .disclaimer').removeClass('remove-disclaimer');
      $(x).find('.add-to-cart-stl button.add-all').removeClass('remove-button-add-to-cart');
    } else if( qtySelect > 2 ){
      var total = (sumTotal/100);
      var offer = total * (1 - 0.15);
      var discount = '15% Off';
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__discount').removeClass('remove-discount');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-total').removeClass('price-total-only');
      $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-offert').removeClass('remove-price-offert');
      $(x).find('.add-to-cart-stl .disclaimer').removeClass('remove-disclaimer');
      $(x).find('.add-to-cart-stl button.add-all').removeClass('remove-button-add-to-cart');
    };

    var htmlTotal = '$' + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD';
    var htmlOffer = '$' + offer.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD';
    var htmlDiscount = discount;

    var selectorDiscount = $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__discount');
    var selectorTotal = $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-total');
    var selectorOffer = $(x).find('.add-to-cart-stl__prices p.add-to-cart-stl__price-offert');
    $(selectorDiscount).text(htmlDiscount);
    $(selectorTotal).text(htmlTotal);
    $(selectorOffer).text(htmlOffer);
    
  };

  // Creación de Navigation.
    $( '.shopify-section.shop-the-look' ).each(function() {
        var selector = $(this).find('.shop-the-look__container').data('section');
        $('.main-page-shop-the-look .shop-the-look__navigation').append('<button data-link="' + selector +'">'+ selector +'</button>');
    });
  

  // Movimiento del navigation.
    $(".shop-the-look__navigation button").click(function() {
      var section = $(this).data('link');
      var selector = '.shop-the-look__container[data-section="' + section + '"]';
      var $heightNav = $(".main-page-shop-the-look .shop-the-look__navigation").height() + 40;
      $("html, body").animate({ scrollTop: $(selector).offset().top - $heightNav }, "fast");
      return false;
    });
  
  
  // Precios del Shop the Look cuando carga el site.
    $( ".shop-the-look__container" ).each(function( index ) {        
      $pricesOffer(this);
    });


  
  // Precios del Shop the Look cuando cambia una variante.
    $(".variants-product-stl select").on('change', function() {
        var $value = '.class-' + $( this ).val();
        var $price = $($value).data('price');
        var $html = $(this).parents('.container-product-item .container-text-product').find('.price-original');
        $($html).text($price + " USD");
      
        var containerShoplook = $(this).parents('.shop-the-look__container');
        $pricesOffer(containerShoplook);
    });

  

  // Click en botón de REMOVE en los items. 
  $(document).on('click','button.add-elements-variant.add-elements-variant__remove',function(){
      $(this).removeClass('add-elements-variant__remove');
      $(this).addClass('add-elements-variant__add');
      $(this).text('Add');
      $(this).parents('.container-product-item').removeClass('active-add-to-cart');
      $(this).parents('.container-product-item').addClass('remove-add-to-cart');
      
      var containerShoplook = $(this).parents('.shop-the-look__container');
      $pricesOffer(containerShoplook);
  
  });


  
  
  // Click en botón de ADD en los items. 
  $(document).on('click','button.add-elements-variant.add-elements-variant__add',function(){
      $(this).removeClass('add-elements-variant__add');
      $(this).addClass('add-elements-variant__remove');
      $(this).text('Remove');
      $(this).parents('.container-product-item').removeClass('remove-add-to-cart');
      $(this).parents('.container-product-item').addClass('active-add-to-cart');

      var containerShoplook = $(this).parents('.shop-the-look__container');
      $pricesOffer(containerShoplook);

  });



  // Add to Cart Button
  $(document).on('click', '.add-to-cart-stl button.add-all', function() {

        var productosData = [];

        var containerShoplook = $(this).parents('.shop-the-look__container');
        var selectItems = $(containerShoplook).find('.container-product-item.active-add-to-cart .variants-product-stl select');
        $(selectItems).each(function() {
            var $val = $( this ).val();
            var objeto = {
                id: $val,
                quantity: 1
            };
            productosData.push(objeto);
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

    
  
  
});

var title = ".container-product-item p.title-product";
$(window).on('load', function () {
    var $height = $(title).map(function (){
      return $(this).height();
    }).get();
    var minHeight = Math.max.apply(null, $height);
    $(title).css({
      'min-height': minHeight
    });
});

$( window ).resize(function() {
    $(title).css({
      'min-height':'0'
    });
    var $height  = $(title).map(function (){
      return $(this).height();
    }).get();
    var minHeight = Math.max.apply(null, $height);
    $(title).css({
      'min-height':minHeight
    });
});



var variants = ".container-product-item .variants-product-stl";
$(window).on('load', function () {
    var $height = $(variants).map(function (){
      return $(this).height();
    }).get();
    var minHeight = Math.max.apply(null, $height);
    $(variants).css({
      'min-height': minHeight
    });
});

$( window ).resize(function() {
    $(variants).css({
      'min-height':'0'
    });
    var $height  = $(variants).map(function (){
      return $(this).height();
    }).get();
    var minHeight = Math.max.apply(null, $height);
    $(variants).css({
      'min-height':minHeight
    });
});


var image = ".stl-general__image.stl-general__image--desktop img";
var product = ".stl-collection__container .container-product-item";
$(window).on('load', function () {
    var $height = $(product).map(function (){
      return $(this).height();
    }).get();
    var minHeight = Math.max.apply(null, $height);
    $(image).css({
      'height': minHeight
    });
});

$( window ).resize(function() {
    $(image).css({
      'height':'0'
    });
    var $height = $(product).map(function (){
      return $(this).height();
    }).get();
    var minHeight = Math.max.apply(null, $height);
    $(image).css({
      'height':minHeight
    });
});

$(window).scroll(function() {
    var sticky = $('.shop-the-look__navigation'),
        heigthAll = $('div#shopify-section-new-announcement-bar').height() + $('div#shopify-section-header').height() + $('.main-page-shop-the-look').height() + $('.shop-the-look__navigation').height(),
        scroll = $(window).scrollTop();

    if (scroll >= heigthAll) {
      console.log('altura = ' + heigthAll);
      sticky.addClass('fixed-navigation');
    } else {
      console.log('Sin altura');
      sticky.removeClass('fixed-navigation');
    }
});