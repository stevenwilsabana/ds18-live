if (window.location.href.indexOf("package-protection") > -1){
    window.location.replace("https://ds18.com");
};

if (window.location.href.indexOf("mystery-swag") > -1){
    window.location.replace("https://ds18.com");
};

function $cartLoad(){
  if (typeof Rebuy === 'undefined' || typeof Rebuy.SmartCart === 'undefined' || typeof Rebuy.SmartCart.show !== 'function') {
    RebuyPreload();
  } else {
    Rebuy.SmartCart.show();
  };
};

function RebuyPreload(){
  $('body').addClass('show-cart-preload');
};

function $cartReady(){
  if ($('body').hasClass('show-cart-preload')) {
    setTimeout(function() {
      $('body').removeClass('show-cart-preload');
      Rebuy.SmartCart.show();
    }, 1000);
  };
};

function $cartAddtoCart(){
  setTimeout(function() {

    var btnAddToCart = $('body#product button#AddToCart');
    
    if (btnAddToCart.prop("disabled")) {
      $('body#product button#AddToCart .loader-button__text').text('Sold out');
    } else {
      $('body#product button#AddToCart .loader-button__text').text('Add to cart');
    };

    $('body#product product-payment-container').removeClass('disable-button-cart-new');
    
  }, 1000);
};

function $renderContainer(){

  $(".rebuy-cart__flyout-body .rebuy-cart__flyout-content").prepend(

    '<div class="container-progress-bar">' +
    
        '<h3 class="progress-bar__title">Free shipping on all USA orders</h3>'+
        
        '<section class="progress-bar-cart">'+
        
        	'<div class="progress-bar-cart__container">'+
        		'<div id="progress-bar__free-shipping" class="progress-bar-cart__bar"></div>'+
        	'</div>'+
        
        	'<div class="progress-bar__icon">'+
        		'<div id="container-icon__free-shipping" class="progress-bar__icon-container">'+
        			'<i id="icon__free-shipping" class="fas fa-lock"></i>'+
        		'</div>'+
        		'<p class="progress-bar__icon-text">Free Shipping</p>'+
        	'</div>'+
        
        	'<div class="progress-bar-cart__container">'+
        		'<div id="progress-bar__5-off" class="progress-bar-cart__bar"></div>'+
        	'</div>'+
        
        	'<div class="progress-bar__icon">'+
        		'<div id="container-icon__5-off" class="progress-bar__icon-container">'+
        			'<i id="icon__5-off" class="fas fa-lock"></i>'+
        		'</div>'+
        		'<p class="progress-bar__icon-text">Gift with Purchase!</p>'+
        	'</div>'+
        
        '</section>'+

        '<div class="disclaimer-message">'+

          '<p>* Unlock <b>Mystery Swag (+$85 VALUE)</b> when you <b>spend $450 or more.</b></p>' +
          '<p>** Swag available while supplies last.</p>' +
    
        '</div>' +

    '</div>'
  );
  
};

function $progressBar(totalPrice,arrayProducts){
  
   var $total_price = totalPrice;
   var $array_products = arrayProducts;

    var $price_promotion_one = 1 - $total_price;
    var $promotion_one = $price_promotion_one /= Math.pow(10, 2);
    var $porcentPromotionOne = ((1 - $promotion_one) / 1 * 100) + "%";

    var $price_promotion_two = 45000 - $total_price;
    var $promotion_two = $price_promotion_two /= Math.pow(10, 2);
    var $porcentPromotionTwo = ((450.00 - $promotion_two) / 450.00 * 100) + "%";

    function $product_offer(productId) {
      return productId.product_id === 7046929612861;
    };

    var $validation_product = $array_products.find($product_offer);

    if($validation_product === undefined){

        if ($total_price <= 0) {

          $("#progress-bar__free-shipping,#progress-bar__5-off").animate({width: "0%",}, 500);
          $("#icon__free-shipping").replaceWith('<i id="icon__free-shipping" class="fas fa-lock"></i>');
          $("#icon__5-off").replaceWith('<i id="icon__5-off" class="fas fa-lock"></i>');
          $("#container-icon__free-shipping,#container-icon__5-off").css({"background-color": "white", "border-color": "transparent"});
          $("#icon__free-shipping,#icon__5-off").css("color", "#000000");
          $(".progress-bar__title").replaceWith('<h3 class="progress-bar__title">Free shipping on all USA orders</h3>');

        } else if ($total_price > 0 && $total_price <= 44999) {

          $("#progress-bar__free-shipping").animate({width: "100%",}, 500);
          $("#progress-bar__5-off").animate({width: $porcentPromotionTwo,}, 500);
          
          
          $("#icon__free-shipping").replaceWith('<i id="icon__free-shipping" class="fas fa-truck"></i>');
		  $("#icon__5-off").replaceWith('<i id="icon__5-off" class="fas fa-lock"></i>');
          
          $("#container-icon__free-shipping").css({"background-color": "transparent", "border-color": "transparent"});
          $("#container-icon__5-off").css({"background-color": "white", "border-color": "transparent"});
          
          
          $("#icon__free-shipping").css("color", "white");
          $("#icon__5-off").css("color", "#000000");
          
          
          $(".progress-bar__title").replaceWith(
            '<div class="progress-bar__title">'+
              '<h3>You Unlocked Free Shipping</h3>'+
              '<h5>You are <b>$' + $promotion_two + '</b> away from a Mystery Swag</h5>'+
            '</div>'
          );

        } else if ($total_price >= 45000) {

          $("#progress-bar__free-shipping,#progress-bar__5-off").animate({width: "100%",}, 500);
          $("#icon__free-shipping").replaceWith('<i id="icon__free-shipping" class="fas fa-truck"></i>');
          $("#icon__5-off").replaceWith('<i id="icon__5-off" class="fas fa-check-circle"></i>');
          $("#container-icon__free-shipping,#container-icon__5-off").css({"background-color": "transparent", "border-color": "transparent"});
          $("#icon__free-shipping,#icon__5-off").css("color", "white");

          var data = {
            "id": 40666732789821,
            "quantity": 1
          }

          jQuery.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: data,
            dataType: 'json',
            success: function() { 
              $(".progress-bar__title").replaceWith(
                '<div class="progress-bar__title">'+
                '<h3>You have Free Shipping + Mystery Swag</h3>'+
                '</div>'
              );
            }
          });

        };

      } else {
        
        var $qty_product = $validation_product.quantity;

        if ($total_price <= 0 ) {

          if($qty_product >= 1){
              jQuery.post('/cart/update.js', {
                updates: {
                  40666732789821: 0
                }
              });
          };

          $("#progress-bar__free-shipping,#progress-bar__5-off").animate({width: "0%",}, 500);
          $("#icon__free-shipping").replaceWith('<i id="icon__free-shipping" class="fas fa-lock"></i>');
          $("#icon__5-off").replaceWith('<i id="icon__5-off" class="fas fa-lock"></i>');
          $("#container-icon__free-shipping,#container-icon__5-off").css({"background-color": "white", "border-color": "transparent"});
          $("#icon__free-shipping,#icon__5-off").css("color", "#000000");
          $(".progress-bar__title").replaceWith('<h3 class="progress-bar__title">Free shipping on all USA orders</h3>');
          
        } else if ($total_price > 0 && $total_price <= 44999) {

          if($qty_product >= 1){
              jQuery.post('/cart/update.js', {
                updates: {
                  40666732789821: 0
                }
              });
          };

          $("#progress-bar__free-shipping").animate({width: "100%",}, 500);
          $("#progress-bar__5-off").animate({width: $porcentPromotionTwo,}, 500);
          
          $("#icon__free-shipping").replaceWith('<i id="icon__free-shipping" class="fas fa-truck"></i>');
          $("#icon__5-off").replaceWith('<i id="icon__5-off" class="fas fa-lock"></i>');
          
          $("#container-icon__free-shipping").css({"background-color": "transparent", "border-color": "transparent"});
          $("#container-icon__5-off").css({"background-color": "white", "border-color": "transparent"});
          
          $("#icon__free-shipping").css("color", "white");
          $("#icon__5-off").css("color", "#000000");

            $(".progress-bar__title").replaceWith(
              '<div class="progress-bar__title">'+
              '<h3>You Unlocked Free Shipping</h3>'+
              '<h5>You are <b>$' + $promotion_two + '</b> away from a Mystery Swag</h5>'+
              '</div>'
            );
          

        }  else if ($total_price >= 45000) {
          
          // CONDICIONAL

            if($qty_product >= 2){
              jQuery.post('/cart/update.js', {
                updates: {
                  40666732789821: 0
                }
              });
            };

            $("#progress-bar__free-shipping,#progress-bar__5-off").animate({width: "100%",}, 500);
            $("#icon__free-shipping").replaceWith('<i id="icon__free-shipping" class="fas fa-truck"></i>');
            $("#icon__5-off").replaceWith('<i id="icon__5-off" class="fas fa-check-circle"></i>');
            $("#container-icon__free-shipping,#container-icon__5-off").css({"background-color": "transparent", "border-color": "transparent"});
            $("#icon__free-shipping,#icon__5-off").css("color", "white");

            $(".progress-bar__title").replaceWith(
              '<div class="progress-bar__title">'+
              '<h3>You have Free Shipping + Mystery Swag</h3>'+
              '</div>'
            );

        };

      };
   
};

function $renderInsurance(){
  $('.rebuy-cart__flyout-content #stars-rebuy-show').before( 
    '<section class="insurance-personalized">' +
        '<div class="insurance-personalized__container">' +
            '<div class="logo">' +
                '<svg version="1.1" id="icon-svg-insure" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 185 200" style="enable-background:new 0 0 185 200;" xml:space="preserve"><g><path class="st0" d="M92.4,200c-30.7-13.9-86.2-56.3-87.4-88.9L1.8,26.6C1.8,26.6,44.1,0,92.4,0s90.9,26.6,90.9,26.6l-3.4,84.5C178.6,143.7,123.3,186.1,92.4,200z M16.6,34.4l2.9,76.2c1,25.3,49.7,60.9,72.8,73.3V14.4c-19,0-38.2,4.6-55.8,11.2C30,28.3,23,31.2,16.6,34.4z M92.4,190.7c26.3-12.9,78.2-51.4,79.2-79.9l3.2-79.7C151.3,17.5,118.4,8.3,92.4,8.3c-19.7,0-39.7,4.6-58,11.7c-6.8,2.4-17.1,6.6-24.1,11l2.9,79.9C14.4,139.3,66.1,177.8,92.4,190.7z"/></g></svg>' +
            '</div>' +
            '<div class="message">' +
                '<div class="conteiner-header-message">' +
                  '<label class="switch">' +
                      '<input id="insurange-rebuy" type="checkbox">' +
                      '<span class="slider round"></span>' +
                      '<h5>Package Protection</h5>' +
                  '</label>' +
                '</div>' +
                '<p>Coverage for loss, theft, or transit damage.</p>' +
            '</div>' +
            '<div class="button-price">' +
                '<p class="price">$2.50</p>' +
            '</div>' +
        '</div>' +
    '</section>'
  );
};


// Script Insurange.

function $DeleteInsurance(arrayProducts){
  var $array_products = arrayProducts;
  function $findInsurange(id) {return id.product_id === 7111312048189;};
  var $protectPackage = $array_products.find($findInsurange);

  if($protectPackage !== undefined){
    jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
  };
  
};





var isInsuranceUpdated = false;

function $insurance(totalPrice,arrayProducts){

    var $totalCart = totalPrice;
    var $array_products = arrayProducts;

    function $findInsurange(id) {
      return id.product_id === 7111312048189;
    };

    var $protectPackage = $array_products.find($findInsurange);

    if($protectPackage !== undefined){
      var $totalCart = totalPrice - $protectPackage.price;
    };

    if($totalCart >= 0 && $totalCart <= 5000){
      $('.rebuy-cart__flyout-content .insurance-personalized .button-price .price').text('$2.50');
    } else if ($totalCart > 5000 && $totalCart <= 15000){
      $('.rebuy-cart__flyout-content .insurance-personalized .button-price .price').text('$5.00');
    } else if ($totalCart > 15000 && $totalCart <= 35000){
      $('.rebuy-cart__flyout-content .insurance-personalized .button-price .price').text('$10.00');
    } else if ($totalCart > 35000 && $totalCart <= 50000){
      $('.rebuy-cart__flyout-content .insurance-personalized .button-price .price').text('$15.00');
    } else if ($totalCart > 50000 && $totalCart <= 100000){
      $('.rebuy-cart__flyout-content .insurance-personalized .button-price .price').text('$20.00');
    } else if ($totalCart > 100000 && $totalCart <= 200000){
      $('.rebuy-cart__flyout-content .insurance-personalized .button-price .price').text('$25.00');
    } else if ($totalCart > 200000){
      $('.rebuy-cart__flyout-content .insurance-personalized .button-price .price').text('$30.00');
    };

    if($protectPackage === undefined){

      if ($totalCart > 250) {

        var currentDate = new Date().toDateString();
        var cookieName = 'insurangeAdd_' + currentDate;
        console.log(cookieName);

        if (document.cookie.indexOf(cookieName) === -1) {

          if($totalCart >= 0 && $totalCart <= 5000){
            var data = {"id": 40776860926013,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() { $('#insurange-rebuy').prop('checked', true); }});
          } else if ($totalCart > 5000 && $totalCart <= 15000){
            var data = {"id": 40750606188605,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() { $('#insurange-rebuy').prop('checked', true); }});
          } else if ($totalCart > 15000 && $totalCart <= 35000){
            var data = {"id": 40750606221373,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() { $('#insurange-rebuy').prop('checked', true); }});
          } else if ($totalCart > 35000 && $totalCart <= 50000){
            var data = {"id": 40750606254141,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() { $('#insurange-rebuy').prop('checked', true); }});
          } else if ($totalCart > 50000 && $totalCart <= 100000){
            var data = {"id": 40750606286909,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() { $('#insurange-rebuy').prop('checked', true); }});
          } else if ($totalCart > 100000 && $totalCart <= 200000){
            var data = {"id": 40750606319677,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() { $('#insurange-rebuy').prop('checked', true); }});
          } else if ($totalCart > 200000){
            var data = {"id": 40750606352445,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() { $('#insurange-rebuy').prop('checked', true); }});
          };
          
          var expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 1);
          document.cookie = cookieName + '=1; expires=' + expireDate.toUTCString() + '; path=/';
          
        } else {
          $('#insurange-rebuy').prop('checked', false); 
        };
        
      } else {
        $('#insurange-rebuy').prop('checked', false); 
      };
      
    } else {
      $('#insurange-rebuy').prop('checked', true);

      if (!isInsuranceUpdated) {
        if($totalCart <= 250){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
          $('#insurange-rebuy').prop('checked', false);
          isInsuranceUpdated = true;
        } else if ($totalCart > 250 && $totalCart <= 5000){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 1, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
          isInsuranceUpdated = true;
        } else if ($totalCart > 5000 && $totalCart <= 15000){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 1, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
          isInsuranceUpdated = true;
        } else if ($totalCart > 15000 && $totalCart <= 35000){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 1, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
          isInsuranceUpdated = true;
        } else if ($totalCart > 35000 && $totalCart <= 50000){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 1, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
          isInsuranceUpdated = true;
        } else if ($totalCart > 50000 && $totalCart <= 100000){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 1, 40750606319677: 0, 40750606352445: 0 }});
          isInsuranceUpdated = true;
        } else if ($totalCart > 100000 && $totalCart <= 200000){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 1, 40750606352445: 0 }});
          isInsuranceUpdated = true;
        } else if ($totalCart > 200000){
          jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 1 }});
          isInsuranceUpdated = true;
        };  
      };
      
    };
    

};

function resetIsInsuranceUpdated() {
  isInsuranceUpdated = false;
};

function $cartInsuranceOnly(arrayProducts) {
    var $array_products = arrayProducts;
    function $findInsurange(id) {
        return id.product_id === 7111312048189;
    };
    var $protectPackage = $array_products.find($findInsurange);

    if ($protectPackage !== undefined && $array_products.length === 1) {
        console.log("****El paquete de protección es el único ítem en el carrito.");
        jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
        console.log("[[[Se ejecuta eliminación de Insurance.]]]");
    } else if ($protectPackage !== undefined) {
        console.log("****El paquete de protección está en el carrito, pero hay más ítems.");
    } else {
        console.log("****El paquete de protección no está en el carrito.");
    }
};

// End Script Insurange.

    

$('.open-cart-rebuy').click(function() {
  $cartLoad();
});

function $totalCart($total_price){
  $('.rebuy-cart__flyout-subtotal').attr( "data-subtotal-cart", $total_price);
};



function $reindexacionRebuy(){
  $('#rebuy-cart .rebuy-cart__flyout').prepend('<div class="rebuy-new-cart"><div class="container-rebuy-cart-new"></div></div>');
  $( "#rebuy-cart .rebuy-new-cart .container-rebuy-cart-new" ).append($( ".rebuy-cart__flyout-header, .rebuy-cart__flyout-body, .rebuy-cart__flyout-footer" ));
  $('#rebuy-cart .rebuy-new-cart').append('<div data-rebuy-id="133714"></div>');
  $('#rebuy-cart .rebuy-cart__flyout-content').prepend('<div class="container-progress-bar-move"></div>');
  $( "#rebuy-cart .rebuy-cart__flyout-content .container-progress-bar-move" ).prepend($( "#rebuy-cart .rebuy-cart__flyout-body .rebuy-cart__progress-bar-container" ));

  $('.rebuy-cart__flyout-content .rebuy-cart__flyout-recommendations').before(
    '<div id="stars-rebuy-show">' + 
      '<div class="stars">' + 
        '<i class="fa-solid fa-star"></i>' + 
        '<i class="fa-solid fa-star"></i>' + 
        '<i class="fa-solid fa-star"></i>' + 
        '<i class="fa-solid fa-star"></i>' + 
        '<i class="fa-solid fa-star"></i>' + 
      '</div>' + 
      '<div class="message">' + 
        '<p>Over 2 Million Customers</p>' + 
      '</div>' + 
    '</div>'
  );

  /*
  $('.rebuy-cart__flyout-footer .rebuy-cart__flyout-subtotal').before(
    '<div class="rebuy-cart__flyout-shipping">' + 
      '<div class="rebuy-cart__flyout-shipping__label"><p>Shipping</p></div>' +
      '<div class="rebuy-cart__flyout-shipping__value"><p>FREE SHIPPING</p><span>$0.00</span></div>' +
    '</div>'
  )*/
};


function ajustarAltura() {
  var alturaVisible = window.innerHeight + "px";
  document.querySelector('.container-rebuy-cart-new').style.height = alturaVisible;
  console.log(alturaVisible);
};

window.addEventListener("resize", ajustarAltura);



// COUNTER REBUY CART

function $renderCounter(){
  $('#rebuy-cart .rebuy-cart__flyout-header').before('<div class="rebuy-cart__flyout-counter"><div id="contadorRebuyCart"></div></div>');
};

function $countDown(tiempoContadorMinutos, tiempoOcultoMinutos){
    var contadorDiv = document.getElementById('contadorRebuyCart');  
    iniciarOActualizarContador();

    function iniciarOActualizarContador() {
        var finalizacionContador = parseInt(localStorage.getItem('finalizacionContador'), 10);
        var ahora = new Date().getTime();
        
        var totalTiempoMs = (tiempoContadorMinutos + tiempoOcultoMinutos) * 60000;
        
        if (!finalizacionContador || ahora > finalizacionContador) {
            localStorage.setItem('finalizacionContador', ahora + totalTiempoMs);
            finalizacionContador = ahora + totalTiempoMs;
        }
        
        var tiempoRestante = Math.floor((finalizacionContador - ahora) / 1000) - (tiempoOcultoMinutos * 60);
        
        if (tiempoRestante > 0) {
            actualizarContador(tiempoRestante);
            contadorDiv.style.display = 'block';
        } else {
            contadorDiv.style.display = 'none';
        }
    };

    function actualizarContador(tiempoRestante) {
        var intervalo = setInterval(function() {
            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                contadorDiv.style.display = 'none';
                return;
            }
            
            var minutos = Math.floor(tiempoRestante / 60);
            var segundos = tiempoRestante % 60;

            minutos = minutos < 10 ? '0' + minutos : minutos;
            segundos = segundos < 10 ? '0' + segundos : segundos;

            contadorDiv.innerHTML = '<div class="contadorRebuyCart__container"><div><b>' + minutos + ':' + segundos + '</b> - <span>"Order Now to Get Super Fast Shipping 🚚"</span>.</div></div>';
            tiempoRestante--;

        }, 1000);
    }
};






// EVENTOS REBUY

document.addEventListener('rebuy:smartcart.ready', function(event){

  //console.log('rebuy:smartcart.ready event', event.detail);
  // $renderContainer();
  // $progressBar($total_price,$array_products);
  
  var $total_price = event.detail.smartcart.cart.total_price;
  var $array_products = event.detail.smartcart.cart.items;
  $reindexacionRebuy();
  ajustarAltura();
  // $renderInsurance();


  $DeleteInsurance($array_products);


  $renderCounter();
  $countDown(5,525600);

  $('#rebuy-cart .rebuy-cart__flyout-content').on('scroll', function() {
    if ($(this).scrollTop() > 0) {
      $('#rebuy-cart .rebuy-cart__flyout-header').addClass('scroll-move-header');
    } else {
      $('#rebuy-cart .rebuy-cart__flyout-header').removeClass('scroll-move-header');
    }
  });

  // Script Insurance

  /*
  if($total_price > 0){
    $('.rebuy-cart__flyout-content .insurance-personalized').css('display','flex');
  } else {
    $('.rebuy-cart__flyout-content .insurance-personalized').hide();
  };
  $insurance($total_price,$array_products);
  $cartInsuranceOnly($array_products);
  setTimeout(resetIsInsuranceUpdated, 1500);
  */

  $cartReady();
  $cartAddtoCart();
  $totalCart($total_price);
});



document.addEventListener('rebuy:cart.change', function(event){

  // console.log('rebuy:cart.change event', event.detail);
  // var $container = $('.rebuy-cart__flyout-body .rebuy-cart__flyout-content .container-progress-bar');

  //if ($container.length > 0) {
    //$progressBar($total_price,$array_products);
  //};

  
  var $containerInsurance = $('.rebuy-cart__flyout-content .insurance-personalized');
  var $total_price = event.detail.cart.cart.total_price;
  var $array_products = event.detail.cart.cart.items;
  
  $totalCart($total_price);

  var $qty_rebuy = event.detail.cart.cart.item_count;
  $('cart-count').text($qty_rebuy);


  $DeleteInsurance($array_products);

  

  // Script Insurance
  /*
  if($total_price > 0){
    $('.rebuy-cart__flyout-content .insurance-personalized').css('display','flex');
  } else {
    $('.rebuy-cart__flyout-content .insurance-personalized').hide();
  };
  if ($containerInsurance.length > 0) {
    $insurance($total_price,$array_products);
    $cartInsuranceOnly($array_products);
    setTimeout(resetIsInsuranceUpdated, 1500);
  }; 
  */
  
});



$(document).on('change', '#insurange-rebuy', function() {
  var $totalCart = $('.rebuy-cart__flyout-subtotal').attr('data-subtotal-cart');
  if ($(this).is(':checked')){
    if($totalCart >= 0 && $totalCart <= 5000){
      var data = {"id": 40776860926013,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() {console.log('Add Protect Package');}});
    } else if ($totalCart > 5000 && $totalCart <= 15000){
      var data = {"id": 40750606188605,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() {console.log('Add Protect Package');}});
    } else if ($totalCart > 15000 && $totalCart <= 35000){
      var data = {"id": 40750606221373,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() {console.log('Add Protect Package');}});
    } else if ($totalCart > 35000 && $totalCart <= 50000){
      var data = {"id": 40750606254141,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() {console.log('Add Protect Package');}});
    } else if ($totalCart > 50000 && $totalCart <= 100000){
      var data = {"id": 40750606286909,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() {console.log('Add Protect Package');}});
    } else if ($totalCart > 100000 && $totalCart <= 200000){
      var data = {"id": 40750606319677,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() {console.log('Add Protect Package');}});
    } else if ($totalCart > 200000){
      var data = {"id": 40750606352445,"quantity": 1}; jQuery.ajax({ type: 'POST', url: '/cart/add.js', data: data, dataType: 'json', success: function() {console.log('Add Protect Package');}});
    };
  } else {
    jQuery.post('/cart/update.js', { updates: { 40776860926013: 0, 40750606188605: 0, 40750606221373: 0, 40750606254141: 0, 40750606286909: 0, 40750606319677: 0, 40750606352445: 0 }});
  };
});
